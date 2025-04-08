"use client";
import React from "react";
import { cn } from "@/shared/lib";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";

interface CategoriesProps {
  className?: string;
  items: Category[];
}

export const Categories: React.FC<CategoriesProps> = ({ className, items }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn(className, "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl")}
    >
      {items.map((cat, idx) => (
        <a
          key={cat.id}
          className={cn(
            "flex item-center font-bold h-11 rounded-2xl px-5",
            activeCategoryId === cat.id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/#${cat.name}`}
        >
          <button>{cat.name}</button>
        </a>
      ))}
    </div>
  );
};
