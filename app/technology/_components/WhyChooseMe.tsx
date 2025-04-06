"use client"

import SectionWrapper from '@/components/wrappers/SectionWrapper'
import React from 'react'
// import useMediaQuery from '@mui/material/useMediaQuery';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import Image from 'next/image';
import { Button } from '@mui/material';
import WhyChooseMeCard from './WhyChooseMeCard';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import Link from 'next/link';


const whyChooseCopy: { label: string, info: string }[] = [
    {
        label: 'Data-Driven Development',
        info: 'I build for people. Technology is the tool.'
    },
    {
        label: 'AI Powered Integrations',
        info: 'I build for people. Technology is the tool.'
    },
    {
        label: 'Scalability & Security',
        info: 'I build for people. Technology is the tool.'
    },
    {
        label: 'Human-Centric UX',
        info: 'I build for people. Technology is the tool.'
    },
]

const WhyChooseMe = ({ }) => {

    const sectionRef = React.useRef(null);

    const [benefit, setBenefit] = React.useState<number>(0);

    return (
        <SectionWrapper
            id='why-choose-me-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >

            <MainHeroHeader
                headerLabel={"I Build More Than Software. I Build Competitive Advantage."}
                tagline={"In a world of rapidly evolving technology, innovation isn’t optional—it’s survival. We don’t just build apps; we architect high-performance, scalable solutions that fuel growth, efficiency, and security."}
                size={"lg"}
                className=''
            />

            <div className='w-full grow' />

            <div
                className='flex flex-row-reverse min-w-screen relative -left-12 grow overflow-y-visible'
            >
                <div className='flex-1/2  '>
                    <MotionDiv
                        className='w-full absolute left-6 mt-20 '
                    >
                        {
                            whyChooseCopy.map((b, i) => {
                                return (
                                    <SlidingCardWrapper
                                        key={`${b.label} ${i}`}
                                        id={b.label}
                                        onClick={() => setBenefit(i)}
                                    >
                                        <WhyChooseMeCard
                                            benefit={b}
                                            open={i === benefit}
                                        />
                                    </SlidingCardWrapper>

                                )
                            })
                        }
                    </MotionDiv>

                </div>
                <div className='flex-1/2'>
                    <MotionDiv
                        className='rounded-4xl h-[300px] md:h-[650px] xl:w-full xl:h-[600px] bg-gray-950'
                    >
                        <div
                            className='xl:h-[500px] w-full h-[300px] md:h-[650px]'
                        >
                            <Image
                                alt="Why choose me section image of a metal hand faced toward the sky."
                                src={"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_4_cu3yxd.png"}
                                width={9}
                                height={16}
                                sizes='100vw'
                                className='z-0 w-[250px] relative xl:absolute left-6 md:w-[1000px] xl:w-[500px] xl:left-[500px] 2xl:left-[26%] '
                                style={{
                                    objectFit: 'contain',
                                    objectPosition: 'center',
                                    height: '100%',
                                }}
                            />
                        </div>

                        <Link
                            href={`/technology/approach`}
                        >
                            <Button variant='contained' className='relative left-12 -top-6'>
                                How I Approach
                            </Button>
                        </Link>

                    </MotionDiv>
                </div>


            </div>
        </SectionWrapper>
    )
}



export default WhyChooseMe;