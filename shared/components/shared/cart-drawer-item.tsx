import { FC, useRef } from "react";
import { cn } from "@/shared/lib";

import * as CartItem from "./cart-item-details";
import { CountButton } from "./count-button";
import { TrashIcon } from "lucide-react";

import { SpinnerLoader } from "@/shared/components/ui";
import { useCartStore } from "@/shared/store";

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
  const { updateItemQuantity, isLoading, removeCartItem } = useCartStore();
  const fetchUpdateId = useRef<number>(null);
  const loading = isLoading(fetchUpdateId.current);
  const onClickCountBtn = (counted: number) => {
    fetchUpdateId.current = updateItemQuantity?.(
      id,
      quantity + counted > 1 ? quantity + counted : 1
    );
  };
  const onClickRemove = () => {
    removeCartItem(id);
  };

  return (
    <div className={cn(className, "flex bg-white p-5 gap-6")}>
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info name={name} details={details} />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CountButton
            onCount={onClickCountBtn}
            value={quantity}
            loading={loading}
          >
            <SpinnerLoader />
          </CountButton>
          <div>
            <CartItem.Price value={price} loading={loading} />
            <TrashIcon
              onClick={onClickRemove}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
