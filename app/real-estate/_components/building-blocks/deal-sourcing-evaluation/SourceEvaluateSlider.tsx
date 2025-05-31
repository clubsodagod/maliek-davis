"use client";

import React, { useEffect } from "react";
import { sourceEvaluationMethods } from "@/app/investments/_library/copy";
import SourceEvaluateMethodCard from "./SourceEvaluateMethodCard";
import { Button } from "@mui/material";

type CorePrinciplesSliderProps = {
    forwardedRef: React.RefObject<HTMLDivElement>;
    handleClose:(state:boolean)=>void;
};

const SourceEvaluateSlider = ({ forwardedRef, handleClose }: CorePrinciplesSliderProps) => {

    const boxRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.scrollTop = 0
        }

    }, []);

    return (
        <div
            ref={boxRef}
            className="h-screen flex flex-col  bg-black text-white"
            style={{ scrollBehavior: "smooth" }}
        >
            <div
            className="overflow-y-scroll snap-y snap-mandatory w-full"
            >
                            {sourceEvaluationMethods.map((method, index) => (
                <div
                    key={index}
                    ref={index === 0 ? forwardedRef : null}
                    className="snap-start h-full w-full flex flex-col items-center justify-center"
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

                    <div
                        className="w-full flex  justify-center"
                    >
                        <Button variant="contained"
                            onClick={()=>handleClose(false)}
                        >
                            Close
                        </Button>
                    </div>
        </div>
    );
};

export default SourceEvaluateSlider;
