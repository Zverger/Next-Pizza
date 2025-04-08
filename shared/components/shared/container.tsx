import React from "react";
import { cn } from "@/shared/lib";

interface ContainerProps {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("mx-auto max-w-[1200px]", className)}>{children}</div>
  );
};
