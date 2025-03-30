"use client";
import React, { ChangeEvent } from "react";
import { cn } from "@/shared/lib/utils";
import Title from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import {
  useFetchAllItems,
  useFilterSearch,
  useQueryFilterRouter,
} from "@/shared/hooks";
import { MAX_PRICE, MIN_PRICE } from "@/shared/constants";

interface FiltersProps {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const [
    filters,
    {
      toggle,
      set: { setPrice },
    },
  ] = useFilterSearch();

  useQueryFilterRouter(filters);

  const [ingredients, loading, error] = useFetchAllItems("ingredients");
  const ingredientsItems = ingredients.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  const { price, selectedIngredients, selectedSizes, pizzaTypes } = filters;
  const { priceFrom, priceTo } = price;

  const handlePriceInput = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof typeof price
  ): void => {
    const value = +e.target.value;
    e.target.value = String(value);
    switch (key) {
      case "priceFrom":
        if (value > priceTo) e.target.value = String(priceTo);
        if (value < MIN_PRICE) e.target.value = String(MIN_PRICE);
        break;
      case "priceTo":
        if (value < priceFrom) e.target.value = String(priceFrom);
        if (value > MAX_PRICE) e.target.value = String(MAX_PRICE);
        break;
      default:
        const exhaustCheck: never = key;
        return exhaustCheck;
    }

    updatePrice(+e.target.value, key);
  };
  const updatePrice = (value: number, key: keyof typeof price) => {
    setPrice((p) => ({ ...p, [key]: value }));
  };

  return (
    <div className={cn("", className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      {/*верхние чекбоксы*/}
      <CheckboxFiltersGroup
        title="Размер"
        name="sizes"
        className="mb-5"
        onClickCheckbox={toggle.sizes}
        selected={selectedSizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />
      <CheckboxFiltersGroup
        title="Типы теста"
        name="types"
        className="mb-5"
        onClickCheckbox={toggle.pizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Толстое", value: "2" },
        ]}
      />
      {/*Фильтрация цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder={String(MIN_PRICE)}
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={priceFrom}
            onChange={(e) => handlePriceInput(e, "priceFrom")}
            step={100}
          />
          <Input
            type="number"
            placeholder={String(MAX_PRICE)}
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={priceTo}
            onChange={(e) => handlePriceInput(e, "priceTo")}
            step={100}
          />
        </div>
        {/*Фильтрация нашим двойным слайдером*/}
        <RangeSlider
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={10}
          value={[priceFrom, priceTo]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrice({ priceFrom, priceTo })
          }
        />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты"
        loading={loading}
        className="mt-5"
        limit={6}
        defaultItems={ingredientsItems.slice(0, 6)}
        items={ingredientsItems}
        onClickCheckbox={toggle.ingredients}
        selected={selectedIngredients}
      />
    </div>
  );
};
