"use client"
import MainHeroHeader from '@/components/headers/MainHeroHeader'
import LeftFloatImgTextHero from '@/components/image/LeftFloatImgTextHero'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import { brandName } from '@/library/brand.const'
import { programmerImg } from '@/library/image.cdn'
import { Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import HomeCards from './HomeCards'
import { motion } from "motion/react";
import { fadeToRight } from './WhatsHappening'


const MainHomeHero = () => {

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? "lg" : mobile ? "xl" : undefined;

    return (
        <SectionWrapper

        >
            <div
                className='hidden md:block w-full h-[25px] md:landscape:hidden'
            />
            <motion.div {...fadeToRight}
                className=''
            >
                <MainHeroHeader
                    headerLabel={brandName}
                    tagline={''}
                    center='md:text-center'
                    size={headerSize}
                />
            </motion.div>

            <div className='max-w-full w-full h-full md:mt-12'>
                <LeftFloatImgTextHero
                    imgPT='0'
                    heroText={
                        <>
                            <Typography
                                sx={{
                                    textShadow: "1px 1px 2px #00000001"
                                }} variant="h2" fontSize={{ xs: "1.6rem", sm: "3rem", md: "4rem", xl: "2.5rem" }} className='break-words  sm:pr-3 2xl:text-[3rem] pl-[24vw]'>
                                Building Intelligent Systems. Profitable Investments. Innovation Without Limits.
                            </Typography>
                            <Typography
                                sx={{
                                    textShadow: "2px 2px 3px #23232337"
                                }} variant="subtitle1" fontSize={{ xs: "1.25rem", sm: "2rem", md: "2.5rem", xl: "1.5rem" }} className='break-words sm:pr-3  pl-[24vw]'>
                                Where forward-thinking businesses and strategic investors engineer tomorrow’s edge — through automation, real estate, and high-performance technology.
                            </Typography>
                        </>
                    }
                    photo={programmerImg}
                    pt='pt-[100px] md:pt-[100px] 2xl:pt-0 3xl:pt-[500px] '
                    rounded='rounded-[90px]'
                    imgWidth='w-[225px] md:w-[500px] md:landscape:w-[500px] lg:w-[600px] xl:landscape:w-[675px] 2xl:landscape:w-[900px] '
                    imgHeight="h-[450px] md:h-[600px] lg:h-[700px] 2xl:h-[600px] "
                    objectFit='cover'
                    OtherComponent={<HomeCards />}
                />
                <div>
                </div>
                <div
                    className='section-btn-ctn flex gap-3 mt-20 min-w-full md:w-fit justify-center'
                >
                    <Button variant='contained' color='primary' href={'/about'}>
                        About Me
                    </Button>
                    <Button variant='outlined' href={'/contact'}>
                        Let&apos;s Connect
                    </Button>
                </div>
            </div>

            <div
                className="hidden md:block md:w-full md:h-full grow"
            />
        </SectionWrapper>


    )
}

export default MainHomeHero