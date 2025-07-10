"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, Typography, useMediaQuery } from '@mui/material';
import React from 'react'


const PressureWashingModule = ({ }) => {

    const sectionRef = React.useRef(null);

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
    if (desktop) size = 'xl';
    else if (tabletXL) size = 'lg';
    else if (tablet) size = 'md';
    else if (mobile) size = 'sm';
    else size = 'xs';

    return (
        <div>
            {/* Background GIF */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-[-10]"
            >
                <source src="https://res.cloudinary.com/dyfhsjtwo/video/upload/v1752107894/pw_1_xnfbad.mp4" type="video/mp4" />
                Your browser does not support the video tag!
            </video>


            {/* Overlay to darken the background for readability */}
            <div className="absolute inset-0 bg-black/50 " />
            <SectionWrapper
                ref={sectionRef}
                id={`pressure-washing`}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
            >
                <div
                    className='flex flex-col justify-center max-w-full h-full grow  sm:px-[12.5vw] gap-20'
                >
                    <MainHeroHeader
                        id={"blog-preview-header"}
                        headerLabel={"Proffessional Pressure Washing"}
                        center='text-center'
                        tagline={
                            <Typography
                                fontSize={size === 'xs' ? '1rem' : size === 'sm' ? '1.25rem' : size === 'md' ? '1.5rem' : size === 'lg' ? '1.75rem' : size === 'xl' ? '2rem' : '1.25rem'}
                                variant="subtitle1" className='text-white'>
                                For Homes & Small Businesses — Fast, Reliable, Affordable
                            </Typography>
                        }
                        taglineClassName='text-(#fafafa)'
                        size={size}
                    />

                    <div className="flex justify-center gap-4">
                        <Button variant="contained" className="bg-blue-600 text-white px-6 py-3 rounded-xl">Get a Free Estimate</Button>
                        <Button variant="outlined" className="bg-green-600 text-white px-6 py-3 rounded-xl">Call Now</Button>
                    </div>
                </div>


            </SectionWrapper>
        </div>


    )
}



export default PressureWashingModule;