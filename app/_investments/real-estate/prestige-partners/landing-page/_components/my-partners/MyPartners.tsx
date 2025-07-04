"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery, Typography, Box } from '@mui/material';
import React from 'react'
import { FaUserSecret } from 'react-icons/fa';


const MyPartners = ({ }) => {


    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "md" : undefined;



    const sectionRef = React.useRef<HTMLDivElement>(null);
    return (

        <SectionWrapper
            ref={sectionRef}
            id='focused-scarcity-investor-section'
            initial={initialHeaderAnimation}
            whileInView={{ opacity: 1 }}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className="py-24"
        >
            <div className="w-full max-w-4xl mx-auto text-center px-4 flex flex-col gap-10">
                <MainHeroHeader
                    headerLabel={'I Only Work With a Few Serious Investors at a Time'}
                    tagline={""}
                    size={headerSize}
                />

                <Typography variant="subtitle1" >
                    This isn’t a public service. Every deal is sourced with your criteria in mind, and each investor receives priority attention.
                    If you’re scaling, I’m your unfair advantage.
                </Typography>

                <Box className="bg-(--foreground) border border-neutral-800 rounded-4xl px-6 py-8 mt-8 shadow-md flex flex-col items-center gap-4 max-w-2xl mx-auto">
                    <FaUserSecret size={28} className="text-(--background)" />
                    <Typography variant="body1"  fontStyle="italic"  className="text-(--background)">
                        “I sent my criteria, and two weeks later I had a high-cash-flow duplex under contract. No endless Zillow scrolling. No agents.”
                    </Typography>
                    <Typography variant="body2"  className="text-(--background)" >
                        — Private Investor, Michigan
                    </Typography>
                </Box>
            </div>
        </SectionWrapper>
    )
}



export default MyPartners;