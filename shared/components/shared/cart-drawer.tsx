"use client";

import { getCartItemDetails } from "@/shared/lib";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetFooter,
  Button,
} from "@/shared/components/ui";
import { FC, PropsWithChildren, useCallback, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";

import { CartStateItem, useCartStore } from "@/shared/store";

interface Props {
  className?: string;
  totalAmount?: number;
  items?: CartStateItem[];
}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({
  totalAmount = 0,
  items = [],
  children,
}) => {
  const isFetching = useCartStore((state) => state.isFetching);
  const loading = isFetching();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          В корзине
          {loading ? (
            <div className=" w-5 h-5 grid rounded-[50%] border-gray-200 border-solid border-2 border-t-black animate-spin"></div>
          ) : (
            <span className="font-bold-3">
              {items.reduce((acc, item) => acc + item.quantity, 0)} товара
            </span>
          )}
        </SheetHeader>
        <div className="-mx-6 mt-5 overflow-auto flex-1">
          {items.map((item) => (
            <div className="mb-2" key={item.id}>
              <CartDrawerItem
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  item.pizzaType,
                  item.pizzaSize,
                  item.ingedients
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            </div>
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>
            <Link href={"/cart"}>
              <Button type="submit" className="w-full h-12 text-baase">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
