"use client"

import GeneralDynamicContact from '@/components/contact-forms/GeneralDynamicContactForm';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery } from '@mui/material';
import React from 'react'


const ContactModule = ({ }) => {


    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='main-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >

            <div
                className='w-full xl:px-[12.5vw] '
            >
                <MainHeroHeader
                    headerLabel={"Let's Discuss Your Project"}
                    tagline={"Technology, Real Estate, and Business Solutions"}
                    size={!desktop ? "xl" : "lg"}
                    className=''
                />

            </div>

            <div
                className='w-full grow flex justify-center items-center'
            >
                <GeneralDynamicContact />
            </div>
            
        </SectionWrapper>
    )
}



export default ContactModule;