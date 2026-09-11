import { create } from 'zustand';

export interface CartItem {
  productId: string;
  title: string;
  price: string;
  quantity: number;
  image?: string;
}

interface CartState {
  cart: CartItem[];

  // Getters
  isEmpty: () => boolean;

  addProductToCart: (cartItem: CartItem) => void;
  addMultipleProductsToCart: (cartItem: CartItem[]) => void;
  updateQuantity: (cartItem: CartItem, quantity: number) => void;
  removeProduct: (cartItem: CartItem) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  cart: [],

  addProductToCart: (item) => {
    const { cart } = get();

    set({ cart: [...cart, item] });
  },

  isEmpty: () => {
    const { cart } = get();
    return cart.length === 0;
  },

  addMultipleProductsToCart: (items) => {
    const { cart } = get();

    set({ cart: [...cart, ...items] });
  },

  updateQuantity(cartItem, quantity) {
    const { cart } = get();

    const updatedCart = cart.map((item) => {
      if (item.productId === cartItem.productId) {
        return { ...item, quantity };
      }
      return item;
    });

    set({ cart: updatedCart });
  },

  removeProduct(item) {
    const { cart } = get();

    const updatedCart = cart.filter(
      (product) => product.productId !== item.productId,
    );

    set({ cart: updatedCart });
  },

  clearCart: () => {
    set({ cart: [] });
  },
}));
