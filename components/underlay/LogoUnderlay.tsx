"use client";

import React from "react";
import { MotionDiv } from "../motion/MotionDiv";
import { MotionDivProps } from "@/library/types/motion.types";
import Image from "next/image";
import { brandLogo } from "@/library/brand.const";

const LogoBox = () => (
    <div className="w-[75px] h-[75px]">
        <Image
            alt="logo"
            src={brandLogo}
            width={9}
            height={16}
            sizes="100vw"
            style={{
                objectFit: "contain",
                width: "100%",
            }}
            className="brightness-0"
        />
    </div>
);

const LogoUnderlay = (props: MotionDivProps) => {
    const logosPerRow = [4, 3, 4, 3,4, 3, 4, 3,4, 3, 4, 3,]; // Defining the staggered row structure

    // Generating logo indexes dynamically
    let index = 0;
    const logoRows = logosPerRow.map((count) => {
        const row = Array.from({ length: count }, () => index++);
        return row;
    });

    return (
        // <PageTransition id={`component transition: ${props.id}`}>
            <MotionDiv {...props} className="w-screen h-screen fixed bg-[#fafafa] z-[-5] top-0 flex flex-col ">
                    {logoRows.map((row, rowIndex) => (
                        <MotionDiv key={`row-${rowIndex}`} className="flex justify-evenly">
                            {row.map((l) => (
                                <LogoBox key={`logo-${l}`} />
                            ))}
                        </MotionDiv>
                    ))}
            </MotionDiv>
        // </PageTransition>
    );
};

export default LogoUnderlay;
