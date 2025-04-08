import React from "react";
import { Checkbox } from "@/shared/components/ui";
export interface FilterCheckboxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckChange?: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  text,
  value,
  endAdornment,
  onCheckChange,
  checked,
  defaultChecked,
  name,
}) => {
  return (
    <div className="flex item-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckChange}
        checked={checked}
        value={value}
        defaultChecked={defaultChecked}
        className="rounded-[8px] w-6 h-6"
        id={`checkbox-${name}-${value}`}
      />
      <label
        htmlFor={`checkbox-${name}-${String(value)}`}
        className="leading-none cursor-pointer flex-1"
      >
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
