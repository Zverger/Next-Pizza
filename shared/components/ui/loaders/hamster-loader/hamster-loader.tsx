import { FC } from "react";
import { cn } from "@/shared/lib";
import css from "./hamster-loader.module.css";
interface HamsterLoaderProps {
  className?: string;
}

export const HamsterLoader: FC<HamsterLoaderProps> = ({ className }) => {
  return (
    <div
      aria-label="Orange and tan hamster running in a metal wheel"
      role="img"
      className={css["wheel-and-hamster"]}
    >
      <div className={css.wheel}></div>
      <div className={css.hamster}>
        <div className={css.hamster__body}>
          <div className={css.hamster__head}>
            <div className={css.hamster__ear}></div>
            <div className={css.hamster__eye}></div>
            <div className={css.hamster__nose}></div>
          </div>
          <div
            className={`${css.hamster__limb} ${css["hamster__limb--fr"]}`}
          ></div>
          <div
            className={`${css.hamster__limb} ${css["hamster__limb--fl"]}`}
          ></div>
          <div
            className={`${css.hamster__limb} ${css["hamster__limb--br"]}`}
          ></div>
          <div
            className={`${css.hamster__limb} ${css["hamster__limb--bl"]}`}
          ></div>
          <div className={css.hamster__tail}></div>
        </div>
      </div>
      <div className={css.spoke}></div>
    </div>
  );
};
