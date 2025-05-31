"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import { investmentProcess } from '../../_library/copy.const';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import InvestmentPhilosophyCard from './InvestmentPhilosophyCard';


const InvestmentPhilosophy = ({ }) => {

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "md" : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);

    const [process, setProcess] = React.useState<number>(0);

    return (
        <SectionWrapper
            id='investments-real-estate-prestige-partners-main-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <div
                className='relative w-screen -left-6 top-[-12vh] pt-[12vh] pb-12 bg-black px-6 rounded-b-4xl '
            >
                <MainHeroHeader
                    headerLabel={'My Investment Philosophy: Smart, Strategic, and Scalable'}
                    tagline={""}
                    size={headerSize}
                    center="text-center"
                />
            </div>

            <MotionDiv>

                <Typography
                    variant="subtitle1"
                    className="text-center"
                >
                    I believe wealth is built by acquiring, improving, and holding high-quality real estate assets in strong markets. My approach is based on a simple three-step process:
                </Typography>
            </MotionDiv>
            <MotionDiv
                className='grow w-screen relative -left-6'
            >
                {
                    investmentProcess.map((t, i) => {

                        return (
                            <SlidingCardWrapper
                                key={`${t.title} ${i}`}
                                id={t.title}
                                onClick={() => setProcess(i)}
                            >
                                <InvestmentPhilosophyCard
                                    step={t}
                                    open={process === i}
                                />
                            </SlidingCardWrapper>
                        )
                    })
                }

            </MotionDiv>
            <MotionDiv className='flex justify-center'>
                <Button variant="contained">
                    Let&apos;s Discuss Opportunities
                </Button>
            </MotionDiv>
        </SectionWrapper>


    )
}



export default InvestmentPhilosophy;