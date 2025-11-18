'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Artwork, formatPrice } from '@/lib/artworks';
import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';

interface PrintOptionsProps {
  artwork: Artwork;
}

interface PrintSelection {
  size: string;
  finish: string;
  price: number;
  dimensions: string;
}

export default function PrintOptions({ artwork }: PrintOptionsProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const { addItem, openCart } = useCartStore();

  if (!artwork.prints || artwork.prints.length === 0) {
    return null;
  }

  // Get available print sizes
  const printSizes = artwork.prints;

  // Get selected print details
  const selectedPrint = printSizes.find((p) => p.size === selectedSize);
  const availableFinishes = selectedPrint?.finishes || [];

  // Calculate price
  const getPrintPrice = () => {
    if (!selectedSize || !selectedFinish) return 0;
    const print = printSizes.find((p) => p.size === selectedSize);
    return print?.price || 0;
  };

  const currentPrice = getPrintPrice();

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize || !selectedFinish || !currentPrice) return;

    const printVariant = {
      id: `${selectedSize}-${selectedFinish}`,
      size: selectedSize as 'A4' | 'A3' | 'A2' | 'A1' | 'A0',
      finish: selectedFinish as 'matte' | 'glossy' | 'canvas',
      price: currentPrice,
      dimensions: {
        width: artwork.dimensions.width,
        height: artwork.dimensions.height,
        unit: artwork.dimensions.unit as 'cm' | 'in',
      },
    };

    addItem(artwork, 'print', printVariant);
    openCart();
  };

  const isAddToCartDisabled = !selectedSize || !selectedFinish;

  return (
    <div className="space-y-6 border-t border-museum-slate pt-6">
      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-museum-cream">
          Or Purchase a Print
        </h4>
        <p className="text-sm text-museum-cream/70">
          High-quality giclée prints on premium paper
        </p>
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-museum-gold">
          Select Size
        </label>
        <div className="grid grid-cols-2 gap-2">
          {printSizes.map((print) => (
            <button
              key={print.size}
              onClick={() => {
                setSelectedSize(print.size);
                // Reset finish if not available for new size
                if (!print.finishes.includes(selectedFinish)) {
                  setSelectedFinish('');
                }
              }}
              className={`rounded-lg border-2 px-4 py-3 text-center transition-all ${
                selectedSize === print.size
                  ? 'border-museum-gold bg-museum-gold/10 text-museum-gold'
                  : 'border-museum-slate text-museum-cream hover:border-museum-gold/50 hover:text-museum-gold'
              }`}
            >
              <div className="font-semibold">{print.size}</div>
              <div className="text-xs text-current/70">{print.dimensions}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Finish Selection */}
      {selectedSize && availableFinishes.length > 0 && (
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-museum-gold">
            Select Finish
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableFinishes.map((finish) => (
              <button
                key={finish}
                onClick={() => setSelectedFinish(finish)}
                className={`rounded-lg border-2 px-4 py-3 text-center capitalize transition-all ${
                  selectedFinish === finish
                    ? 'border-museum-gold bg-museum-gold/10 text-museum-gold'
                    : 'border-museum-slate text-museum-cream hover:border-museum-gold/50 hover:text-museum-gold'
                }`}
              >
                {finish}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Display */}
      {currentPrice > 0 && (
        <div className="rounded-lg border border-museum-gold/30 bg-museum-dark/50 p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-museum-cream/70">Print Price:</span>
            <span className="text-2xl font-bold text-museum-gold">
              {formatPrice(currentPrice)}
            </span>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleAddToCart}
        disabled={isAddToCartDisabled}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add Print to Cart
      </Button>

      {isAddToCartDisabled && (
        <p className="text-center text-xs text-museum-cream/50">
          Please select a size and finish to continue
        </p>
      )}
    </div>
  );
}
