"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import LeftFloatImgTextHero from '@/components/image/LeftFloatImgTextHero';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery, Typography, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react'


const AIAutomationMainHero = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
            <SectionWrapper
                id='business-ai-automation-section'
                ref={sectionRef}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
                className=''
            >

                <div
                    className='w-full sm:px-[12.5vw] mb-20'
                >
                    <MainHeroHeader
                        headerLabel={"AI & Automation: Work Smarter, Scale Faster"}
                        tagline={"Small Teams. Big Output. Powered by Automation & AI."}
                        size={!desktop ? "md" : "xl"}
                        className=''
                    />

                </div>

                <LeftFloatImgTextHero
                    imgPT='0'
                    heroText={
                        <
                        >
                            <Typography variant="subtitle1" fontSize={{ xs: "1.6rem", sm: "2rem", md: "2rem", xl: "2.25rem" }} className='break-words sm:pr-3 pl-[24vw] '>
                                Stop doing everything manually. The smartest entrepreneurs are automating workflows, multiplying revenue, and getting their time back. Now it&apos;s your turn.
                            </Typography>
                            <div className='flex gap-6 pl-[24vw]'>
                                <Button variant="contained" LinkComponent={Link} href="/contact">
                                    Schedule Consultation
                                </Button>
                            </div>
                        </>

                    }
                    photo={`https://decisions.com/wp-content/uploads/2023/07/image_1200x600_720.webp`}
                    pt='md:pt-[50px] 2xl:pt-[200px] 3xl:pt-[500px] '
                    rounded='rounded-[90px]'
                    imgWidth='w-[225px] sm:w-[400px] md:w-[500px] md:landscape:w-[500px] lg:w-[600px] xl:landscape:w-[675px] 2xl:landscape:w-[950px] '
                    imgHeight="h-[450px] md:h-[600px] lg:h-[700px] 2xl:h-[850px] "
                    objectFit='cover'
                />

            </SectionWrapper>
    )
}



export default AIAutomationMainHero;