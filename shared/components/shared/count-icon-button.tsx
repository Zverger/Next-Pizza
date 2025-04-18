"use client";

import { cn } from "@/shared/lib";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { CountButtonProps } from "./count-button";
import { FC, memo } from "react";

interface IconButtonProps {
  size?: CountButtonProps["size"];
  disabled?: boolean;
  type: "plus" | "minus";
  onClick?: (type: "plus" | "minus") => void;
  className?: string;
}

export const CountIconButton: FC<IconButtonProps> = memo(
  ({ size = "sm", disabled, type, onClick, className }) => {
    console.log(type);
    return (
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={() => onClick?.(type)}
        className={cn(
          className,
          "p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400",
          size === "sm"
            ? "w-[30px] h-[30px] rounded-[10px]"
            : "w-[38px] h-[38px] rounded-md"
        )}
      >
        {type === "plus" ? (
          <Plus className={size === "sm" ? "h-4" : "h-5"} />
        ) : (
          <Minus className={size === "sm" ? "h-4" : "h-5"} />
        )}
      </Button>
    );
  }
);
