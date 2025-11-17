/**
 * Tanglewood Art Gallery - Cart Store
 * Zustand store for managing shopping cart state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Artwork, PrintVariant } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (artwork: Artwork, type: 'original' | 'print', printVariant?: PrintVariant) => void;
  removeItem: (artworkId: string, type: 'original' | 'print', printVariantId?: string) => void;
  updateQuantity: (artworkId: string, type: 'original' | 'print', quantity: number, printVariantId?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed values
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (artwork, type, printVariant) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.artworkId === artwork.id &&
              item.type === type &&
              (type === 'print' ? item.printVariant?.id === printVariant?.id : true)
          );

          if (existingItemIndex > -1) {
            // Increment quantity if item already exists
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + 1,
            };
            return { items: updatedItems };
          }

          // Add new item
          const newItem: CartItem = {
            artworkId: artwork.id,
            artwork,
            type,
            printVariant,
            quantity: 1,
            price: type === 'original' ? artwork.price : printVariant?.price || 0,
          };

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (artworkId, type, printVariantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.artworkId === artworkId &&
                item.type === type &&
                (type === 'print' ? item.printVariant?.id === printVariantId : true)
              )
          ),
        }));
      },

      updateQuantity: (artworkId, type, quantity, printVariantId) => {
        if (quantity <= 0) {
          get().removeItem(artworkId, type, printVariantId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.artworkId === artworkId &&
            item.type === type &&
            (type === 'print' ? item.printVariant?.id === printVariantId : true)
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),

      closeCart: () => set({ isOpen: false }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      },

      getSubtotal: () => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'tanglewood-cart-storage',
    }
  )
);
