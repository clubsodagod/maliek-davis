/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import {
    initialHeaderAnimation,
    animateHeaderAnimation,
    transitionHeaderAnimation,
} from '@/library/animations/enter.animations';
import BackgroundUnderlay from './BackgroundUnderlay';
import { Button, Typography } from '@mui/material';
import SourceEvaluateSlider from './SourceEvaluateSlider';
import { motion, AnimatePresence } from 'framer-motion';

const DealSourcingAndEvaluation = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
        const firstSnapRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [showSlider, setShowSlider] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (visible && entry.isIntersecting) return;
                setVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.8,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <>
            <BackgroundUnderlay visible={true} />

            <div className="relative top-[-100vh]">
                <SectionWrapper
                    id="investments-real-estate-deal-sourcing-and-evaluation-section"
                    ref={sectionRef}
                    whileInView={{ opacity: 1 }}
                    initial={initialHeaderAnimation}
                    animate={animateHeaderAnimation}
                    transition={transitionHeaderAnimation}
                    exit={{ opacity: 0, scaleY: 0 }}
                >
                    <div className="relative w-screen h-full -left-6 top-[-12vh] pt-[12vh] pb-[10vh] px-6 rounded-b-4xl shadow-2xl bg-(--background)">
                        <MainHeroHeader
                            headerLabel={'How I Find & Evaluate Deals'}
                            tagline={''}
                            size="lg"
                        />

                        <div className="mt-10 flex flex-col gap-6 text-center">
                            <AnimatePresence mode="wait">
                                {!showSlider && (
                                    <motion.div
                                        key="title-text"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <Typography variant="subtitle1" fontSize={'2rem'}>
                                            Want to see available deals?
                                        </Typography>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex gap-3 justify-center">
                                <Button variant="contained">
                                    Investor Application
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => setShowSlider((prev) => !prev)}
                                >
                                    {showSlider ? 'Close' : 'See More'}
                                </Button>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {showSlider && (
                                <motion.div
                                    key="slider"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-8 relative w-screen -left-6"
                                >
                                    <SourceEvaluateSlider forwardedRef={firstSnapRef as React.RefObject<HTMLDivElement>} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </SectionWrapper>
            </div>
        </>
    );
};

export default DealSourcingAndEvaluation;
