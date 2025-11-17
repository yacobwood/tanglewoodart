/**
 * Tanglewood Art Gallery - Order Summary Component
 * Reusable order summary showing items, prices, and totals
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart-store';
import { Button } from '@/components/ui/button';
import { formatPrice, calculateVAT, calculateShipping } from '@/lib/utils';

interface OrderSummaryProps {
  showCheckoutButton?: boolean;
  showItems?: boolean;
}

export function OrderSummary({
  showCheckoutButton = false,
  showItems = true,
}: OrderSummaryProps) {
  const { items, getSubtotal, getItemCount } = useCartStore();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const vat = calculateVAT(subtotal);
  const shipping = calculateShipping(itemCount, subtotal);
  const total = subtotal + vat + shipping;

  return (
    <div className="bg-museum-charcoal border border-museum-slate/20 rounded-lg p-6">
      <h2 className="text-xl font-serif text-museum-cream mb-6">
        Order Summary
      </h2>

      {/* Items List */}
      {showItems && items.length > 0 && (
        <div className="mb-6 space-y-4">
          {items.map((item) => {
            const artwork = item.artwork;
            if (!artwork) return null;

            const primaryImage = artwork.images[0];

            return (
              <div
                key={`${item.artworkId}-${item.type}-${item.printVariant?.id || 'original'}`}
                className="flex gap-3"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 flex-shrink-0 bg-museum-dark rounded-md overflow-hidden">
                  {primaryImage && (
                    <Image
                      src={primaryImage.url}
                      alt={primaryImage.alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  )}
                  {item.quantity > 1 && (
                    <div className="absolute top-1 right-1 bg-museum-gold text-museum-dark text-xs font-sans font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {item.quantity}
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-serif text-museum-cream line-clamp-1">
                    {artwork.title}
                  </h3>
                  <p className="text-xs text-museum-slate font-sans">
                    {item.type === 'original'
                      ? 'Original'
                      : `Print - ${item.printVariant?.size}`}
                  </p>
                  <p className="text-sm text-museum-gold font-sans mt-1">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Divider */}
      {showItems && items.length > 0 && (
        <div className="border-t border-museum-slate/20 mb-6" />
      )}

      {/* Totals */}
      <div className="space-y-3 font-sans">
        <div className="flex justify-between text-museum-cream">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-museum-cream">
          <span>VAT (20%)</span>
          <span>{formatPrice(vat)}</span>
        </div>
        <div className="flex justify-between text-museum-cream">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>

        {shipping === 0 && subtotal >= 50000 && (
          <p className="text-xs text-museum-gold">
            Free shipping on orders over £500
          </p>
        )}

        <div className="pt-3 border-t border-museum-slate/20">
          <div className="flex justify-between text-lg font-medium">
            <span className="text-museum-cream">Total</span>
            <span className="text-museum-gold font-serif">
              {formatPrice(total)}
            </span>
          </div>
          <p className="text-xs text-museum-slate mt-1">
            Including VAT
          </p>
        </div>
      </div>

      {/* Checkout Button */}
      {showCheckoutButton && items.length > 0 && (
        <div className="mt-6">
          <Button asChild variant="primary" size="lg" className="w-full">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      )}

      {/* Shipping Notice */}
      <div className="mt-6 pt-6 border-t border-museum-slate/20">
        <p className="text-xs text-museum-slate font-sans leading-relaxed">
          Shipping costs are calculated based on destination and number of items.
          All prices include VAT where applicable.
        </p>
      </div>
    </div>
  );
}
