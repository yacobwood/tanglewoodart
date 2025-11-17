/**
 * Stripe Webhook Handler
 * POST /api/stripe/webhook - Handle Stripe webhook events
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { addOrder, updateOrderStatus } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * POST - Handle Stripe webhook
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('PaymentIntent failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful checkout session
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing checkout session:', session.id);

    // Extract order details from session
    const order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent as string,
      status: 'confirmed',
      customerEmail: session.customer_email || session.customer_details?.email || 'unknown',
      customerName: session.customer_details?.name || session.metadata?.customerName || 'Unknown',
      shippingDetails: {
        name: session.shipping_details?.name || session.customer_details?.name || 'Unknown',
        addressLine1: session.shipping_details?.address?.line1 || session.metadata?.addressLine1 || '',
        addressLine2: session.shipping_details?.address?.line2 || session.metadata?.addressLine2 || '',
        city: session.shipping_details?.address?.city || session.metadata?.city || '',
        postalCode: session.shipping_details?.address?.postal_code || session.metadata?.postalCode || '',
        country: session.shipping_details?.address?.country || session.metadata?.country || '',
        phone: session.customer_details?.phone || session.metadata?.phone || '',
      },
      subtotal: session.amount_subtotal || 0,
      shipping: 0, // Will be calculated from line items
      tax: session.total_details?.amount_tax || 0,
      total: session.amount_total || 0,
      items: [] as Array<{ artworkId: string; type: string; quantity: number; price: number }>, // Will be populated from line items
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
    };

    // Retrieve line items from session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    });

    // Process line items
    order.items = lineItems.data
      .filter((item) => {
        // Filter out VAT and Shipping line items
        const description = (item.description || '').toLowerCase();
        return !description.includes('vat') && !description.includes('shipping');
      })
      .map((item) => ({
        artworkId: item.price?.product?.toString() || 'unknown',
        type: item.description?.includes('Print') ? 'print' : 'original',
        quantity: item.quantity || 1,
        price: item.price?.unit_amount || 0,
      }));

    // Extract shipping amount
    const shippingItem = lineItems.data.find((item) =>
      (item.description || '').toLowerCase().includes('shipping')
    );
    if (shippingItem) {
      order.shipping = shippingItem.amount_total || 0;
    }

    // Save order to database
    await addOrder(order);

    console.log('Order created successfully:', order.id);

    // TODO: Send confirmation email to customer
    // TODO: Send notification to admin
  } catch (error) {
    console.error('Error handling checkout session:', error);
    throw error;
  }
}
