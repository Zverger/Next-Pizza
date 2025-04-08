"use client";

import React from "react";
import { cn } from "@/shared/lib";

interface GroupVariantsProps<T, V extends Variant<T>> {
  items: readonly V[];
  onClick?: (value: V["value"]) => void;
  value?: V["value"];
  onAvailable?: (value: V["value"]) => boolean | undefined;
  className?: string;
}

interface Variant<T> {
  value: T;
  name: string;
  disabled?: boolean;
}

export function GroupVariants<T, V extends Variant<T>>({
  className,
  onClick,
  value,
  items,
  onAvailable,
}: GroupVariantsProps<T, V>) {
  return (
    <div
      className={cn(
        "flex justify-betwen bg-[#f3f3f7] rounded-3xl select-none p-1",
        className
      )}
    >
      {items.map((item) => {
        const disabled = onAvailable ? !onAvailable(item.value) : false;
        return (
          <button
            key={item.name}
            onClick={() => onClick?.(item.value)}
            disabled={disabled}
            className={cn(
              "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
              {
                "bg-white shadow": item.value === value,
                "text-gray-500 opacity-50 pointer-events-none": disabled,
              }
            )}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
}
