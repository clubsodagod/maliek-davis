"use client"
import MainHeroHeader from '@/components/headers/MainHeroHeader'
import LeftFloatImgTextHero from '@/components/image/LeftFloatImgTextHero'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import { brandName } from '@/library/brand.const'
import { programmerImg } from '@/library/image.cdn'
import { Button, Typography } from '@mui/material'
import React from 'react'
import HomeCards from './HomeCards'

const MainHomeHero = () => {

    return (
        <SectionWrapper
        >
            <div
                className='hidden md:block w-full h-[25px] md:landscape:hidden'
            />
            <MainHeroHeader
                headerLabel={brandName}
                tagline={''}
                center='md:text-center'
            />
            <div className='max-w-full w-full h-full md:mt-12'>
                <LeftFloatImgTextHero
                    imgPT='0'
                    heroText={
                        <>
                            <Typography variant="h2" fontSize={{xs:"1.6rem", sm:"3rem", md:"4rem", xl:"2.75rem" }} className='break-words sm:pr-3 2xl:text-[3rem]'>
                                Building Intelligent Systems. Profitable Investments. Innovation Without Limits.
                            </Typography>
                            <Typography variant="subtitle1" fontSize={{xs:"1.25rem", sm:"2rem", md:"2.5rem", xl:"2.25rem" }} className='break-words sm:pr-3 2xl:text-[3rem]'>
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
                    className='section-btn-ctn flex gap-3 pt-6 min-w-full md:w-fit'
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