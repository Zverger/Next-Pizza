import { cn } from "@/shared/lib";
import React from "react";
import { Title, Container, Categories, SortPopup } from "./index";
import { Category } from "@prisma/client";
interface TopBarProps {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ className, categories }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
