export interface QueryFilters {
  priceFrom: number | null;
  priceTo: number | null;
  pizzaTypes: string[];
  sizes: string[];
  ingredients: string[];
}

export interface QueryValues {
  price: { priceFrom: number; priceTo: number };
  pizzaTypes: Set<string>;
  sizes: Set<string>;
  ingredients: Set<string>;
}
