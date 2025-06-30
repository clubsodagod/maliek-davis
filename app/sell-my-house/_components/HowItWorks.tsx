"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery, Typography, Box } from '@mui/material';
import React from 'react'


const HowItWorks = ({ }) => {
    const sectionRef = React.useRef(null);
    
        const mobile = useMediaQuery(`(max-width:768px)`);
        const tablet = useMediaQuery(`(min-width:769px)`);
        const tabletXL = useMediaQuery(`(min-width:900px)`);
        const desktop = useMediaQuery(`(min-width:1100px)`);
    
        const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? "lg" : mobile ? "xl" : undefined;
    

    return (
        <>
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
                <div className="w-full sm:px-[12.5vw] grow flex flex-col justify-center gap-10 ">
                    <div className="max-w-4xl mx-auto text-center">
                        <MainHeroHeader
                            headerLabel="How It Works"
                            headerLabelClassName="md:text-center"
                            taglineClassName="md:text-center"
                            tagline="I make the home-selling process simple, fast, and transparent."
                            size={headerSize}
                        />
                        <div className=" gap-10 text-left mt-50">
                            <Typography variant="h4" className="text-lg md:text-xl text-center" >
                                Simple Process:
                            </Typography>

                            <Box className="grid md:grid-cols-3 gap-8 text-center mt-20">
                                <Box className="flex flex-col items-center gap-4">
                                    <Typography variant="h3" component="div">
                                        📝
                                    </Typography>
                                    <Typography variant="h6" fontWeight="600">
                                        1. Tell Me About Your Property
                                    </Typography>
                                    <Typography variant="body1">
                                        Start with a short form or phone call — no pressure, just info.
                                    </Typography>
                                </Box>

                                <Box className="flex flex-col items-center gap-4">
                                    <Typography variant="h3" component="div">
                                        💰
                                    </Typography>
                                    <Typography variant="h6" fontWeight="600">
                                        2. Get a Data-Backed Cash Offer
                                    </Typography>
                                    <Typography variant="body1">
                                        I&apos;ll calculate your offer using market comps and property condition — no lowballing.
                                    </Typography>
                                </Box>

                                <Box className="flex flex-col items-center gap-4">
                                    <Typography variant="h3" component="div">
                                        📆
                                    </Typography>
                                    <Typography variant="h6" fontWeight="600">
                                        3. Close on Your Timeline
                                    </Typography>
                                    <Typography variant="body1">
                                        You pick the closing date. I&apos;ll handle the paperwork. No fees, ever.
                                    </Typography>
                                </Box>
                            </Box>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

        </>
    )
}



export default HowItWorks;