import React from "react";
import clsx from "clsx";

type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface TitleProps {
  size?: SizeType;
  className?: string;
  text: string;
}

export const Title: React.FC<TitleProps> = ({
  size = "sm",
  text,
  className,
}) => {
  const tagBySize = {
    xs: "h5",
    sm: "h4",
    md: "h3",
    lg: "h2",
    xl: "h1",
    "2xl": "h1",
  }[size];
  const classNameBySize = {
    xs: "text-[16px]",
    sm: "text-[22px]",
    md: "text-[26px]",
    lg: "text-[32px]",
    xl: "text-[40px]",
    "2xl": "text-[48px]",
  }[size];

  return React.createElement(
    tagBySize,
    { className: clsx(className, classNameBySize) },
    text
  );
};

export default Title;
