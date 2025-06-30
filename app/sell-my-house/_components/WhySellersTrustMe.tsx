"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
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


                <Box component="section" px={3} 
                    className="flex"
                >
                        <MotionDiv
                            className="w-[50%] h-[24vh] 2xl:h-[60vh] overflow-hidden"
                            style={{
                                borderRadius:"38px"
                            }}
                        >
                            <Image
                                src={`https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170631/pfd8lmzgdoaf4fjhjyf6_lio0hs.webp`}
                                className="w-full h-full "
                                width={9}
                                height={16}
                                sizes='100vw'
                                alt=""
                                style={{
                                    objectFit: "cover"
                                }}
                            />
                        </MotionDiv>
                    <Box maxWidth="lg" mx="auto" textAlign="center">


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
                    </Box>
                </Box>
            </div>

        </SectionWrapper>


    )
}



export default WhySellersTrustMe;