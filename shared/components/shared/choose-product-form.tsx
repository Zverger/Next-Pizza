"use client";

import React from "react";

import { cn } from "@/shared/lib/utils";

import Title from "./title";
import { Button } from "@/shared/components/ui";

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  ingredients?: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
  className,
  imageUrl,
  name,
  ingredients,
  onClickAdd,
  items,
}) => {
  const textDetails = "30 см, традиционное тесто 30";
  const totalPrice = 350;
  const handleClick = () => {};

  return (
    <div className={cn(className, "flex flex-1")}>
      <img
        src={imageUrl}
        alt={name}
        className="relative left-2 top-2 z-10  w-[300px] h-[300px]"
      />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <Button
          onClick={handleClick}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};
