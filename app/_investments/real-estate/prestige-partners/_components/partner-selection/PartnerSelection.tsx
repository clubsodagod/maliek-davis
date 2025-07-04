/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import { investmentProcess, partnerCategories } from '../../_library/copy.const';
import InvestmentPhilosophyCard from '../investment-philosophy/InvestmentPhilosophyCard';
import PartnerCategoryCard from './PartnerCategoryCard';


const PartnerSelection = ({ }) => {

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "lg" : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);

    const [criteria, setCriteria] = React.useState<number>(0);
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
            <MainHeroHeader
                headerLabel={'Who I Partner With'}
                tagline={"Every Success Story Begines with Strategic Alignment"}
                size={headerSize}
                center=""
            />
            <MotionDiv className='w-full flex justify-center items-center'>
                <MotionDiv
                    className='w-[250px] h-[250px]'
                >
                    <Image 
                    src={"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586750/Convert_to_PNG_project_22_rleyna.png"}
                    alt='partner selction main hero image of techno handshake'
                    sizes="100vw" width={250} height={250}
                    className='w-full h-full object-cover rounded-4xl'
                />
                </MotionDiv>
                
            </MotionDiv>
            <MotionDiv
                className='grow w-screen relative -left-6'
            >
                {
                    partnerCategories.map((t, i) => {

                        return (
                            <SlidingCardWrapper
                                key={`${t.title} ${i}`}
                                id={t.title}
                                onClick={() => setCriteria(i)}
                            >
                                <PartnerCategoryCard
                                    step={t}
                                    open={criteria === i}
                                />
                            </SlidingCardWrapper>
                        )
                    })
                }

            </MotionDiv>
            <MotionDiv className='flex justify-center gap-6'>
                <Button variant="contained">
                    Become A Prestige Partner
                </Button>
                <Button variant="contained">
                    More
                </Button>
            </MotionDiv>
        </SectionWrapper>
    )
}



export default PartnerSelection;