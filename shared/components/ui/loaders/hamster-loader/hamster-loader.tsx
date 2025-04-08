"use client";
import { FC } from "react";
import StyledWrapper from "./styled-wrapper";
import { cn } from "@/shared/lib";

interface HamsterLoaderProps {
  className?: string;
}

export const HamsterLoader: FC<HamsterLoaderProps> = ({ className }) => {
  return (
    <div className="relative min-w-1 min-h-1 text-sm shrink ">
      <StyledWrapper>
        <div
          aria-label="Orange and tan hamster running in a metal wheel"
          role="img"
          className={"wheel-and-hamster "}
        >
          <div className="wheel" />
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear" />
                <div className="hamster__eye" />
                <div className="hamster__nose" />
              </div>
              <div className="hamster__limb hamster__limb--fr" />
              <div className="hamster__limb hamster__limb--fl" />
              <div className="hamster__limb hamster__limb--br" />
              <div className="hamster__limb hamster__limb--bl" />
              <div className="hamster__tail" />
            </div>
          </div>
          <div className="spoke" />
        </div>
      </StyledWrapper>
    </div>
  );
};
