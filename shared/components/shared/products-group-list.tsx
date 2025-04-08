"use client";
import React, { RefObject } from "react";
import { Title } from "./title";
import { cn } from "@/shared/lib";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store/category";

interface ProductGroupListProps {
  title: string;
  items: any[];
  listClassName?: string;
  categoryId: number;
  className?: string;
}

export const ProductGroupList: React.FC<ProductGroupListProps> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = React.useRef<HTMLDivElement>(null);
  const intersection = useIntersection(
    intersectionRef as RefObject<HTMLDivElement>,
    { threshold: 0.4 }
  );
  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      console.log(categoryId);
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, title, categoryId]);
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, idx) => (
          <ProductCard
            key={idx}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
