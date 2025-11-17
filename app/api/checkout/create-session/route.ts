/**
 * Tanglewood Art Gallery - Create Stripe Checkout Session API
 * Creates a Stripe Checkout Session for payment processing
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import type { CartItem } from '@/types';
import { calculateVAT, calculateShipping } from '@/lib/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerInfo } = body as {
      items: CartItem[];
      customerInfo: {
        email: string;
        name: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        postalCode: string;
        country: string;
        phone?: string;
      };
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const vat = calculateVAT(subtotal);
    const shipping = calculateShipping(itemCount, subtotal, customerInfo.country);

    // Create Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => {
        const artwork = item.artwork;
        const description =
          item.type === 'original'
            ? 'Original Artwork'
            : `Print - ${item.printVariant?.size} ${item.printVariant?.finish}`;

        return {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: artwork?.title || 'Artwork',
              description: `${description} by ${artwork?.artist}`,
              images: artwork?.images?.[0]?.url ? [artwork.images[0].url] : [],
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        };
      }
    );

    // Add VAT line item
    lineItems.push({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: 'VAT (20%)',
        },
        unit_amount: vat,
      },
      quantity: 1,
    });

    // Add shipping line item
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Shipping',
          },
          unit_amount: shipping,
        },
        quantity: 1,
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: customerInfo.email,
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'IE'],
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        addressLine1: customerInfo.addressLine1,
        addressLine2: customerInfo.addressLine2 || '',
        city: customerInfo.city,
        postalCode: customerInfo.postalCode,
        country: customerInfo.country,
        phone: customerInfo.phone || '',
        itemCount: itemCount.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
