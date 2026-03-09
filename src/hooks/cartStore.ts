// src/stores/cartStore.ts
// (or src/hooks/cartStore.ts – whichever folder you prefer)

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem | Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
  hasItem: (id: number) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) =>
        set((state) => {
          const quantity = 'quantity' in newItem ? (newItem.quantity ?? 1) : 1;

          const existingIndex = state.items.findIndex((i) => i.id === newItem.id);

          if (existingIndex !== -1) {
            // Item already exists → increment quantity
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
            };
            return { items: updated };
          }

          // New item
          return {
            items: [...state.items, { ...newItem, quantity }],
          };
        }),

      updateQuantity: (id, delta) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      hasItem: (id) => get().items.some((item) => item.id === id),
    }),

    {
      name: 'belleville-dental-cart-v1',     // unique key in localStorage
      storage: createJSONStorage(() => localStorage),
      version: 1,
      // partialize: (state) => ({ items: state.items }), // optional: only persist items
      // migrate: (persistedState, version) => { ... }   // add later if schema changes
    }
  )
);