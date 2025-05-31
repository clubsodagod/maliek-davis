"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { investorImg } from '@/library/image.cdn';
import { useMediaQuery, Typography } from '@mui/material';
import React from 'react'
import DynamicBusinessLeadCaptureModule from '../form/DynamicBusinessLeadCaptureModule';
import Image from 'next/image';


const UnbreakableGrowthSystsemsCTA = ({ }) => {

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
                className='w-full xl:px-[12.5vw] grow flex flex-col justify-center'
            >
                <MainHeroHeader
                    headerLabel={"Build a Growth System That Doesn’t Break You"}
                    headerLabelClassName='text-center'
                    tagline={""}
                    taglineClassName='text-center'
                    size={!desktop ? "lg" : "lg"}
                    className=''
                />

                <div
                    className='flex flex-col md:flex-row gap-10 mt-20'
                >

                    <div
                        className='mx-auto mt-20 flex sm:max-w-1/2 flex-col gap-10'
                    >
                        <div className="relative w-full  h-[400px] rounded-xl overflow-hidden">
                            <Image
                                src={investorImg}
                                alt={"picture of maliek in a suit"}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-xl"
                            />
                        </div>
                        <div
                            className="sm:px-30 text-center"
                        >
                            <Typography variant="subtitle1">
                                You deserve <strong>consistent clients</strong>, <strong>predictable sales</strong>, and <strong>a business that grows</strong> even when you&apos;re not online.
                            </Typography>
                        </div>
                    </div>

                    <DynamicBusinessLeadCaptureModule formType='marketing_growth' />
                </div>
                <div
                    className='mx-auto mt-10'
                >
                    <Typography variant="subtitle1">
                        👉 Let&apos;s build a marketing system that actually <span className='italic underline'>frees you up</span>  — not <span className='italic font-bold text-red-500'>burns you out</span>.
                    </Typography>
                </div>
            </div>



        </SectionWrapper>
    )
}



export default UnbreakableGrowthSystsemsCTA;