"use client";

import React, { useMemo, useState } from "react";

import { cn } from "@/shared/lib";

import Title from "./title";
import { Button } from "@/shared/components/ui";
import { PizzaImage } from "./pizza-image";
import { GroupVariants } from "./group-variants";
import {
  PizzaSize,
  PizzaType,
  mapPizzaType,
  pizzaSizes,
  pizzaTypes,
} from "@/shared/constants";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";
import { useSetGroupBy } from "@/shared/hooks";
import { calcTotalPizzaPrice } from "@/shared/lib";

interface Props {
  imageUrl: string;
  name: string;
  ingredients?: Ingredient[];
  items?: ProductItem[];
  onClickAddCart?: (
    productId?: number | null,
    ingredientsId?: number[]
  ) => void;
  className?: string;
  loading: boolean;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients = [],
  onClickAddCart,
  items = [],
  loading,
}) => {
  const [type, setType] = useState<PizzaType>(1);
  const [size, setSize] = useState<PizzaSize>(20);

  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(
    new Set<number>()
  );

  const itemsTypesGroupBySizes = useSetGroupBy(items, "size", "pizzaType");

  const totalPrice = calcTotalPizzaPrice(
    items,
    type,
    size,
    ingredients,
    selectedIngredients
  );

  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

  const handleClickAdd = () => {
    const selectedProductItemId = items.find(
      (item) => item.pizzaType === type && item.size === size
    )?.id;
    onClickAddCart?.(selectedProductItemId, Array.from(selectedIngredients));
  };
  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={pizzaSizes}
            value={size}
            onClick={(s) => {
              setSize(s);
              !itemsTypesGroupBySizes[s]?.has(type) &&
                setType(
                  itemsTypesGroupBySizes[s]?.values().next().value as 1 | 2
                );
            }}
            onAvailable={(s) => Boolean(itemsTypesGroupBySizes[s])}
          />
          <GroupVariants
            items={pizzaTypes}
            value={type}
            onClick={(t) => setType(t)}
            onAvailable={(t) => itemsTypesGroupBySizes[size]?.has(t)}
          />
        </div>
        <div className=" rounded-md p-5 h-[420px] overflow-auto  scrollbar bg-gray-50 my-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map(({ id, ...ingredient }) => (
              <IngredientItem
                key={id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => toggleIngredient(id)}
                active={selectedIngredients.has(id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};
