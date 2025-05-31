"use client"

import React from 'react'
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import LeftFloatImgTextHero from '@/components/image/LeftFloatImgTextHero';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery, Typography, Button } from '@mui/material';
import Link from 'next/link';
import WhatIsABrand from './WhatIsABrand';
import ForgettableSmallBusinesses from './ForgettableSmallBusinesses';
import BrandBuildingFramework from './BrandBuildingFramework';
import BrandLikeABossCTA from './BrandLikeABossCTA';


const BrandingSection = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (

        <>

            <SectionWrapper
                id='business-branding-section'
                ref={sectionRef}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
                className=''
            >

                <div
                    className='w-full xl:px-[12.5vw] mb-20'
                >
                    <MainHeroHeader
                        headerLabel={"Build a Brand, Not Just a Business"}
                        tagline={"Build a Brand That Commands Attention — and Premium Prices"}
                        size={!desktop ? "xl" : "xl"}
                        className=''
                    />

                </div>


                <LeftFloatImgTextHero
                    imgPT='0'
                    heroText={
                        <div
                            className="flex flex-col gap-3"
                        >
                            <Typography variant="subtitle1" fontSize={{ xs: "1.6rem", sm: "3rem", md: "4rem", xl: "2.25rem" }} className='break-words sm:pr-3 2xl:text-[3rem]'>
                                You&apos;re not just running a business. You&apos;re building a name, a legacy, a presence. This is how smart small businesses become unforgettable.
                            </Typography>
                            <div className='flex gap-6'>
                                <Button variant="contained" LinkComponent={Link} href="/contact">
                                    Schedule Consultation
                                </Button>
                            </div>
                        </div>

                    }
                    photo={"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1748128642/ChatGPT_Image_May_24_2025_07_15_08_PM_jitelq.webp"}
                    pt='pt-[100px] md:pt-[100px] 2xl:pt-[200px] 3xl:pt-[500px] '
                    rounded='rounded-[90px]'
                    imgWidth='w-[225px] md:w-[500px] md:landscape:w-[500px] lg:w-[600px] xl:landscape:w-[675px] 2xl:landscape:w-[950px] '
                    imgHeight="h-[450px] md:h-[600px] lg:h-[700px] 2xl:h-[850px] "
                    objectFit='cover'
                />


            </SectionWrapper>
            <WhatIsABrand />
            <ForgettableSmallBusinesses />
            <BrandBuildingFramework />
            <BrandLikeABossCTA />
        </>

    )
}



export default BrandingSection;