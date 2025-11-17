/**
 * Tanglewood Art Gallery - Order Success Client Component
 * Client-side order confirmation page
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Mail, Package, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { Button } from '@/components/ui/button';

interface OrderDetails {
  sessionId: string;
  customerEmail: string;
  amountTotal: number;
}

export function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (sessionId) {
      // Fetch order details from Stripe session
      fetch(`/api/checkout/session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setOrderDetails({
            sessionId,
            customerEmail: data.customer_email || '',
            amountTotal: data.amount_total || 0,
          });
          setIsLoading(false);

          // Clear cart after successful order
          clearCart();
        })
        .catch((error) => {
          console.error('Failed to fetch order details:', error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [searchParams, clearCart]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-museum-dark pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-museum-gold mx-auto mb-4" />
            <p className="text-museum-slate font-sans">Loading order details...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-museum-dark pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-2xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-museum-cream mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-museum-slate font-sans">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-museum-charcoal border border-museum-slate/20 rounded-lg p-8 mb-8">
          {orderDetails ? (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm text-museum-slate font-sans mb-1">
                    Order Number
                  </p>
                  <p className="text-museum-cream font-mono text-sm">
                    {orderDetails.sessionId.slice(0, 20)}...
                  </p>
                </div>
                <div>
                  <p className="text-sm text-museum-slate font-sans mb-1">
                    Email
                  </p>
                  <p className="text-museum-cream font-sans">
                    {orderDetails.customerEmail}
                  </p>
                </div>
              </div>

              <div className="border-t border-museum-slate/20 pt-6">
                <p className="text-sm text-museum-slate font-sans mb-1">
                  Total Paid
                </p>
                <p className="text-3xl font-serif text-museum-gold">
                  £{(orderDetails.amountTotal / 100).toFixed(2)}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-museum-slate font-sans">
                Order details unavailable
              </p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-museum-charcoal border border-museum-slate/20 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-serif text-museum-cream mb-6">
            What Happens Next?
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-museum-gold/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-museum-gold" />
                </div>
              </div>
              <div>
                <h3 className="text-museum-cream font-serif mb-2">
                  Order Confirmation Email
                </h3>
                <p className="text-museum-slate font-sans text-sm">
                  You will receive a confirmation email at{' '}
                  <span className="text-museum-gold">
                    {orderDetails?.customerEmail || 'your email address'}
                  </span>{' '}
                  with your order details and receipt.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-museum-gold/10 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-museum-gold" />
                </div>
              </div>
              <div>
                <h3 className="text-museum-cream font-serif mb-2">
                  Shipping & Delivery
                </h3>
                <p className="text-museum-slate font-sans text-sm">
                  Your artwork will be carefully packaged and shipped within 3-5
                  business days. You will receive tracking information once your
                  order ships.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-museum-gold/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-museum-gold" />
                </div>
              </div>
              <div>
                <h3 className="text-museum-cream font-serif mb-2">
                  Customer Support
                </h3>
                <p className="text-museum-slate font-sans text-sm">
                  If you have any questions about your order, please contact us at{' '}
                  <a
                    href="mailto:hello@tanglewoodart.com"
                    className="text-museum-gold hover:text-museum-gold-light transition-colors duration-200"
                  >
                    hello@tanglewoodart.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="primary" size="lg">
            <Link href="/gallery">
              Continue Browsing
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-12 pt-12 border-t border-museum-slate/20">
          <p className="text-museum-slate font-sans italic">
            Thank you for supporting independent artists and the Tanglewood Art
            Gallery. We hope you enjoy your new artwork!
          </p>
        </div>
      </div>
    </main>
  );
}
