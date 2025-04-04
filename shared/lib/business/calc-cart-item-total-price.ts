import { ingredients } from "@/prisma/constants";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { access } from "fs";

export const calcCartItemTotalPrice = (item: CartItemDTO) => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );
  return (ingredientsPrice + item.productItem.price) * item.quantity;
};
