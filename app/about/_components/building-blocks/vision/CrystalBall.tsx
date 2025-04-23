"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { MotionDiv } from "@/components/motion/MotionDiv"; // Adjust to your project path
import { AnimatePresence } from "motion/react";
import { visionPoints } from "@/app/about/_library/copy.const";

const autoScrollDelay = 5000;

const CrystalBall = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % visionPoints.length);
        }, autoScrollDelay);

        return () => clearInterval(timer);
    }, []);

    const current = visionPoints[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center w-full py-16 px-6 sm:px-12 md:px-24 lg:px-32 gap-8 relative">

            {/* UI Vertical Indexer */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                {visionPoints.map((_, i) => (
                    <div
                        key={i}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-white w-3.5 h-3.5" : "bg-gray-600 opacity-60"
                            }`}
                    />
                ))}
            </div>

            {/* Content block */}
            <AnimatePresence mode="wait">
                <MotionDiv
                    key={currentIndex}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="flex flex-col items-center text-center gap-6 max-w-3xl min-h-[500px]"
                >
                    <Image
                        src={current.photo}
                        alt="Vision"
                        width={500}
                        height={300}
                        className="rounded-2xl shadow-xl object-cover"
                    />
                    <Typography variant="h6" className="dark:text-[#fafafa]">
                        {current.message}
                    </Typography>
                </MotionDiv>
            </AnimatePresence>
        </div>
    );
};

export default CrystalBall;
