"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery, Typography } from '@mui/material';
import React from 'react'


const TheShift = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='digital-presence-the-opportunity'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >

            <div
                className='w-full xl:px-[12.5vw] mb-20'
            >
                <MainHeroHeader
                    headerLabel={"The Shift: Systemized Growth That Doesn’t Rely on You Doing Everything"}
                    headerLabelClassName='text-right'
                    tagline={""}
                    taglineClassName='text-right'
                    size={!desktop ? "md" : "md"}
                    className=''
                />


                <div
                    className='w-full px-[3vw] mt-30 '
                >
                    <div
                        className='px-20 sm:pl-70'
                    >
                        <Typography variant="subtitle1"
                            fontSize={24} fontWeight={100} className=" italic text-right">
                            Growth isn&apos;t luck — it&apos;s built.
                            And when you have the right systems, <strong>your business grows even when you&apos;re off the clock</strong>.
                        </Typography>
                    </div>

                    <div
                        className='mt-30 sm:pr-70'
                    >
                        <Typography variant="h6"
                            fontSize={48} fontWeight={100} className="text-left ">
                            I will help you build a foundation that markets <span className='italic underline'>for you</span> — with strategies that attract, nurture, and convert the right people <span className='italic underline'>automatically</span>.
                        </Typography>
                    </div>


                </div>
            </div>

        </SectionWrapper>
    )
}



export default TheShift;