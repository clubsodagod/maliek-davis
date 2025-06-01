"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import { brandBuildingProcess, BrandBuildingStep } from '../../_library/copy.const';
import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import Image from 'next/image';


const BrandBuildingFramework = ({ }) => {

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
                className='w-full sm:px-[12.5vw]  flex flex-col justify-center grow'
            >
                <MainHeroHeader
                    headerLabel={"My Brand Building Framework"}
                    headerLabelClassName=''
                    tagline={""}
                    taglineClassName=''
                    size={!desktop ? "md" : "lg"}
                    className=''
                />


                <div
                    className=" mt-10"
                >
                    <Typography variant="subtitle1" fontSize={24}>
                        Building a brand is a process — but it doesn’t have to be overwhelming.
                        Here’s the step-by-step approach we use to help small businesses transform:
                    </Typography>
                </div>

                <div
                    className='mt-10'
                >
                    {
                        brandBuildingProcess.map((s, i) => {

                            if (i % 2 === 0) {
                                return (
                                    <>
                                        <ProcessStep key={`${s.title}`} step={s} i={i} />
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <ProcessStep key={`${s.title}`} step={s} i={i} />
                                    </>
                                )
                            }
                        })
                    }
                </div>

                <div className='mt-10 flex flex-col gap-10 px-20'>
                    <Typography variant='subtitle1'
                        className='text-center w-full italic'
                        fontSize={36}
                    >
                        &quot;Branding isn&apos;t a luxury. It&apos;s leverage.&quot;
                    </Typography>
                    <Typography variant='h6'
                        className='text-center w-full '
                        fontSize={24}
                    >
                        When your brand speaks for you, people listen, trust, and pay more — without you saying a word.
                    </Typography>
                </div>
            </div>



        </SectionWrapper>
    )
}



export default BrandBuildingFramework;



type ProcessStepProps = {
    step: BrandBuildingStep;
    i: number;
};

export const ProcessStep: React.FC<ProcessStepProps> = ({ step, i }) => {
    const isEven = i % 2 === 0;

    return (
        <ComponentTransition id={`${step.title}`}>
            <MotionDiv
                className={`flex flex-col md:flex-row items-center gap-6 py-10 px-6 rounded-2xl ${isEven ? '' : 'md:flex-row-reverse'
                    }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
            >
                <div className="relative w-full md:w-1/3 h-48 rounded-xl overflow-hidden">
                    <Image
                        src={step.photo}
                        alt={step.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                    />
                </div>
                <div className="w-full space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                        <Typography variant="h4" className="font-semibold">
                            {i + 1}. {step.label}
                        </Typography>
                    </div>

                    <Typography variant="h5" className="font-bold text-gray-800">
                        {step.title}
                    </Typography>

                    <Typography className="text-gray-600">
                        {step.description}
                    </Typography>
                </div>
            </MotionDiv>
        </ComponentTransition>
    );
};
