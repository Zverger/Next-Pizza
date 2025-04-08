"use client";

import React from "react";
import { cn } from "@/shared/lib";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  VisuallyHidden,
} from "@/shared/components/ui";

import { useRouter } from "next/navigation";
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared";
import { IProduct } from "@/@types";
import { useCartStore } from "@/shared/store";

interface ChooseProductModalProps {
  className?: string;
  product: IProduct;
}

export const ChooseProductModal: React.FC<ChooseProductModalProps> = ({
  className,
  product,
}) => {
  const router = useRouter();
  const isPizzaForms = Boolean(product.items?.[0].pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const handleClickAddCartItem = (
    productId: number | null,
    ingredientsId: number[] = []
  ) => {
    console.log(1);
    if (productId) {
      addCartItem(productId, ingredientsId);
      router.back();
      console.log(2);
    }
  };
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          className,
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden"
        )}
      >
        <VisuallyHidden>
          <DialogTitle />
        </VisuallyHidden>

        {isPizzaForms ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onClickAddCart={handleClickAddCartItem}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
