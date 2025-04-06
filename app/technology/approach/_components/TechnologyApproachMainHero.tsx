"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { programmerImgFaded } from '@/library/image.cdn';
import Link from 'next/link';

const TechnologyApproachMainHero = () => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

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
                size={desktop ? "lg" : "md"}
            />

            <div className='max-w-full'>

                <div className='relative w-full px-6 h-full 2xl:-top-12 '>
                    {/* Float Image With Shape */}

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

                </div>

                {/* Wrapped Text Content */}
                <div
                    className='relative pt-60'
                >
                    <Typography
                        variant='subtitle1'
                        component='span'
                        fontWeight='600'
                        className=''
                    >
                        I leverage structured principles, proven design patterns, and a strategic approach to build scalable, efficient, and meaningful technology solutions—driving both business success and personal enpowerment.
                    </Typography>
                </div>



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