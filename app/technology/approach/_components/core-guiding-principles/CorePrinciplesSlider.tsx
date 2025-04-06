"use client";

import React from "react";
import CorePrincipleCard from "./CorePrincipleCard";
import { corePrinciples } from "../_library/copy.const";

type CorePrinciplesSliderProps = {
  forwardedRef: React.RefObject<HTMLDivElement>;
};

const CorePrinciplesSlider = ({ forwardedRef }: CorePrinciplesSliderProps) => {
  return (
    <div
      ref={forwardedRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white"
      style={{ scrollBehavior: "smooth" }}
    >
      {corePrinciples.map((principle, index) => (
        <div
          key={index}
          className="snap-start h-screen w-full flex items-center justify-center"
        >
          <CorePrincipleCard
            principle={principle}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      ))}
    </div>
  );
};

export default CorePrinciplesSlider;
