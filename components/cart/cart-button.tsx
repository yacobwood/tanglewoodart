/**
 * Tanglewood Art Gallery - Cart Button Component
 * Shopping cart button with item count badge
 */

'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { motion, AnimatePresence } from 'framer-motion';

export function CartButton() {
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-museum-cream hover:text-museum-gold transition-colors duration-200"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingBag className="w-6 h-6" />

      {/* Item Count Badge */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-museum-gold text-museum-dark text-xs font-sans font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {itemCount > 9 ? '9+' : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
