"use client";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { CartDrawer } from "./cart-drawer";

import { useCart } from "@/shared/hooks/business/use-cart";

interface Props {
  className?: string;
}

export function CartButton(props: Props) {
  const { items, totalAmount } = useCart();

  return (
    <CartDrawer items={items} totalAmount={totalAmount}>
      <Button className="group relative">
        <b>{totalAmount} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="reWtative" strokeWidth={2} />
          <b>{items.reduce((acc, item) => acc + item.quantity, 0)}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
}
