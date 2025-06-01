"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import LeftFloatImgTextHero from '@/components/image/LeftFloatImgTextHero';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, Link, Typography, useMediaQuery } from '@mui/material';
import React from 'react'


const MainHero = ({ }) => {

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
                        headerLabel={"Your Digital Presence Is Your First Impression — Make It Count"}
                        tagline={"Bridge the Digital Divide — and Take the Lead Online"}
                        size={!desktop ? "lg" : "lg"}
                        className=''
                    />

                </div>

                <LeftFloatImgTextHero
                    imgPT='0'
                    heroText={
                        <
                        >
                            <Typography variant="subtitle1" fontSize={{ xs: "1.6rem", sm: "2rem", md: "2rem", xl: "2.25rem" }} className='break-words sm:pr-3 pl-[24vw]'>
                                Your online presence is either opening doors… or closing them. If your digital brand isn&apos;t sharp, optimized, and working for you — you&apos;re leaving money on the table.
                            </Typography>
                            <div className='flex gap-6 pl-[24vw]'>
                                <Button variant="contained" LinkComponent={Link} href="/contact">
                                    Schedule Consultation
                                </Button>
                            </div>
                        </>

                    }
                    photo={`https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                    pt=' md:pt-[100px] 2xl:pt-[200px] 3xl:pt-[500px] '
                    rounded='rounded-[90px]'
                    imgWidth='w-[225px] sm:w-[400px] md:w-[500px] md:landscape:w-[500px] lg:w-[600px] xl:landscape:w-[675px] 2xl:landscape:w-[950px] '
                    imgHeight="h-[450px] md:h-[600px] lg:h-[700px] 2xl:h-[850px] "
                    objectFit='cover'
                />

            </SectionWrapper>
    )
}



export default MainHero;