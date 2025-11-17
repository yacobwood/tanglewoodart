'use client';

import { Artwork } from '@/lib/artworks';
import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';

interface BuyOriginalButtonProps {
  artwork: Artwork;
}

export default function BuyOriginalButton({ artwork }: BuyOriginalButtonProps) {
  const { addItem, openCart } = useCartStore();

  const handleBuyOriginal = () => {
    addItem(artwork, 'original');
    openCart();
  };

  return (
    <Button
      variant="primary"
      size="lg"
      className="w-full"
      disabled={artwork.availability !== 'available'}
      onClick={handleBuyOriginal}
    >
      {artwork.availability === 'available' ? 'Buy Original' : artwork.availability === 'reserved' ? 'Reserved' : 'Sold Out'}
    </Button>
  );
}
