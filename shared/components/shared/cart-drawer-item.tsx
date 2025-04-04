import { FC } from "react";
import { cn, getCartItemDetails } from "@/shared/lib";

import * as CartItem from "./cart-item-details";
import { CountButton } from "./count-button";
import { TrashIcon } from "lucide-react";

interface CartDrawerItemProps {
  className?: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
}

export const CartDrawerItem: FC<CartDrawerItemProps> = ({
  className,
  id,
  imageUrl,
  name,
  price,
  quantity,
  details,
}) => {
  return (
    <div className={cn(className, "flex bg-white p-5 gap-6")}>
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info name={name} details={details} />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CountButton onClick={(type) => console.log(type)} value={quantity} />
          <div className="flex items-center justify-between">
            <CartItem.Price value={price} />
            <TrashIcon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
