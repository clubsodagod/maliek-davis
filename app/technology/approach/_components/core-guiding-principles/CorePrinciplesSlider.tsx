"use client";

import React, { useEffect } from "react";
import CorePrincipleCard from "./CorePrincipleCard";
import { corePrinciples } from "../_library/copy.const";

type CorePrinciplesSliderProps = {
  forwardedRef: React.RefObject<HTMLDivElement>;
};

const CorePrinciplesSlider = ({ forwardedRef }: CorePrinciplesSliderProps) => {

  const boxRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = 0
    }
    
  },[]);

  return (
    <div
      ref={boxRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white"
      style={{ scrollBehavior: "smooth" }}
    >
      {corePrinciples.map((principle, index) => (
        <div
          key={index}
          ref={index === 0 ? forwardedRef : null}
          className="snap-start h-screen w-full flex items-center justify-center"
        >
          <CorePrincipleCard
            principle={principle}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
          />
        </div>
      ))}
    </div>
  );
};

export default CorePrinciplesSlider;
