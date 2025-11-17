/**
 * Tanglewood Art Gallery - Cart Line Item Component
 * Individual cart item with image, details, quantity controls, and price
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import type { CartItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart-store';
import { Button } from '@/components/ui/button';

interface CartLineItemProps {
  item: CartItem;
}

export function CartLineItem({ item }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleDecrease = () => {
    updateQuantity(
      item.artworkId,
      item.type,
      item.quantity - 1,
      item.printVariant?.id
    );
  };

  const handleIncrease = () => {
    // Limit originals to quantity of 1
    if (item.type === 'original' && item.quantity >= 1) {
      return;
    }

    updateQuantity(
      item.artworkId,
      item.type,
      item.quantity + 1,
      item.printVariant?.id
    );
  };

  const handleRemove = () => {
    removeItem(item.artworkId, item.type, item.printVariant?.id);
  };

  const artwork = item.artwork;
  if (!artwork) return null;

  const itemTotal = item.price * item.quantity;
  const primaryImage = artwork.images[0];

  return (
    <div className="flex gap-4 py-4 border-b border-museum-slate/20 last:border-0">
      {/* Artwork Image */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-museum-charcoal rounded-md overflow-hidden">
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover"
            sizes="96px"
          />
        )}
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-serif text-museum-cream font-medium line-clamp-1">
              {artwork.title}
            </h3>
            <p className="text-sm text-museum-slate font-sans">
              {artwork.artist}, {artwork.year}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="text-museum-slate hover:text-museum-gold transition-colors duration-200 p-1 -mt-1 -mr-1"
            aria-label={`Remove ${artwork.title} from cart`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Type and Variant Info */}
        <div className="text-sm text-museum-slate font-sans mb-3">
          {item.type === 'original' ? (
            <span>Original Artwork</span>
          ) : (
            <span>
              Print - {item.printVariant?.size} {item.printVariant?.finish}
            </span>
          )}
        </div>

        {/* Quantity Controls and Price */}
        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center border border-museum-slate rounded-md text-museum-cream hover:border-museum-gold hover:text-museum-gold transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-museum-slate disabled:hover:text-museum-cream"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="text-museum-cream font-sans w-8 text-center">
              {item.quantity}
            </span>

            <button
              onClick={handleIncrease}
              disabled={item.type === 'original' && item.quantity >= 1}
              className="w-8 h-8 flex items-center justify-center border border-museum-slate rounded-md text-museum-cream hover:border-museum-gold hover:text-museum-gold transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-museum-slate disabled:hover:text-museum-cream"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-museum-gold font-serif font-medium">
              {formatPrice(itemTotal)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-museum-slate font-sans">
                {formatPrice(item.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
