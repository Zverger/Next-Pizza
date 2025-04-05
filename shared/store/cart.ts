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

type FetchId = number;

export interface CartState {
  isLoading: (fetchId: number | null) => boolean;
  error: Error | null | unknown;
  totalAmount: number;
  fetchesSet: Set<number>;
  items: CartStateItem[];
  totalFetches: number;

  /*Получение списка товаров из корзины */
  fetchCartItems: () => FetchId;
  /*запрос на обновление кол-во товара в корзину */
  updateItemQuantity: (id: number, quantity: number) => FetchId;
  addCartItem: (values: any) => FetchId; //типизировать values
  removeCartItem: (id: number) => FetchId;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: null,
  isLoading: (fetchId) => (fetchId ? get().fetchesSet.has(fetchId) : false),
  totalAmount: 0,
  fetchesSet: new Set<number>(),
  totalFetches: 0,
  fetchCartItems: () =>
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
  addCartItem: () => 0,
  removeCartItem: () => 0,
}));
