/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react'
import { useMediaQuery } from '@mui/material';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { techImpactHighlights } from '../_library/copy.const';
import TechnologySolutionCard from '@/app/technology/_components/TechnologySolutionCard';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import RealResultsCard from './RealResultsCard';

const RealResults = () => {
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const [open, setOpen] = React.useState<boolean>(false);
    const [result, setResult] = React.useState<number>(0);


    return (
        <SectionWrapper
            ref={sectionRef}
            id='technology-approach-real-results-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <MainHeroHeader
                headerLabel={"Real Results"}
                tagline={""}
                size={desktop ? "lg" : "lg"}
            />


            <div
                className='w-screen flex flex-col relative -left-6'
            >
                {
                    techImpactHighlights.map((t, i) => {

                        return (
                            <SlidingCardWrapper
                                key={`${t.title} ${i}`}
                                id={t.title}
                                onClick={() => setResult(i)}
                            >
                                <RealResultsCard
                                    result={t}
                                    open={result === i}
                                />
                            </SlidingCardWrapper>
                        )
                    })
                }
            </div>
        </SectionWrapper>
    )
}

export default RealResults