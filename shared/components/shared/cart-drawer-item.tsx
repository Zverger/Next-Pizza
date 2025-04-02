import { FC } from "react";
import { cn } from "@/shared/lib";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";

import * as CartItem from "./cart-item-details";

interface CartDrawerItemProps {
  className?: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

export const CartDrawerItem: FC<CartDrawerItemProps> = ({
  className,
  imageUrl,
}) => {
  return (
    <div className={cn(className, "flex bg-white p-5 gap-6")}>
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info />
      </div>
    </div>
  );
};
