import { useRouter } from "next/navigation";
import { QueryFilters, QueryValues } from "./types";
import qs from "qs";
import { useDebounce } from "react-use";
import { MIN_PRICE, MAX_PRICE } from "@/shared/constants";

export const useQueryFilterRouter = (
  props: QueryValues,
  delayMs: number = 350
) => {
  const router = useRouter();

  useDebounce(
    () => {
      const filters: QueryFilters = {
        pizzaTypes: Array.from(props.pizzaTypes),
        selectedSizes: Array.from(props.selectedSizes),
        selectedIngredients: Array.from(props.selectedIngredients),
        priceFrom:
          props.price.priceFrom != MIN_PRICE ? props.price.priceFrom : null,
        priceTo: props.price.priceTo != MAX_PRICE ? props.price.priceTo : null,
      };

      const query = qs.stringify(filters, {
        arrayFormat: "comma",
        skipNulls: true,
      });
      router.push(`?${query}`, { scroll: false });
    },
    delayMs,
    [
      props.pizzaTypes,
      props.selectedSizes,
      props.selectedIngredients,
      props.price,
    ]
  );
};
