"use client"

import { realEstateStrategies } from '@/app/investments/_library/copy';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Typography } from '@mui/material';
import React, { useState } from 'react'
import RealEstateCriteriaCard from './RealEstateCriteriaCard';


const RealEstateInvestmentCriteria = ({ }) => {

    const sectionRef = React.useRef<HTMLDivElement>(null);

    const [criteria, setCriteria] = useState<number>(0);

    return (
        <>
            <SectionWrapper
                id='investments-real-estate-main-section'
                ref={sectionRef}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
            >

                <div
                    className='w-full sm:px-[12.5vw]'
                >
                    <MainHeroHeader
                        headerLabel={'My Investment Criteria: What I Look For'}
                        headerLabelClassName='text-center'
                        tagline={''}
                        size='lg'
                    />
                    <div className='min-w-full grow' />

                    <Typography variant='h5' className='md:px-0 md:text-center'>
                        My strategy focuses on finding undervalued real estate in strong rental markets with opportunities for cash flow growth and asset appreciation.
                    </Typography>

                </div>


                    <div
                        className={` sliding-card-ctn w-screen h-full relative -left-6   `}
                    >
                        {
                            realEstateStrategies.map((c, i) => (
                                <SlidingCardWrapper
                                    key={`${c.title} ${i}`}
                                    id={c.title}
                                    onClick={() => setCriteria(i)}
                                >
                                    <RealEstateCriteriaCard
                                        criteria={c}
                                        index={i}
                                        open={criteria === i}
                                    />
                                </SlidingCardWrapper>
                            ))
                        }
                    </div>
            </SectionWrapper>
        </>
    )
}



export default RealEstateInvestmentCriteria;