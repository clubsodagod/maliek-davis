"use client";

import { sourceEvaluationMethods } from '@/app/investments/_library/copy';
import { MotionDiv } from '@/components/motion/MotionDiv';
import React, { useEffect, useState } from 'react';
import './backgroundUnderlay.css';
import { SxProps, Theme, Typography } from '@mui/material';

const generateVariants = (distance: number, duration: number, reverse = false) => ({
    animate: {
        x: reverse ? [-distance, 0] : [0, -distance],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "loop",
                duration,
                ease: "linear",
            },
        },
    },
});


const getRandomStyle = (): SxProps<Theme> => {
    const solidColors = [
        'primary.dark', // primary.dark
        'primary.light', // primary.light
        'secondary.dark', // secondary.dark
        'secondary.light', // secondary.light
    ];

    const gradients = [
        ['#60abe4', '#8f11cc'], // primary.main → secondary.main
        ['rgba(96, 171, 228, 0.9)', 'rgba(143, 17, 204, 0.5)'], // primary.dark → secondary.light
        ['rgba(96, 171, 228, 0.5)', 'rgba(143, 17, 204, 0.9)'], // primary.light → secondary.dark
    ];

    const isGradient = Math.random() < 0.3;

    if (isGradient) {
        const [fromColor, toColor] = gradients[Math.floor(Math.random() * gradients.length)];
        return {
            backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            textTransform: 'uppercase',
            opacity: 1,
        };
    } else {
        const color = solidColors[Math.floor(Math.random() * solidColors.length)];
        return {
            color,
            fontWeight: 800,
            textTransform: 'uppercase',
            opacity: 1,
        };
    }
};



const BackgroundUnderlay: React.FC<{ visible: boolean }> = ({ visible }) => {
    const [screenHeight, setScreenHeight] = useState<number>(0);

    useEffect(() => {
        setScreenHeight(window.innerHeight);

        const handleResize = () => setScreenHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const textArray: string[] = sourceEvaluationMethods.flatMap((t) => t.title);

    return (
        <div className={`"relative top-0 left-0 w-full z-0 overflow-hidden pointer-events-none ${!visible && "hidden"} bg-black`}>
            {Array.from({ length: 7 }).map((_, idx) => {
                const reverse = idx % 2 !== 0;
                const speed = 20 + idx * 2; // Slight variation
                const distance = 2000; // Amount to scroll
                const variant = generateVariants(distance, speed, reverse);

                return (
                    <div
                        key={idx}
                        className="overflow-hidden whitespace-nowrap w-full relative flex items-center"
                        style={{
                            height: screenHeight / 7,
                        }}
                    >
                        <MotionDiv
                            className="inline-block whitespace-nowrap"
                            variants={variant}
                            animate="animate"
                        >
                            {textArray.map((text, i) => (
                                <Typography
                                    variant="h5"
                                    key={`${idx}-${i}`}
                                    sx={{
                                        px: 4,
                                        fontSize: `${screenHeight / 20}px`,
                                        letterSpacing: '0.05em',
                                        display: 'inline-block',
                                        whiteSpace: 'nowrap',
                                        ...getRandomStyle(),
                                    }}
                                >
                                    {text}
                                </Typography>
                            ))}
                        </MotionDiv>
                    </div>
                );
            })}
        </div>
    );
};

export default BackgroundUnderlay;
