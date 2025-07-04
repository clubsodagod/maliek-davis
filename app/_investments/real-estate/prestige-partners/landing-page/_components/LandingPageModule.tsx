"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { investorImg } from '@/library/image.cdn';
import { useMediaQuery, Typography, Button } from '@mui/material';
import React from 'react'
import PrestigePartnersUnderlay from '../../_components/main-hero/PrestigePartnersUnderlay';
import Image from 'next/image';
import WhoThisIsForSection from './WhoThisIsForSection';
import LandingPageCTA from './cta/LandingPageCTA';
import ConciergeRealEstateSection from './concierge-real-estate/ConciergeRealEstateSection';
import MyPartners from './my-partners/MyPartners';


const LandingPageModule = ({ }) => {

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "md" : undefined;



    const sectionRef = React.useRef<HTMLDivElement>(null);

    const scrollToAccessForm = () => {
        const el = document.getElementById('access-form-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };


    return (
        <div
            className='relative w-full h-full'
        >
            <PrestigePartnersUnderlay />
            <div
                className='absolute w-full h-full bottom-0 flex flex-col items-center justify-end z-[51]'
            >
                <div
                    className="h-[70vh] lg:landscape:h-[80vh] 2xl:landscape:h-[75vh] w-[85%] lg:w-[60%] lg:landscape:w-[35%] xl:landscape:w-[40%] 2xl:landscape:w-[30%]"
                >
                    <Image
                        alt='profession image of maliek'
                        src={investorImg}
                        sizes='100vw' width={300} height={600}
                        className='object-contain w-full h-full  '
                    />
                </div>


            </div>
            <div
                className='absolute w-full h-full top-0 z-52'
            >
                <SectionWrapper
                    id='investments-real-estate-prestige-partners-main-section'
                    ref={sectionRef}
                    whileInView={{ opacity: 1 }}
                    initial={initialHeaderAnimation}
                    animate={animateHeaderAnimation}
                    transition={transitionHeaderAnimation}
                    exit={{ opacity: 0, scaleY: 0 }}
                >
                    <div className="relative min-h-full flex flex-col justify-end items-end mt-auto z-[100] gap-6">
                        {/* Overlay */}
                        <div
                            style={{
                                backgroundImage: 'linear-gradient(to top, black 55%, transparent 100%)'
                            }} className="absolute bottom-[-6vh] -left-6 w-screen   h-[33dvh]" />

                        <div className='relative z-[55] w-full lg:px-12 opacity-100'>
                            <MainHeroHeader
                                headerLabel={'Elite Deals. Zero Effort.'}
                                tagline={
                                    <Typography variant="subtitle1" color="#fafafa">
                                        Private sourcing for investors who value time, control, and premium returns.
                                    </Typography>
                                }
                                size={headerSize}
                                center="text-center"
                            />
                        </div>

                        <div className='w-full flex gap-6 justify-center '>
                            <Button variant="contained" onClick={scrollToAccessForm}>
                                Apply for Access
                            </Button>
                        </div>
                    </div>



                </SectionWrapper>

                <ConciergeRealEstateSection />
                <MyPartners />
                <WhoThisIsForSection />
                <LandingPageCTA />
            </div>

        </div>
    )
}



export default LandingPageModule;