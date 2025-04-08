import { FC } from "react";
import { cn } from "@/shared/lib";

interface SpinnerLoaderProps {
  className?: string;
  primaryColor?: string;
  outlineColor?: string;
}

export const SpinnerLoader: FC<SpinnerLoaderProps> = ({ className }) => {
  return (
    <div
      className={cn(
        `w-5 h-5  grid rounded-[50%] border-solid border-2 border-t-black animate-spin`,
        className
      )}
    />
  );
};
