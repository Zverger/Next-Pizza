"use client";

import { Search } from "lucide-react";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Input } from "../ui";
import { cn } from "@/shared/lib";
import { useClickAway, useDebounce } from "react-use";
import Link from "next/link";
import { Api } from "@/shared/services/api-client";
import { Product } from "@prisma/client";

interface SearchInputProps {
  className?: string;
}

export const SearchInput: FC<SearchInputProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[] | null>();
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => {
    setFocused(false);
  });
  useDebounce(
    async () => {
      if (!searchQuery) {
        return;
      }
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (e) {
        console.log(e);
      }
    },
    250,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts(null);
  };

  const onSearchProduct = (query: string) => {
    setSearchQuery(query);
    !query && setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}
      <div
        className={cn(
          "relative flex rounded-2xl flex-1 justify-between  h-11 z-30",
          className
        )}
        ref={ref}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 text-gray-400 h-5" />
        <Input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => onSearchProduct(e.target.value)}
        />
        {products?.length && (
          <div
            className={cn(
              "absolute w-full bg-white py-2 top-14 shawod-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products?.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center gap-2 hover:bg-primary/10"
                onClick={onClickItem}
              >
                <img
                  src={product.imageUrl}
                  width={32}
                  height={32}
                  alt={product.name}
                />
                <div className="px-3 py-2 ">{product.name}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
