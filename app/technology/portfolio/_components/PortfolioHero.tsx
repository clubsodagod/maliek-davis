/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react'
import PortfolioScene from './three-js/PortfolioScene';
import PortfolioProjectChanger from './PortfolioProjectChanger';
import { caseStudyDocuments } from '../_library/copy.const';
import PortfolioCaseStudyCard from './PortfolioCaseStudyCard';


const PortfolioHero = ({ }) => {
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const [open, setOpen] = React.useState<boolean>(false);
    const [portfolio, setPortfolio] = React.useState<number>(0);
    const [device, setDevice] = React.useState<"mobile" | "tablet" | "desktop">("mobile");
    const [logo, setLogo] = React.useState<string>(caseStudyDocuments[portfolio].logo)

    const handleSetPortfolio = (index: number) => {
        console.log("index", index);

        setPortfolio(index);
        setLogo(caseStudyDocuments[index].logo)
    }



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
                    <PortfolioScene logo={logo} device={device} />
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
                        <PortfolioProjectChanger caseStudies={caseStudyDocuments} setPortfolio={handleSetPortfolio} currentIndex={portfolio} />

                    </div>
                </div>
                <div className='h-[22vh]' />
                <div className='w-screen grow relative -left-6 flex flex-col gap-3'>
                    <Typography variant="h5" className='text-center w-full'>
                        {caseStudyDocuments[portfolio].title}
                    </Typography>
                    <PortfolioCaseStudyCard setDevice={setDevice} caseStudy={caseStudyDocuments[portfolio]} index={0} currentScreen={'mobile'} />
                </div>
            </SectionWrapper>

        </>


    )
}



export default PortfolioHero;