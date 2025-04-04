import { create } from "zustand";
import { Api } from "@/shared/services/api-client";

import { getCartDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants";

export type CartStateItem = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  pizzaSize?: PizzaSize | null;
  pizzaType?: PizzaType | null;
  ingedients: Array<{ name: string; price: number }>;
};

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /*Получение списка товаров из корзины */
  fetchCartItems: () => Promise<void>;
  /*запрос на обновление кол-во товара в корзину */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>; //типизировать values
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async () => {},
  addCartItem: async () => {},
  removeCartItem: async () => {},
}));
