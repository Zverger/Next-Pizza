import { PizzaSize, PizzaType } from "@/shared/constants";
import { CartDTO } from "@/shared/services/dto/cart.dto";
import { CartStateItem } from "@/shared/store";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map<CartStateItem>((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productItem.size as PizzaSize,
    pizzaType: item.productItem.pizzaType as PizzaType,
    ingedients: item.ingredients.map(({ name, price }) => ({
      name,
      price,
    })),
  }));

  return {
    totalAmount: data.totalAmount,
    items,
  };
};
