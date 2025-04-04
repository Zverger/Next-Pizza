import { create } from "zustand";
import { Api } from "@/shared/services/api-client";

import { getCartDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants";
import { fetchStoreApi } from "./utils";

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
  error: Error | null | unknown;
  totalAmount: number;
  items: CartStateItem[];
  totalFetches: number;

  /*Получение списка товаров из корзины */
  fetchCartItems: () => Promise<void>;
  /*запрос на обновление кол-во товара в корзину */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>; //типизировать values
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: null,
  loading: true,
  totalAmount: 0,
  totalFetches: 0,
  fetchCartItems: async () =>
    fetchStoreApi(
      set,
      get,
      async () => await Api.cart.getCart(),
      getCartDetails
    ),
  updateItemQuantity: (id, quantity) =>
    fetchStoreApi(
      set,
      get,
      async () => await Api.cart.updateCartQuantity(id, quantity),
      getCartDetails
    ),
  addCartItem: async () => {},
  removeCartItem: async () => {},
}));
