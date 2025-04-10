"use client";
import { cn } from "@/shared/lib";
import { CountIconButton } from "./count-icon-button";
import { FC, memo, ReactElement, useCallback, useState } from "react";
import { useDebounce } from "react-use";

export interface CountButtonProps {
  loading?: boolean;
  deleting?: boolean;
  value?: number;
  size?: "sm" | "lg";
  onCount?: (delta: number, setDelta: (zero: number) => void) => void;
  className?: string;
  classNameIcons?: string;
  children?: ReactElement;
}

export const CountButton: FC<CountButtonProps> = memo(
  ({
    value = 1,
    size = "sm",
    onCount,
    className,
    classNameIcons,
    loading,
    deleting,
  }) => {
    const [count, setCount] = useState(0);

    useDebounce(
      () => {
        count && onCount?.(count, setCount);
      },
      500,
      [count]
    );
    const onClickCount = useCallback((type: "plus" | "minus") => {
      setCount((c) => (type === "plus" ? c + 1 : c - 1));
    }, []);

    return (
      <div
        className={cn(
          className,
          "inline-flex items-center justify-between gap-3"
        )}
      >
        <CountIconButton
          onClick={onClickCount}
          disabled={value + count < 2 || deleting}
          size={size}
          type="minus"
          className={classNameIcons}
        />
        {loading || deleting ? (
          <div className=" w-5 h-5 grid rounded-[50%] border-gray-200 border-solid border-2 border-t-black animate-spin"></div>
        ) : (
          <b className={size === "sm" ? "text-sm" : "text-md"}>
            {value + count}
          </b>
        )}
        <CountIconButton
          onClick={onClickCount}
          size={size}
          type="plus"
          disabled={deleting}
          className={classNameIcons}
        />
      </div>
    );
  }
);
