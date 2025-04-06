"use client";

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import {
    initialHeaderAnimation,
    animateHeaderAnimation,
    transitionHeaderAnimation
} from '@/library/animations/enter.animations';
import { Box, Button, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import PrinciplesMarquee from './PrinciplesMarquee';
import Link from 'next/link';
import CorePrinciplesSlider from './CorePrinciplesSlider';

const CoreGuidingPrinciples = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const [corePrinciplesOpen, setCorePrinciplesOpen] = useState(false);

    const toggleCorePrinciples = () => {
        const newState = !corePrinciplesOpen;
        setCorePrinciplesOpen(newState);

        // 🔹 Dispatch a custom event when opening
        if (newState) {
            window.dispatchEvent(new Event("scrollToCorePrinciples"));
        }
    };

    useEffect(() => {
        const handleScrollToSection = () => {
            if (boxRef.current) {
                boxRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };

        window.addEventListener("scrollToCorePrinciples", handleScrollToSection);

        return () => {
            window.removeEventListener("scrollToCorePrinciples", handleScrollToSection);
        };
    }, []);

    return (
        <div
        className='overflow-x-hidden '
        >
                    <SectionWrapper
            ref={sectionRef}
            id='technology-approach-main-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <Box
                component={MotionDiv}
                className='w-screen relative -left-6 min-h-[30vh] flex flex-col justify-between px-6 pb-0'
            >
                <MainHeroHeader
                    headerLabel={"Core Guiding Principles"}
                    tagline={""}
                    size={desktop ? "lg" : "lg"}
                />

                <div className='w-full flex justify-center'>
                    <Image
                        alt='technology-solutions-cta-image'
                        src={
                            "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586751/Convert_to_PNG_project_16_huki6w.png"
                        }
                        sizes='100vw'
                        width={9}
                        height={16}
                        className='relative w-[300px] h-full rounded-4xl'
                        style={{
                            objectFit: 'contain'
                        }}
                    />
                </div>

                <div className='w-screen h-full relative -left-6 '>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path
                            fill="#000"
                            d="M0,0 Q0,100 100,100 H1340 Q1440,100 1440,0 L1440,100 L0,100 Z"
                        />
                    </svg>
                </div>
            </Box>

            <Box component={"div"} ref={boxRef} className={`w-screen relative grow -left-6 bg-black -top-12 pb-6 ${corePrinciplesOpen ? "min-h-screen":""}`}>
                {!corePrinciplesOpen
                    ? <PrinciplesMarquee />
                    : <CorePrinciplesSlider forwardedRef={sliderRef as React.RefObject<HTMLDivElement>} />
                }

                <div className='px-6 w-full'>
                    <Button
                        LinkComponent={Link}
                        onClick={toggleCorePrinciples}
                        variant='contained'
                        fullWidth
                    >
                        {corePrinciplesOpen ? "Close" : "Learn More"}
                    </Button>
                </div>
            <div 
                className='relative w-screen -bottom-12 h-[15vh] z-0 bg-black '
            />
            </Box>
        </SectionWrapper>
        </div>

    );
};

export default CoreGuidingPrinciples;

export type CorePrinciple = {
    title: string;
    bullets: string[];
    photo: string;
};
