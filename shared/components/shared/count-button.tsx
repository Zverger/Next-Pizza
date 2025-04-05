"use client";
import { cn } from "@/shared/lib";
import { CountIconButton } from "./count-icon-button";
import { FC, ReactElement } from "react";

export interface CountButtonProps {
  loading?: boolean;
  value?: number;
  size?: "sm" | "lg";
  onClick?: (type: "plus" | "minus") => void;
  className?: string;
  classNameIcons?: string;
  children?: ReactElement;
}

export const CountButton: FC<CountButtonProps> = ({
  value = 1,
  size = "sm",
  onClick,
  className,
  classNameIcons,
  loading,
  children = <div className="bg-gray-400 w-4" />,
}) => {
  return (
    <div
      className={cn(
        className,
        "inline-flex items-center justify-between gap-3"
      )}
    >
      <CountIconButton
        onClick={() => onClick?.("minus")}
        disabled={value === 1}
        size={size}
        type="minus"
        className={classNameIcons}
      />
      {loading ? (
        children
      ) : (
        <b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>
      )}
      <CountIconButton
        onClick={() => onClick?.("plus")}
        size={size}
        type="plus"
        className={classNameIcons}
      />
    </div>
  );
};
