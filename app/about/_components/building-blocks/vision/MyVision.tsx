"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery, Typography, Button } from '@mui/material';
import React from 'react'
import CrystalBall from './CrystalBall';

const MyVision = () => {

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? "xl" : tabletXL ? "lg" : tablet ? 
    "lg" : mobile ? "md" : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);

    return (

        <SectionWrapper
            id='core-values-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <div
                className='md:px-20'
            >
                <MainHeroHeader
                    headerLabel={'My Vision: Engineering the Future of Wealth & Technology'}
                    tagline={""}
                    size={headerSize}
                />
            </div>

            <div
                className=' md:px-30 lg:px-40 md:text-center'
            >
                <Typography variant="subtitle1"
                    color='dark:text-[#fafafa]'
                    fontSize={
                        desktop ? "1.25rem" :        // 20px
                            tabletXL ? "2.25rem" :      // 18px
                                tablet ? "2rem" :            // 16px
                                    mobile ? "0.95rem" :         // Slightly smaller for mobile
                                        "1rem"
                    }
                >
                    I see a future where technology and finance are seamlessly integrated—where data-driven insights, automation, and systems thinking remove inefficiencies and create scalable, intelligent wealth-building opportunities.
                </Typography>
            </div>

            <div
                className=' md:px-30 lg:px-40 md:text-center flex flex-col gap-1'
            >
                <Typography variant="subtitle1"
                    color='dark:text-[#fafafa]'
                    fontWeight={"bold"}
                    fontSize={
                        desktop ? "1.25rem" :        // 20px
                            tabletXL ? "2.25rem" :      // 18px
                                tablet ? "2rem" :            // 16px
                                    mobile ? "0.95rem" :         // Slightly smaller for mobile
                                        "1rem"
                    }
                    className="text-center"
                >
                    My goal in leading this transformation:
                </Typography>
                <div>
                    <CrystalBall />
                </div>

            </div>
            <div
                className=' md:px-30 lg:px-40 '
            >

                <Button variant="contained">
                    Let&apos;s Grab a Coffee
                </Button>
            </div>
        </SectionWrapper>

    )
}

export default MyVision