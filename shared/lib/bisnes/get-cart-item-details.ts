import { Ingredient } from "@prisma/client";
import { PizzaSize, PizzaType } from "@/shared/constants";

export const getCartItemDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: Ingredient[]
) => {};
