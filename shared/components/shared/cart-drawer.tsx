import { cn } from "@/shared/lib";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetFooter,
  Button,
} from "@/shared/components/ui";
import { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  className?: string;
  totalAmount: number;
}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({
  children,
  totalAmount,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          В корзине <span className="font-bold-3">3 товара</span>
        </SheetHeader>
        {/*Items */}
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
