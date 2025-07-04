/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { MotionDiv } from "@/components/motion/MotionDiv";
import Image from "next/image";
import { InvestmentProcessStep } from "../../_library/copy.const";

interface InvestmentPhilosophyCardProps {
    step: InvestmentProcessStep;
    open: boolean;
}

const InvestmentPhilosophyCard: React.FC<InvestmentPhilosophyCardProps> = ({ step, open }) => {
    const [activeBullet, setActiveBullet] = useState(0);
    const [progress, setProgress] = useState(0);
    const DURATION = 3000;

    useEffect(() => {
        const bulletInterval = setInterval(() => {
            setActiveBullet((prev) => (prev + 1) % step.bulletPoints.length);
            setProgress(0);
        }, DURATION);

        return () => clearInterval(bulletInterval);
    }, [step.bulletPoints.length]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => (oldProgress === 100 ? 0 : Math.min(oldProgress + 4, 100)));
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <MotionDiv
            initial={{ opacity: 1, y: 0 }}
            animate={{
                opacity: open ? 1 : 1,
                y: open ? 20 : 20,
                scaleX: open ? 1.05 : 1,
            }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.3, ease: "anticipate" }}
            className={`w-full flex flex-col p-6 rounded-t-4xl`}
            style={{ boxShadow: "1px -6px 8px #17171747" }}
        >
            <Typography variant={open ? "subtitle1" : "caption"} fontWeight="bold" className="w-full text-center">
                {step.title}
            </Typography>

            {open && (
                <Box
                    component={MotionDiv}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex flex-col items-center text-center gap-6 mt-3"
                >
                    {/* Image */}
                    <Box className="relative w-full max-w-[250px] max-h-[250px] h-full rounded-4xl overflow-hidden">
                        <Image
                            src={step.photo}
                            alt={step.title}
                            width={9}
                            height={16}
                            sizes="100vw"
                            className="w-full h-[250px] object-cover rounded-4xl"
                        />
                    </Box>

                    {/* Description */}
                    <Typography variant="body2" className="max-w-xl text-center text-gray-700">
                        {step.description}
                    </Typography>

                    {/* Animated Bullet */}
                    <MotionDiv
                        key={activeBullet}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm max-w-md font-medium"
                    >
                        {step.bulletPoints[activeBullet]}
                    </MotionDiv>
                </Box>
            )}
        </MotionDiv>
    );
};

export default InvestmentPhilosophyCard;
