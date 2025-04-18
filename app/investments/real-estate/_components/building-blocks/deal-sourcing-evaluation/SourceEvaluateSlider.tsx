"use client";

import React, { useEffect } from "react";
import { sourceEvaluationMethods } from "@/app/investments/_library/copy";
import SourceEvaluateMethodCard from "./SourceEvaluateMethodCard";

type CorePrinciplesSliderProps = {
    forwardedRef: React.RefObject<HTMLDivElement>;
};

const SourceEvaluateSlider = ({ forwardedRef }: CorePrinciplesSliderProps) => {

    const boxRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.scrollTop = 0
        }

    }, []);

    return (
        <div
            ref={boxRef}
            className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white"
            style={{ scrollBehavior: "smooth" }}
        >
            {sourceEvaluationMethods.map((method, index) => (
                <div
                    key={index}
                    ref={index === 0 ? forwardedRef : null}
                    className="snap-start h-screen w-full flex items-center justify-center"
                >
                    <SourceEvaluateMethodCard
                        method={method}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
            ))}
        </div>
    );
};

export default SourceEvaluateSlider;
