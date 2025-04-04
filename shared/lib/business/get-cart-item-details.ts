import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants";

export const getCartItemDetails = (
  pizzaType: PizzaType | null | undefined,
  pizzaSize: PizzaSize | null | undefined,
  ingredients: { name: string }[] | null | undefined
) => {
  const details: string[] = [];
  if (pizzaType && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} тесто ${pizzaSize} см`);
  }
  if (ingredients) {
    details.push(...ingredients.map((ing) => ing.name));
  }

  return details.join(", ");
};
