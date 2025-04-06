/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import PortfolioScene from './three-js/PortfolioScene';
import PortfolioProjectChanger from './PortfolioProjectChanger';
import { caseStudyDocuments } from '../_library/copy.const';
import PortfolioCaseStudyCard from './PortfolioCaseStudyCard';


const PortfolioHero = ({ }) => {
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const [open, setOpen] = React.useState<boolean>(false);
    const [portfolio, setPortfolio] = React.useState<number>(0);


    return (
        <>
            <SectionWrapper
                ref={sectionRef}
                id='technology-approach-real-results-section'
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
                pb='pb-0'
            >
                <div
                    className='w-screen fixed -left-6 top-0 z-0 h-screen'
                >
                    <PortfolioScene />
                </div>
                <MainHeroHeader
                    headerLabel={"Portfolio"}
                    tagline={""}
                    size={desktop ? "lg" : "xl"}
                />
                <div
                    className='relative w-full flex bottom-10'
                >
                    <div className='w-[140px]  flex flex-col max-h-[37vh] overflow-y-auto fixed'>
                        <PortfolioProjectChanger caseStudies={caseStudyDocuments} setPortfolio={setPortfolio} currentIndex={portfolio} />

                    </div>
                </div>
                <div className='h-[22vh]' />
                <div className='w-screen grow relative -left-6 flex flex-col'>
                    <Typography variant="h5" className='text-center w-full'>
                        {caseStudyDocuments[portfolio].title}
                    </Typography>
                    <PortfolioCaseStudyCard caseStudy={caseStudyDocuments[portfolio]} index={0} currentScreen={'mobile'} />
                </div>
            </SectionWrapper>

        </>


    )
}



export default PortfolioHero;