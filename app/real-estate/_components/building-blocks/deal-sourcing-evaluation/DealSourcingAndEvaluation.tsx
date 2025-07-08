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
import Link from 'next/link';

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
        <div
            className='relative max-w-full'
        >
            <BackgroundUnderlay visible={true} />

            <div className="absolute top-0 max-h-screen max-w-screen">
                <SectionWrapper
                    id="investments-real-estate-deal-sourcing-and-evaluation-section"
                    ref={sectionRef}
                    whileInView={{ opacity: 1 }}
                    initial={initialHeaderAnimation}
                    animate={animateHeaderAnimation}
                    transition={transitionHeaderAnimation}
                    exit={{ opacity: 0, scaleY: 0 }}
                >
                    <div className="relative w-screen h-full -left-6 top-[-15vh] pt-[12vh] pb-[10vh] px-6 rounded-b-4xl shadow-2xl bg-(--background) ">




                        <div className="mt-10 flex flex-col gap-6 text-center relative ">
                            <AnimatePresence mode="wait">
                                {!showSlider && (
                                    <>
                                        <MainHeroHeader
                                            headerLabel={'How I Find & Evaluate Deals'}
                                            tagline={''}
                                            size="lg"
                                        />
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

                                        <div className="flex gap-3 flex-wrap justify-center">
                                            <Button variant="contained" LinkComponent={Link} href={'/real-estate/prestige-partners/landing-page'}>
                                                Become A Prestige Partner
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={() => setShowSlider((prev) => !prev)}
                                            >
                                                {showSlider ? 'Close' : 'See More'}
                                            </Button>
                                        </div>
                                    </>

                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </SectionWrapper>
                <AnimatePresence mode="wait">
                    {showSlider && (
                        <motion.div
                            key="slider"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.5 }}
                            className=" absolute w-screen left-0  grow h-screen top-0"
                        >
                            <SourceEvaluateSlider forwardedRef={firstSnapRef as React.RefObject<HTMLDivElement>}
                                handleClose={() => setShowSlider(!showSlider)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DealSourcingAndEvaluation;
