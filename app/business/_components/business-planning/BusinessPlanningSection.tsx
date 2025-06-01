"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import LeftFloatImgTextHero from '@/components/image/LeftFloatImgTextHero';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { investorImg } from '@/library/image.cdn';
import { Button, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import TheProblem from './TheProblem';
import TheShift from './TheShift';
import BuildTheBlueprint from './BuildTheBlueprint';

const BusinessPlanningSection = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (

        <>

            <SectionWrapper
                id='business-planning-section'
                ref={sectionRef}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
                className=''
            >

                <div
                    className='w-full sm:px-[12.5vw] mb-10'
                >
                    <MainHeroHeader
                        headerLabel={"Plan Like a Boss. Build Like a Visionary."}
                        tagline={""}
                        size={!desktop ? "lg" : "xl"}
                        className=''
                    />

                </div>

                {/* <div className="min-h-[33vh]" /> */}

                <LeftFloatImgTextHero
                    imgPT=''
                    heroText={
                        <
                        >
                            <Typography variant="subtitle1" fontSize={{ xs: "1.5rem", sm: "2.25rem", md: "2.5rem", xl: "2.25rem" }} className='break-words sm:pr-3 2xl:text-[3rem] pl-[24vw]'>
                                The most successful entrepreneurs don’t just “wing it.” They run their business with clarity, direction, and strategic control. It starts with the right plan.
                            </Typography>
                            <div className='flex gap-6 pl-[24vw] md:pl-0 mt-6'>
                                <Button variant="contained" LinkComponent={Link} href="/contact">
                                    Schedule Consultation
                                </Button>
                            </div>
                        </>

                    }
                    photo={investorImg}
                    pt='pt-[0px] md:pt-[100px] 2xl:pt-[200px] 3xl:pt-[500px] '
                    rounded='rounded-[90px]'
                    imgWidth='w-[225px] sm:w-[450px] md:w-[500px] md:landscape:w-[500px] lg:w-[600px] xl:landscape:w-[675px] 2xl:landscape:w-[950px] '
                    imgHeight="h-[450px] md:h-[600px] lg:h-[700px] 2xl:h-[850px] "
                    objectFit='cover'
                />

            </SectionWrapper>
            <TheProblem />
            <TheShift />
            <BuildTheBlueprint />
        </>

    )
}



export default BusinessPlanningSection;