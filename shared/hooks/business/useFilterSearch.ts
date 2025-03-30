import { useSearchParamsSet, useSearchParamsFromTo } from "../shared";
import { QueryFilters, QueryValues } from "./types";
import { MIN_PRICE, MAX_PRICE } from "@/shared/constants";
import { useSearchParams } from "next/navigation";

type SetState<T> = (value: T | ((value: T) => T)) => void;
type Toggle<T> = (value: T) => void;

interface ChangeStates {
  toggle: {
    ingredients: Toggle<string>;
    pizzaTypes: Toggle<string>;
    sizes: Toggle<string>;
  };
  set: { setPrice: SetState<{ priceFrom: number; priceTo: number }> };
}

export const useFilterSearch = (): [QueryValues, ChangeStates] => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] =
    useSearchParamsSet(searchParams, "selectedIngredients");
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSearchParamsSet(
    searchParams,
    "pizzaTypes"
  );
  const [selectedSizes, { toggle: toggleSizes }] = useSearchParamsSet(
    searchParams,
    "selectedSizes"
  );

  const [price, setPrice] = useSearchParamsFromTo(
    searchParams,
    "priceFrom",
    "priceTo",
    [MIN_PRICE, MAX_PRICE],
    "price"
  );

  return [
    {
      price,
      selectedIngredients,
      pizzaTypes,
      selectedSizes,
    },
    {
      toggle: {
        ingredients: toggleIngredients,
        pizzaTypes: togglePizzaTypes,
        sizes: toggleSizes,
      },
      set: { setPrice },
    },
  ];
};
