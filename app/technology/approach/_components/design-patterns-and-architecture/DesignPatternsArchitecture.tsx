"use client"
import React, { useRef } from 'react'
import { useMediaQuery } from '@mui/material';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import DesignPatternsAndArchitectureGallery from './DesignPatternsAndArchitectureGallery';

const DesignPatternsArchitecture = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            ref={sectionRef}
            id='technology-approach-main-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >

            <MainHeroHeader
                headerLabel={"How I Use Design Patterns & Architectures for Efficiency"}
                tagline={""}
                size={desktop ? "lg" : "md"}
            />
            <DesignPatternsAndArchitectureGallery />
        </SectionWrapper>
    )
}

export default DesignPatternsArchitecture;

