"use client"

import { mockCaseStudies } from '@/app/investments/_library/copy';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react'
import StrategiesInActionCard from './StrategiesInActionCard';


const StrategiesInAction = ({ }) => {

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? "lg" : tabletXL ? "xl" : tablet ? "lg" : mobile ? "xl" : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);


    const [investment, setInvestment] = useState<number>(0);

    return (
        <>
            <SectionWrapper
                id='strategies-in-action-section'
                ref={sectionRef}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
            >
                <div
                    className='w-full sm:px-[12.5vw] mb-20'>
                    <MainHeroHeader
                        headerLabel={'Strategies In Action'} tagline={'A Study on My Investment Decisions.'}
                        size={headerSize}
                    />
                </div>


                <div
                    className='sliding-card-ctn  w-screen relative -left-6 '
                >
                    {
                        mockCaseStudies.map((a, i) => (
                            <SlidingCardWrapper
                                key={`${a.title} ${i}`}
                                id={a.title}
                                onClick={() => setInvestment(i)}
                            >
                                <StrategiesInActionCard
                                    caseStudy={a}
                                    index={i}
                                    open={investment === i}
                                />
                            </SlidingCardWrapper>
                        ))
                    }
                </div>
            </SectionWrapper>
        </>
    )
}



export default StrategiesInAction;