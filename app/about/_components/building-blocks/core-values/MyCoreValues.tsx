/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery } from '@mui/material';
import React from 'react'
import CoreValuesSlider from './CoreValuesSlider';


const MyCoreValues = ({ }) => {
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? "xl" : tabletXL ? undefined : tablet ? undefined : mobile ? "xl" : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);

    const [open, setOpen] = React.useState<boolean>(false);
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
                    headerLabel={'My Core Values'}
                    tagline={""}
                    size={headerSize}
                    center='md:text-center'
                />
            </div>

            <CoreValuesSlider 
            />
        </SectionWrapper>
    )
}



export default MyCoreValues;