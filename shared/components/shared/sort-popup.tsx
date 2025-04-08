import { cn } from "@/shared/lib";
import { ArrowUpDown } from "lucide-react";
import React from "react";

interface SortPopupProps {
  className?: string;
}

export const SortPopup: React.FC<SortPopupProps> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        "inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer"
      )}
    >
      <ArrowUpDown size={16} />
      <b>Сортировка</b>
      <b className="text-primary">популярное</b>
    </div>
  );
};
