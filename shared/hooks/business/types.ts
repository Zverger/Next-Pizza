export interface QueryFilters {
  priceFrom: number | null;
  priceTo: number | null;
  pizzaTypes: string[];
  selectedSizes: string[];
  selectedIngredients: string[];
}

export interface QueryValues {
  price: { priceFrom: number; priceTo: number };
  pizzaTypes: Set<string>;
  selectedSizes: Set<string>;
  selectedIngredients: Set<string>;
}
