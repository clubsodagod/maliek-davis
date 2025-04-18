"use client"

import React, { useRef } from 'react'
import { useMediaQuery } from '@mui/material';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import TechPhilosophyScroller from '../design-patterns-and-architecture/TechPhilosophyScroller';


const HolisticTechnology = ({ }) => {
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
                headerLabel={"Technology as a Tool for a Holistic, Balanced Life"}
                tagline={""}
                size={desktop ? "lg" : "md"}
            />

            <div className='w-full flex justify-center items-center'>
                <div className='overflow-x-clip w-fit'>
                    <TechPhilosophyScroller />
                </div>
            </div>

        </SectionWrapper>
    )
}



export default HolisticTechnology;