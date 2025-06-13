"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import LeftFloatImgTextHero from '@/components/image/LeftFloatImgTextHero';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react'


const WhySellersTrustMe = ({ }) => {
    const sectionRef = React.useRef(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (

        <SectionWrapper
            id="home-sell-your-home-fast-section"
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=""
        >

            <div className="w-full sm:px-[12.5vw] grow flex flex-col justify-center gap-6 ">

                <MainHeroHeader
                    headerLabel="Why Sellers Trust Me"
                    headerLabelClassName="md:text-center"
                    taglineClassName="md:text-center"
                    tagline=""
                    size={!desktop ? 'md' : 'lg'}
                />


                <LeftFloatImgTextHero
                    imgPT='0'
                    heroText={
                        <>
                                {[
                                    "✔️ Direct communication — no gatekeepers",
                                    "✔️ Discreet, professional, and fast",
                                    "✔️ No commissions, fees, or hidden costs",
                                    "✔️ Real estate investor who closes with cash",
                                ].map((item, index) => (
                                    <Typography key={index} variant="body1" fontWeight="600" className='pb-10 pl-[24vw]'>
                                        {item}
                                    </Typography>
                                ))}
                        </>

                    }
                    photo={`https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/tchrkeie3jbe8qe8ei6k_nhnajt.webp`}
                    pt='pt-[50px] md:pt-[50px] 2xl:pt-[200px] 3xl:pt-[500px] '
                    rounded='rounded-[90px]'
                    imgWidth='w-[225px] sm:w-[400px] md:w-[500px] md:landscape:w-[500px] lg:w-[600px] xl:landscape:w-[675px] 2xl:landscape:w-[950px] '
                    imgHeight="h-[450px] md:h-[600px] lg:h-[700px] 2xl:h-[850px] "
                    objectFit='cover'
                />
                <Box component="section" px={3} >
                    <Box maxWidth="lg" mx="auto" textAlign="center">

                    </Box>
                </Box>
            </div>

        </SectionWrapper>


    )
}



export default WhySellersTrustMe;