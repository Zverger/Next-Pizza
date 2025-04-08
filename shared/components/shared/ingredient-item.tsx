import React from "react";
import { cn } from "@/shared/lib";
import { CircleCheck } from "lucide-react";

interface IngredientItemProps {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem: React.FC<IngredientItemProps> = ({
  imageUrl,
  name,
  price,
  active,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex relative items-center flex-col rounded-md w-32 text-center  cursor-pointer shadow-md bg-white border-2 border-white",
        {
          "border-primary": active,
        },
        className
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img width={110} height={110} src={imageUrl} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
};
