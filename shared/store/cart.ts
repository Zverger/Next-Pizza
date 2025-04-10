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

  fetchCartItems: () => FetchId;
}

//веделить хуки в отдельные компоненты, и поработать над оптимизацией, чтобы вызов метода хука не провоцировал ререндер там где не нужно
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
    const fetchId = crypto.randomUUID();

    const fetch = (quantity: number, onFetch?: OnFetchType) =>
      fetchApi(
        set,
        get,
        async () => await Api.cart.updateCartQuantity(id, quantity),
        getCartDetails,
        {
          ...onFetch,
          fetchId,
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
    const fetchId = crypto.randomUUID();
    const fetch = (onFetch?: OnFetchType) =>
      fetchApi(
        set,
        get,
        async () => await Api.cart.removeCartItem(id),
        getCartDetails,
        {
          ...onFetch,
          fetchId,
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
    const fetchId = crypto.randomUUID();
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
          ...onFetch,
          fetchId,
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
}));
