import { FC, useCallback } from "react";
import { cn } from "@/shared/lib";
import { useShallow } from "zustand/react/shallow";
import * as CartItem from "./cart-item-details";
import { CountButton } from "./count-button";
import { TrashIcon } from "lucide-react";

import { SpinnerLoader } from "@/shared/components/ui";
import { CartState, useCartStore } from "@/shared/store";

interface CartDrawerItemProps {
  className?: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
}

const useUpdateItemQuantitySelector = (state: CartState) =>
  state.useUpdateItemQuantity;
const useRemoveCartItemSelector = (state: CartState) => state.useRemoveCartItem;

export const CartDrawerItem: FC<CartDrawerItemProps> = ({
  className,
  id,
  imageUrl,
  name,
  price,
  quantity,
  details,
}) => {
  const [updateItemQuantity, loadingUpdate, errorUpdate] = useCartStore(
    useShallow(useUpdateItemQuantitySelector)
  )(id);

  const [removeCartItem, loadingRemove, errorRemove] = useCartStore(
    useShallow(useRemoveCartItemSelector)
  )(id);

  const onClickCountBtn = useCallback(
    (counted: number, setCount: (c: number) => void) => {
      const fetchId = updateItemQuantity?.(
        quantity + counted > 1 ? quantity + counted : 1,
        { onFinal: () => setCount(0) }
      );
    },
    [id, quantity]
  );
  const onClickRemove = useCallback(() => {
    removeCartItem();
  }, [id]);
  console.log(name, quantity);
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
            loading={loadingUpdate}
            deleting={loadingRemove}
          >
            <SpinnerLoader />
          </CountButton>
          <div>
            <CartItem.Price
              value={price}
              loading={loadingUpdate || loadingRemove}
            />
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
