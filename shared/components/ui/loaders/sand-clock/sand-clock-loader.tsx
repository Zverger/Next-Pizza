import { FC } from "react";
import { cn } from "@/shared/lib";
import css from "./sand-clock.module.css";

interface SandClockProps {
  className?: string;
}

export const SandClockLoader: FC<SandClockProps> = ({ className }) => {
  return <div className={cn(className, css.loader)} />;
};
