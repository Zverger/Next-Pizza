import { CartState, useCartStore } from "@/shared/store";
import { useEffect } from "react";

type ReturnProps = Omit<CartState, "fetchCartItems">;

export const useCart = (): ReturnProps => {
  const { fetchCartItems, ...cartState } = useCartStore();

  useEffect(() => {
    fetchCartItems();
  }, []);

  return cartState;
};
