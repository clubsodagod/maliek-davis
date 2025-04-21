"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import TextScroller from '@/components/TextScroller';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, Paper, useMediaQuery } from '@mui/material';
import React from 'react'
import { partnerBenefits } from '../../_library/copy.const';
import Link from 'next/link';


const WhyPartnerWithMe = ({ }) => {
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "lg" : undefined;



    const sectionRef = React.useRef<HTMLDivElement>(null);

    return (

        <Paper
            sx={{
                bgcolor:"black",
                borderRadius:0
            }}
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

                <MainHeroHeader
                    headerLabel={'Why Partner With Me?'}
                    tagline={""}
                    size={headerSize}
                />
                <div
                className='grow relative w-[101vw] -left-6'
                >
                    <TextScroller
                    benefitList={partnerBenefits}
                />
                </div>
                <div>
                    <Button
                        variant="contained"
                    >
                        <Link href={""}>
                            Let&apos;s Discuss Opportunities
                        </Link>
                    </Button>
                </div>
                
            </SectionWrapper>
        </Paper>

    )
}



export default WhyPartnerWithMe;