/**
 * Tanglewood Art Gallery - Cart Page Client Component
 * Client-side cart page with items and order summary
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { CartLineItem } from '@/components/cart/cart-line-item';
import { OrderSummary } from '@/components/checkout/order-summary';
import { Button } from '@/components/ui/button';

export function CartPageClient() {
  const { items } = useCartStore();

  return (
    <main className="min-h-screen bg-museum-dark pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-museum-cream mb-4">
            Shopping Cart
          </h1>
          <p className="text-museum-slate font-sans">
            {items.length === 0
              ? 'Your cart is empty'
              : `${items.length} ${items.length === 1 ? 'item' : 'items'} in your cart`}
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="w-20 h-20 text-museum-slate mb-6" />
            <h2 className="text-2xl font-serif text-museum-cream mb-4">
              Your cart is empty
            </h2>
            <p className="text-museum-slate font-sans mb-8 max-w-md">
              Explore our curated collection of original artworks and prints to
              begin your art journey.
            </p>
            <Button asChild variant="primary" size="lg">
              <Link href="/gallery">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Browse Gallery
              </Link>
            </Button>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-museum-charcoal border border-museum-slate/20 rounded-lg p-6">
                <h2 className="text-xl font-serif text-museum-cream mb-6">
                  Cart Items
                </h2>
                <div className="space-y-0">
                  {items.map((item) => (
                    <CartLineItem
                      key={`${item.artworkId}-${item.type}-${item.printVariant?.id || 'original'}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>

              {/* Continue Shopping Link */}
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-museum-gold hover:text-museum-gold-light font-sans mt-6 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <OrderSummary showCheckoutButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
