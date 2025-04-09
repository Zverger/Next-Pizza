import { create } from "zustand";
import { Api } from "@/shared/services/api-client";

import { getCartDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants";
import { fetchApi, fetchStoreApi, OnFetchType } from "./utils";
import { useState } from "react";

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

type FetchId = string;

export interface CartState {
  isLoading: (fetchId: string | null) => boolean;
  isFetching: () => boolean;
  error: Error | null | unknown;
  totalAmount: number;
  fetchesSet: Set<string>;
  items: CartStateItem[];

  useUpdateItemQuantity: (
    id: number
  ) => [
    (quantity: number, onFetch: OnFetchType) => void,
    boolean,
    Error | null
  ];
  useRemoveCartItem: (id: number) => [() => void, boolean, Error | null];
  useAddCartItem: () => [
    (
      productItemId: number,
      ingredientsId?: number[],
      onFetch?: OnFetchType
    ) => void,
    boolean,
    Error | null
  ];

  //Получение списка товаров из корзины
  fetchCartItems: () => FetchId;
  /*
  //запрос на обновление кол-во товара в корзину 
  updateItemQuantity: (
    id: number,
    quantity: number,
    onFethed?: VoidFunction
  ) => FetchId;
  addCartItem: (productItemId: number, ingredientsId?: number[]) => FetchId; //типизировать values
  removeCartItem: (id: number) => FetchId;
  */
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  error: null,
  isLoading: (fetchId) => (fetchId ? get().fetchesSet.has(fetchId) : false),
  isFetching: () => get().fetchesSet.size > 0,
  totalAmount: 0,
  fetchesSet: new Set<string>(),
  totalFetches: 0,
  fetchCartItems: () =>
    fetchStoreApi(
      set,
      get,
      async () => await Api.cart.getCart(),
      getCartDetails
    ),

  useUpdateItemQuantity: (id) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const fetch = (quantity: number, onFetch?: OnFetchType) =>
      fetchApi(
        set,
        get,
        async () => await Api.cart.updateCartQuantity(id, quantity),
        getCartDetails,
        {
          onStart: () => {
            setLoading(true);
            setError(null);
            onFetch?.onStart?.();
          },
          onError: (e) => {
            setError(e);
            onFetch?.onError?.(e);
          },
          onFinal: () => {
            setLoading(false);
            onFetch?.onFinal?.();
          },
        }
      );
    return [fetch, loading, error];
  },
  useRemoveCartItem: (id) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const fetch = (onFetch?: OnFetchType) =>
      fetchApi(
        set,
        get,
        async () => await Api.cart.removeCartItem(id),
        getCartDetails,
        {
          onStart: () => {
            setLoading(true);
            setError(null);
            onFetch?.onStart?.();
          },
          onError: (e) => {
            setError(e);
            onFetch?.onError?.(e);
          },
          onFinal: () => {
            setLoading(false);
            onFetch?.onFinal?.();
          },
        }
      );
    return [fetch, loading, error];
  },
  useAddCartItem: () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const fetch = (
      productItemId: number,
      ingredientsId?: number[],
      onFetch?: OnFetchType
    ) =>
      fetchApi(
        set,
        get,
        async () => await Api.cart.addCartItem(productItemId, ingredientsId),
        getCartDetails,
        {
          onStart: () => {
            setLoading(true);
            setError(null);
            onFetch?.onStart?.();
          },
          onError: (e) => {
            setError(e);
            onFetch?.onError?.(e);
          },
          onFinal: () => {
            setLoading(false);
            onFetch?.onFinal?.();
          },
        }
      );
    return [fetch, loading, error];
  },
  /*
  updateItemQuantity: (id, quantity, onFethed) =>
    fetchStoreApi(
      set,
      get,
      async () => await Api.cart.updateCartQuantity(id, quantity),
      getCartDetails,
      onFethed
    ),
  addCartItem: (productItemId: number, ingredientsId?: number[]) =>
    fetchStoreApi(
      set,
      get,
      async () => await Api.cart.addCartItem(productItemId, ingredientsId),
      getCartDetails
    ),
  removeCartItem: (id) =>
    fetchStoreApi(
      set,
      get,
      async () => await Api.cart.removeCartItem(id),
      getCartDetails
    ),*/
}));
