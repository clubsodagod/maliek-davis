"use client"

import React from 'react'
import PrestigePartnersUnderlay from './PrestigePartnersUnderlay'
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import Image from 'next/image';
import { investorImg } from '@/library/image.cdn';
import { Button, Typography, useMediaQuery } from '@mui/material';


const PrestigePartnersMainHero = ({ }) => {
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "md" : undefined;



    const sectionRef = React.useRef<HTMLDivElement>(null);

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
                        className='object-cover w-full h-full '
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
                                headerLabel={'Exclusive Real Estate Investment Collaborations'}
                                tagline={
                                    <Typography variant="subtitle1" color="#fafafa">
                                        Strategic Growth. High Value Assets. Sustainable Wealth.
                                    </Typography>
                                }
                                size={headerSize}
                                center="text-center"
                            />
                        </div>
                        
                        <div className='w-full flex gap-6 justify-center '>
                            <Button variant="contained">
                                Become A Prestige Partner
                            </Button>
                            <Button variant="outlined">
                                More
                            </Button>
                        </div>
                    </div>



                </SectionWrapper>
            </div>

        </div>

    )
}



export default PrestigePartnersMainHero;