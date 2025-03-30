"use client";
import React from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";
import { Title } from "./title";

type Item = FilterCheckboxProps;

interface CheckboxFiltersGroupProps {
  title: string;
  name?: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValues?: Set<string>;
  className?: string;
  selected?: Set<string>;
  searchable?: boolean;
}

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
  className,
  title,
  items,
  defaultItems,
  limit = items.length,
  loading = false,
  name = title,
  searchInputPlaceholder = "Поиск...",
  onClickCheckbox,
  defaultValues,
  selected,
  searchable = false,
}) => {
  const [showAll, setShowAll] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState("");
  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : (defaultItems || items).slice(0, limit) || [];

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  if (loading)
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {Array.from({ length: limit }).map((_, idx) => (
          <Skeleton className="h-6 mb-5 rounded-[8px]" key={idx} />
        ))}
        <Skeleton className="w-28 h-6 mb-5 rounded-[8px]" />
      </div>
    );

  return (
    <div className={className}>
      <Title text={title} className="mb-5" />
      {searchable && (
        <div className="mb-5">
          <Input
            onChange={onSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-100 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, idx) => (
          <FilterCheckbox
            name={name}
            defaultChecked={defaultValues?.has(item.value)}
            key={idx}
            text={item.text}
            value={item.value}
            checked={selected?.has(item.value)}
            onCheckChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            className="text-primary mt-3"
            onClick={() => setShowAll((show) => !show)}
          >
            {showAll ? "Скрыть" : "+Показать всё"}
          </button>
        </div>
      )}
    </div>
  );
};
