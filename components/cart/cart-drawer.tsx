/**
 * Tanglewood Art Gallery - Cart Drawer Component
 * Slide-out cart drawer with items, totals, and checkout button
 */

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { CartLineItem } from './cart-line-item';
import { Button } from '@/components/ui/button';
import { formatPrice, calculateVAT, calculateShipping } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, closeCart, getSubtotal, getItemCount } = useCartStore();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const vat = calculateVAT(subtotal);
  const shipping = calculateShipping(itemCount, subtotal);
  const total = subtotal + vat + shipping;

  // Close cart on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeCart]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-museum-dark/80 backdrop-blur-sm z-40"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-museum-charcoal border-l border-museum-slate/20 shadow-2xl z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-museum-slate/20">
              <h2
                id="cart-title"
                className="text-2xl font-serif text-museum-cream"
              >
                Shopping Cart
              </h2>
              <button
                onClick={closeCart}
                className="text-museum-slate hover:text-museum-gold transition-colors duration-200 p-2 -mr-2"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items or Empty State */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-museum-slate mb-4" />
                  <h3 className="text-xl font-serif text-museum-cream mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-museum-slate font-sans mb-6">
                    Discover our curated collection of artworks
                  </p>
                  <Button asChild variant="primary">
                    <Link href="/gallery" onClick={closeCart}>
                      Browse Gallery
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="py-4">
                  {items.map((item) => (
                    <CartLineItem
                      key={`${item.artworkId}-${item.type}-${item.printVariant?.id || 'original'}`}
                      item={item}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Totals and Checkout */}
            {items.length > 0 && (
              <div className="border-t border-museum-slate/20 p-6 bg-museum-dark/50">
                {/* Totals */}
                <div className="space-y-2 mb-6 font-sans">
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
                    <span>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-museum-slate/20">
                    <div className="flex justify-between text-lg font-medium">
                      <span className="text-museum-cream">Total</span>
                      <span className="text-museum-gold font-serif">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button asChild variant="primary" size="lg" className="w-full">
                  <Link href="/checkout" onClick={closeCart}>
                    Proceed to Checkout
                  </Link>
                </Button>

                {/* View Full Cart Link */}
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center text-museum-gold hover:text-museum-gold-light font-sans text-sm mt-4 transition-colors duration-200"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
