"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, Typography } from '@mui/material';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { programmerImgFaded } from '@/library/image.cdn';
import Link from 'next/link';
import LeftFloatImgTextHero from '@/components/image/LeftFloatImgTextHero';
// import HomeCards from '@/app/_home-page/components/HomeCards';

const TechnologyApproachMainHero = () => {

    const sectionRef = React.useRef(null);

    const tablet = useMediaQuery(breakpoints.md);
    const desktop = useMediaQuery(breakpoints['2xl']);


    return (
        <SectionWrapper
            ref={sectionRef}
            id='technology-approach-main-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >
            <MainHeroHeader
                headerLabel={"Technology as a Catalyst for Growth, Balance, and Innovation"}
                tagline={""}
                size={desktop ? "xl" : tablet ? "xl" : "md"}
            />

            <div className='max-w-full w-full h-full md:mt-12'>
                <LeftFloatImgTextHero
                    imgPT='0'
                    heroText={
                        <>
                            <Typography variant="h5" className='break-words pr-3'>
                                I leverage structured principles, proven design patterns, and a strategic approach to build scalable, efficient, and meaningful technology solutions—driving both business success and personal enpowerment.
                            </Typography>
                        </>
                    }
                    photo={programmerImgFaded}
                    pt='pt-[50px] md:pt-[150px] 2xl:pt-0 3xl:pt-[500px] '
                    rounded='rounded-[90px]'
                    imgWidth='w-[225px] md:w-[500px] md:landscape:w-[700px] lg:w-[600px] xl:landscape:w-[675px] 2xl:landscape:w-[900px] '
                    imgHeight="h-[450px] md:h-[600px] md:landscape:h-[450px] lg:h-[700px] 2xl:h-[600px] "
                    objectFit='cover'
                // OtherComponent={<HomeCards />}
                />
                {/* <div className='relative w-full px-6 h-full 2xl:-top-12 '>
                    

                    <div className=''>
                        <Box
                            sx={{
                                bgcolor: "#000"
                            }}
                            component={MotionDiv}
                            className='w-[200px] h-[350px] md:h-[400px] landscape:xl:h-[450px] landscape:2xl:h-[600px]  landscape:w-[550px] landscape:2xl:w-[1000px] 2xl:h-[600px]  rounded-4xl float-left ml-4 mb-4 absolute right-0 md:left-[800px] 2xl:left-[1200px] top-0 overflow-x-visible'
                        />
                        <Box
                            sx={{
                                bgcolor: "#000"
                            }}
                            component={MotionDiv}
                            className='w-[400px] h-[350px] md:h-[400px] landscape:xl:h-[450px] landscape:2xl:h-[600px]  landscape:w-[550px] landscape:2xl:w-[1000px] 2xl:h-[600px]  rounded-4xl float-left ml-4 mb-4 absolute left-[200px] md:left-[800px] 2xl:left-[1200px] top-0 '
                        />
                        <Box
                            sx={{
                                bgcolor: "#000"
                            }}
                            component={MotionDiv}
                            className='w-[200px] md:w-[400px] landscape:xl:w-[550px] landscape:xl:h-[450px] landscape:2xl:h-[600px] 2xl:w-[800px] h-[350px] md:h-[400px] 2xl:h-[600px]  landscape:2xl:w-[1000px] rounded-4xl float-left ml-4  mb-4'
                            style={{
                                shapeOutside: "content-box",
                                shapeMargin: "25px",
                                // clipPath: "inset(0 0 0 0)",
                                float: "right"
                            }}
                        >

                            <Image
                                alt='technology-solutions-cta-image'
                                src={programmerImgFaded}
                                sizes='100vw' width={9} height={16}
                                className='relative w-full h-full rounded-4xl overflow-x-visible '
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </div>

                </div> */}





            </div>
            <div
                className='w-full flex gap-12'
            >
                <MotionDiv>
                    <Button
                        LinkComponent={Link}
                        variant='contained'
                    >
                        Explore My Process
                    </Button>
                </MotionDiv>
                <MotionDiv>
                    <Button
                        LinkComponent={Link}
                        variant='outlined'
                    >
                        Let&apos;s Work
                    </Button>
                </MotionDiv>

            </div>
        </SectionWrapper>
    )
}

export default TechnologyApproachMainHero

export const breakpoints = {
    sm: '(min-width: 640px)',   // 40rem
    md: '(min-width: 768px)',   // 48rem
    lg: '(min-width: 1024px)',  // 64rem
    xl: '(min-width: 1280px)',  // 80rem
    '2xl': '(min-width: 1536px)', // 96rem
};
