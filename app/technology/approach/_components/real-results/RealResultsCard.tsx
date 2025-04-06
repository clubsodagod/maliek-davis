/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { MotionDiv } from "@/components/motion/MotionDiv";
import Image from "next/image";
import { TechImpactHighlight } from "../_library/copy.const";

interface RealResultsCardProps {
    result: TechImpactHighlight;
    open: boolean;
}

const RealResultsCard: React.FC<RealResultsCardProps> = ({ result, open }) => {
    const [activeBullet, setActiveBullet] = useState(0);
    const [progress, setProgress] = useState(0);

    const DURATION = 2500;

    // Cycle bullets
    useEffect(() => {

        const bulletInterval = setInterval(() => {
            setActiveBullet((prev) => (prev + 1) % result.bullets.length);
            setProgress(0); // reset progress when new bullet shows
        }, DURATION);



        return () => {
            clearInterval(bulletInterval);
        };
    }, [result.bullets.length]);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }

                return Math.min(oldProgress + 4, 100);
            });
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const height: string = open ? "min-h-[15vh]" : ""

    return (
        <MotionDiv
            initial={{ opacity: 1, y: 0 }} // Starts slightly above
            animate={{ opacity: open ? 1 : 1, y: open ? 20 : 20, scaleX: open ? 1.05 : 1 }} // Moves down when open
            exit={{ opacity: 0, y: 0 }} // Moves up when closing
            transition={{ duration: 0.3, ease: "anticipate" }}
            className={`w-full flex flex-col p-6 ${height} rounded-t-4xl`}
            style={{
                boxShadow: "1px -6px 8px #17171747"
            }}
        >


            {/* Content */}

            <Typography
                variant={open ? 'subtitle1' : 'caption'} fontWeight={"bold"}
                className='w-full text-center'
            >
                {result.title}
            </Typography>
            {open && (
                <>
                    <Box
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{
                            opacity: open ? 1 : 0,
                            y: open ? 0 : 0,
                            // scale: open ? 1.03 : 1,
                            transition: {
                                duration: 0.2,
                                ease: "anticipate",
                                type: "spring",
                                bounce: 0.2
                            }
                        }} component={MotionDiv} className="flex flex-col flex-1 items-center text-center gap-6 mt-3">



                        <Box className="relative w-full max-w-[300px] max-h-[300px] h-full rounded-4xl overflow-hidden">
                            <Image
                                src={result.photo}
                                alt={result.title}
                                width={9} height={16} sizes='100vw'
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "38px"
                                }}
                                className='w-full h-[300px] rounded-4xl'
                            />
                        </Box>

                        <MotionDiv
                            key={activeBullet}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="text-sm max-w-md"
                        >
                            {result.bullets[activeBullet]}
                        </MotionDiv>
                    </Box>
                </>
            )}

        </MotionDiv>
    );
};

export default RealResultsCard;
