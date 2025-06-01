"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';

import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { List, ListItem, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react'


const TheProblem = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='business-planning-the-problem-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >

            <div
                className='w-full sm:px-[12.5vw] '
            >
                <MainHeroHeader
                    headerLabel={"The Problem"}
                    tagline={"Running a Business Without a Plan is Like Driving With No Map"}
                    size={!desktop ? "lg" : "lg"}
                    className=''
                />

                <div
                    className='w-full px-[3vw] mt-20'
                >
                    <div
                        className='w-full flex flex-col md:flex-row gap-12 items-end'
                    >
                        <MotionDiv
                            className='my-auto '
                        >
                            <List

                            >
                                <ListItem>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        <strong className="font-bold">Wasting valuable time </strong>with no clear direction
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        <strong className="font-bold">Guessing their way forward </strong>instead of following a real plan
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        <strong className="font-bold">Missing key data </strong>to track revenue, growth, or performance
                                    </Typography>

                                </ListItem>
                                <ListItem>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        <strong className="font-bold">Always putting out fires </strong>instead of building something solid
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="h5" color="primary.dark" className="text-center">
                                        No wonder it feels like burnout is always around the corner.
                                    </Typography>
                                </ListItem>

                            </List>
                        </MotionDiv>
                        <MotionDiv className='mx-auto'>

                            <Image
                                alt='technology-solutions-cta-image'
                                src={"https://images.pexels.com/photos/1888883/pexels-photo-1888883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                sizes='100vw'
                                width={500}
                                height={500}
                                className={`relative w-[400px] h-full overflow-x-visible overflow-y-hidden rounded-[38px] object-[50%_0]`}
                                style={{ objectFit: "cover" }}
                            />
                        </MotionDiv>
                    </div>


                </div>
            </div>


        </SectionWrapper>
    )
}



export default TheProblem;