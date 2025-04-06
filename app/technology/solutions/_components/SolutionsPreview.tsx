/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React from 'react'
import { SolutionCategory, technologySolutions } from '../../_components/TechnologySolutions';
import Image from 'next/image';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Box, Button, Typography } from '@mui/material';
import ComponentTransition from '@/components/layout/ComponentTransition';


const SolutionsPreview = ({ }) => {

    const sectionRef = React.useRef(null);

    const [solutionCategory, setSolutionCategory] = React.useState<number>(0);
    const [solution, setSolution] = React.useState<number>(0);


    return (
        <SectionWrapper
            ref={sectionRef}
            id='technology-solutions-main-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >
            <div className='flex flex-col gap-1'>
                <div
                    className='relative w-screen -left-6 top-[-12dvh]  rounded-b-4xl bg-black z-0 px-6 pt-[12vh] pb-10 flex flex-col gap-12 mb-12'
                >
                    <MainHeroHeader
                        headerLabel={"Solutions for Everyone"}
                        tagline={technologySolutions[solutionCategory].subtitle}
                        size={"lg"}
                        taglineClassName='text-[#fafafa]'
                    />

                    <div className='flex items-center gap-6 overflow-x-auto relative w-screen -left-6'>
                        {
                            technologySolutions.map((s, i) => {
                                return (

                                    <div
                                        key={`${s.title} ${i}`}
                                        className='min-w-[33vw]'
                                        onClick={() => setSolutionCategory(i)}
                                    >
                                        <MotionDiv
                                            className=' flex flex-col justify-center gap-3 items-center w-full'
                                        >
                                            <Image
                                                alt={s.title}
                                                src={s.photo}
                                                sizes='100vw'
                                                width={9}
                                                height={16}
                                                style={{
                                                    objectFit: "contain",
                                                }}
                                                className='w-[100px]  md:w-[200px] md:landscape:w-[150px]'
                                            />
                                            <Typography variant='caption' color='#fafafa' fontWeight={'bold'} className='text-center w-full line-clamp-2'>
                                                {s.title}
                                            </Typography>
                                        </MotionDiv>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>

                <div className='relative top-[-12vh] flex flex-col gap-20 md:px-40 2xl:px-80 landscape:md:px-80 landscape:xl:px-80'>


                    <Typography variant='body1' fontWeight={100}>
                        {technologySolutions[solutionCategory].description}
                    </Typography>

                    <ComponentTransition id='solution-preview-results'>
                        <MotionDiv
                            className='flex flex-col gap-6'
                        >

                            <div className=''>
                                <Typography variant='subtitle1' fontWeight={700}>
                                    What I Can Do for You
                                </Typography>
                                {
                                    technologySolutions[solutionCategory].solutions[solution].items.map((s, i) => {
                                        return (
                                            <ul
                                                key={`${s} ${i}`}
                                                className='flex gap-3 text-left'
                                            >

                                                <li
                                                    style={{
                                                        listStyleType: "disc",
                                                        listStylePosition: "inside",
                                                    }}
                                                >
                                                    <Typography variant='caption' className='w-full '>
                                                        {s}
                                                    </Typography>
                                                </li>

                                            </ul>
                                        )
                                    })
                                }
                            </div>

                            <div className=''>
                                <Typography variant='subtitle1' fontWeight={700}>
                                    Results
                                </Typography>
                                {
                                    technologySolutions[solutionCategory]?.solutions[solution]?.results?.map((s, i) => {
                                        return (
                                            <ul
                                                key={`${s} ${i}`}
                                                className='flex gap-3 text-left'
                                            >

                                                <li
                                                    style={{
                                                        listStyleType: "disc",
                                                        listStylePosition: "inside",
                                                    }}
                                                >
                                                    <Typography variant='caption' className='w-full '>
                                                        {s}
                                                    </Typography>
                                                </li>

                                            </ul>
                                        )
                                    })
                                }
                            </div>

                        </MotionDiv>
                    </ComponentTransition>


                    <div className='flex flex-col gap-12'>
                        <Typography variant='h4' fontWeight={500} className='w-full text-center'>
                            Comprehensive Solutions
                        </Typography>
                        <div className='flex justify-center items-center gap-3 '>
                            {
                                technologySolutions[solutionCategory].solutions.map((s, i) => {
                                    return (

                                        <MotionDiv
                                            key={`${s.heading} ${i}`}
                                            className='flex-1/3 flex flex-col justify-center items-center max-w-1/3'
                                            onClick={() => setSolution(i)}
                                        >
                                            <Image
                                                alt={s.heading}
                                                src={s.photo}
                                                sizes='100vw'
                                                width={9}
                                                height={16}
                                                style={{
                                                    objectFit: "cover",
                                                }}
                                                className='w-full  md:w-[200px] md:landscape:w-[150px]'
                                            />
                                            <Typography color={i === solution ? "primary.light" : ""} variant='caption' fontWeight={'bold'} className='text-center w-full line-clamp-2'>
                                                {s.heading}
                                            </Typography>
                                        </MotionDiv>
                                    )
                                })
                            }
                        </div>

                    </div>

                    <Button variant='contained'>
                        Schedule Your Strategy Call
                    </Button>
                </div>
            </div>

        </SectionWrapper >
    )
}



export default SolutionsPreview;