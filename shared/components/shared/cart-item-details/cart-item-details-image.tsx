import { cn } from "@/shared/lib";
import { memo } from "react";

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = memo(
  ({ src, className }) => {
    return <img className={cn("w-[60px] h-[60px]", className)} src={src} />;
  }
);
