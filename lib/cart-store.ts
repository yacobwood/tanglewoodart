/**
 * Tanglewood Art Gallery - Cart Store
 * Zustand store for shopping cart state management with localStorage persistence
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Artwork, PrintVariant } from "@/types";
import { calculateVAT, calculateShipping } from "./utils";

// VAT rate for UK (20%)
const VAT_RATE = 20;

// Cart store state interface
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  country: string; // For shipping calculation
}

// Cart store actions interface
interface CartActions {
  addItem: (
    artwork: Artwork,
    type: "original" | "print",
    printVariant?: PrintVariant
  ) => void;
  removeItem: (artworkId: string, type: "original" | "print", printVariantId?: string) => void;
  updateQuantity: (
    artworkId: string,
    quantity: number,
    type: "original" | "print",
    printVariantId?: string
  ) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setCountry: (country: string) => void;
  getSubtotal: () => number;
  getShipping: () => number;
  getVAT: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

// Combined store type
type CartStore = CartState & CartActions;

/**
 * Zustand cart store with localStorage persistence
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,
      country: "GB",

      /**
       * Add item to cart
       * For originals: quantity is always 1 (only one original exists)
       * For prints: can add multiple quantities
       */
      addItem: (artwork, type, printVariant) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.artworkId === artwork.id &&
              item.type === type &&
              (type === "print"
                ? item.printVariant?.id === printVariant?.id
                : true)
          );

          if (existingItemIndex >= 0) {
            // Item already exists - update quantity
            const updatedItems = [...state.items];
            const existingItem = updatedItems[existingItemIndex];

            // For originals, don't increase quantity (only one available)
            if (type === "original") {
              return state;
            }

            updatedItems[existingItemIndex] = {
              ...existingItem,
              quantity: existingItem.quantity + 1,
            };

            return { items: updatedItems };
          } else {
            // New item - add to cart
            const price = type === "original" ? artwork.price : printVariant?.price || 0;

            const newItem: CartItem = {
              artworkId: artwork.id,
              artwork,
              type,
              printVariant,
              quantity: 1,
              price,
            };

            return { items: [...state.items, newItem] };
          }
        });
      },

      /**
       * Remove item from cart
       */
      removeItem: (artworkId, type, printVariantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.artworkId === artworkId &&
                item.type === type &&
                (type === "print"
                  ? item.printVariant?.id === printVariantId
                  : true)
              )
          ),
        }));
      },

      /**
       * Update item quantity
       */
      updateQuantity: (artworkId, quantity, type, printVariantId) => {
        // Don't allow quantities less than 1
        if (quantity < 1) {
          get().removeItem(artworkId, type, printVariantId);
          return;
        }

        // Don't allow quantity changes for originals
        if (type === "original") {
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.artworkId === artworkId &&
            item.type === type &&
            (type === "print" ? item.printVariant?.id === printVariantId : true)
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      /**
       * Clear all items from cart
       */
      clearCart: () => {
        set({ items: [] });
      },

      /**
       * Toggle cart open/closed
       */
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      /**
       * Open cart
       */
      openCart: () => {
        set({ isOpen: true });
      },

      /**
       * Close cart
       */
      closeCart: () => {
        set({ isOpen: false });
      },

      /**
       * Set shipping country
       */
      setCountry: (country) => {
        set({ country });
      },

      /**
       * Calculate subtotal (sum of all item prices)
       * Returns amount in cents
       */
      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      },

      /**
       * Calculate shipping cost based on cart contents
       * Returns amount in cents
       */
      getShipping: () => {
        const { items, country } = get();
        const itemCount = items.reduce((total, item) => total + item.quantity, 0);
        const subtotal = get().getSubtotal();

        if (itemCount === 0) return 0;

        return calculateShipping(itemCount, subtotal, country);
      },

      /**
       * Calculate VAT (tax) on subtotal + shipping
       * Returns amount in cents
       */
      getVAT: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShipping();
        const taxableAmount = subtotal + shipping;

        return calculateVAT(taxableAmount, VAT_RATE);
      },

      /**
       * Calculate total (subtotal + shipping + VAT)
       * Returns amount in cents
       */
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShipping();
        const vat = get().getVAT();

        return subtotal + shipping + vat;
      },

      /**
       * Get total number of items in cart
       */
      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "tanglewood-cart-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Partial persist - only persist items and country, not isOpen
      partialize: (state) => ({
        items: state.items,
        country: state.country,
      }),
    }
  )
);

/**
 * Hook to get cart item by artwork ID and type
 */
export function useCartItem(
  artworkId: string,
  type: "original" | "print",
  printVariantId?: string
): CartItem | undefined {
  return useCartStore((state) =>
    state.items.find(
      (item) =>
        item.artworkId === artworkId &&
        item.type === type &&
        (type === "print" ? item.printVariant?.id === printVariantId : true)
    )
  );
}

/**
 * Hook to check if an item is in cart
 */
export function useIsInCart(
  artworkId: string,
  type: "original" | "print",
  printVariantId?: string
): boolean {
  const item = useCartItem(artworkId, type, printVariantId);
  return !!item;
}
