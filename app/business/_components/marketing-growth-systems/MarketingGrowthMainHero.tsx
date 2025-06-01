"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import LeftFloatImgTextHero from '@/components/image/LeftFloatImgTextHero';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, Link, Typography, useMediaQuery } from '@mui/material';
import React from 'react'


const MarketingGrowthMainHero = ({ }) => {

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
                    headerLabel={"Marketing & Growth Systems That Scale With You"}
                    tagline={"Turn Your Marketing Into a Machine — Not a Mystery"}
                    size={!desktop ? "lg" : "xl"}
                    className=''
                />


            </div>


            <LeftFloatImgTextHero
                imgPT='0'
                heroText={
                    <
                    >
                        <Typography variant="subtitle1" fontSize={{ xs: "1.6rem", sm: "2rem", md: "2rem", xl: "2.25rem" }} className='break-words sm:pr-3 pl-[24vw] '>
                            Smart marketing isn&apos;t about doing more — it&apos;s about building systems that grow your business whether you&apos;re working or not.
                        </Typography>
                        <div className='flex gap-6 pl-[24vw]'>
                            <Button variant="contained" LinkComponent={Link} href="/contact">
                                Schedule Consultation
                            </Button>
                        </div>
                    </>

                }
                photo={`https://evenbound.com/hubfs/shutterstock_2142028755.jpg`}
                pt='md:pt-[50px] 2xl:pt-[200px] 3xl:pt-[500px] '
                rounded='rounded-[90px]'
                imgWidth='w-[225px] sm:w-[400px] md:w-[500px] md:landscape:w-[500px] lg:w-[600px] xl:landscape:w-[675px] 2xl:landscape:w-[950px] '
                imgHeight="h-[450px] md:h-[600px] lg:h-[700px] 2xl:h-[850px] "
                objectFit='cover'
            />
        </SectionWrapper>
    )
}



export default MarketingGrowthMainHero;