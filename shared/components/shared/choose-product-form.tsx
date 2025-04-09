"use client";

import React from "react";

import { cn } from "@/shared/lib";

import Title from "./title";
import { Button } from "@/shared/components/ui";
import { ProductItem } from "@prisma/client";

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  ingredients?: any[];
  items?: ProductItem[];
  onClickAddCart?: (productId?: number | null) => void;
  className?: string;
  loading: boolean;
}

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
  className,
  imageUrl,
  name,
  ingredients,
  onClickAddCart,
  items,
  loading,
}) => {
  const textDetails = "30 см, традиционное тесто 30";
  const totalPrice = 350;
  const handleClick = () => {
    onClickAddCart?.(items?.[0].id);
  };

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
          loading={loading}
          onClick={handleClick}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};
