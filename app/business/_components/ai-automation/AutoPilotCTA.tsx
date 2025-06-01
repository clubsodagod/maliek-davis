"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { investorImg } from '@/library/image.cdn';
import { Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import DynamicBusinessLeadCaptureModule from '../form/DynamicBusinessLeadCaptureModule';


const AutoPilotCTA = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='business-ai-automation-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >

            <div
                className='w-full sm:px-[12.5vw] grow flex flex-col justify-center'
            >
                <MainHeroHeader
                    headerLabel={"Your Business, On Autopilot (Almost)."}
                    headerLabelClassName='text-center'
                    tagline={""}
                    taglineClassName='text-center'
                    size={!desktop ? "md" : "lg"}
                    className=''
                />

                <div
                    className='flex flex-col md:flex-row gap-10 mt-20'
                >

                    <div
                        className='mx-auto mt-10 flex  flex-col sm:flex-row xl:flex-col gap-10 items-center'
                    >
                        <div className="relative w-full sm:w-1/2   h-[400px] sm:h-fit rounded-4xl overflow-hidden">
                            <Image
                                src={investorImg}
                                alt={"picture of maliek in a suit"}
                                width={500}
                                height={500}
                                objectFit="contain w-full h-full"
                                className="rounded-4xl"
                            />
                        </div>
                        <div
                            className=" text-center sm:w-1/2 sm:my-auto xl:my-0 "
                        >
                            <Typography variant="subtitle1">
                                The most successful entrepreneurs aren&apos;t working harder — they&apos;re <strong>working smarter with automation and AI</strong>.
                            </Typography>
                        </div>
                    </div>

                    <DynamicBusinessLeadCaptureModule formType='ai_automation' />
                </div>
                <div
                    className='mx-auto mt-10 xl:px-50'
                >
                    <Typography variant="subtitle1">
                        👉 Let’s build systems that scale with you — not <span className='italic'>stress</span> you out.
                    </Typography>
                </div>
            </div>



        </SectionWrapper>
    )
}



export default AutoPilotCTA;