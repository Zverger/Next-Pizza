import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "@/shared/constants";

/**
 * Функция подсчета общей стоимости пиццы
 *
 * @example calcTotalPizzaPrice(items,1,20,ingredient, selectedIngredients)
 * @param items - список вариаций
 * @param type -тип теста выбранной пиицы
 * @param size  - размер пиццы
 * @param ingredients -список ингредиентов
 * @param selectedIngredients -выбранные ингредиенты
 * @returns 'number' - общая стоимость
 */

export const calcTotalPizzaPrice = (
  items: ProductItem[],
  type: PizzaType,
  size: PizzaSize,
  ingredients: Ingredient[],
  selectedIngredients: Set<Ingredient["id"]>
) => {
  const pizzaPrice = items.find((item) => item.pizzaType === type)?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter(({ id }) => selectedIngredients.has(id))
    .reduce((total, { price }) => total + price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
