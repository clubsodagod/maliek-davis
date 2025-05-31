"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery, List, Typography, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import Image from 'next/image';



const TheSolution = ({ }) => {

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
                    headerLabel={"The Solution: Automation That Feels Like Hiring a Dream Team"}
                    headerLabelClassName='text-right'
                    tagline={""}
                    taglineClassName='text-right'
                    size={!desktop ? "lg" : "xl"}
                    className=''
                />


                <div
                    className='w-full px-[3vw] mt-30'
                >
                    <div
                        className='px-20'
                    >
                        <Typography variant="subtitle1"
                        fontSize={24} fontWeight={100} className="text-center italic ">
                            When you plug automation + AI into the right places, it&apos;s like adding 3 new employees — without the overhead.
                        </Typography>
                    </div>
                    <div
                        className='w-full flex flex-col md:flex-row-reverse gap-12 items-end mt-10'
                    >
                        <MotionDiv
                            className='my-auto '
                        >
                            <List

                            >
                                <ListItem
                                    className='w-full text-center'

                                >
                                    <ListItemText>
                                        <Typography
                                        variant="subtitle1"
                                        fontWeight={"bold"}
                                        fontSize={32}
                                        className="text-center"
                                    >
                                        Imagine a business where:
                                    </Typography>
                                    </ListItemText>
                                    

                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <ScatterPlotIcon className='color-(--foreground)' />
                                    </ListItemIcon>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        Leads are followed up with instantly (and automatically)
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <ScatterPlotIcon className='color-(--foreground)' />
                                    </ListItemIcon>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        Content is created 3x faster with AI
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <ScatterPlotIcon className='color-(--foreground)' />
                                    </ListItemIcon>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        Sales pipelines update themselves
                                    </Typography>

                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <ScatterPlotIcon className='color-(--foreground)' />
                                    </ListItemIcon>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        Your calendar, marketing, emails, and customer experience just flow
                                    </Typography>

                                </ListItem>

                            </List>

                        </MotionDiv>

                        <MotionDiv className=''>

                            <Image
                                alt='technology-solutions-cta-image'
                                src={"https://images.pexels.com/photos/2460436/pexels-photo-2460436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                sizes='100vw'
                                width={500}
                                height={500}
                                className={`relative w-full h-full overflow-x-visible overflow-y-hidden rounded-[38px] object-[50%_0]`}
                                style={{ objectFit: "cover" }}
                            />
                        </MotionDiv>


                    </div>

                    <div
                        className='mt-30'
                    >
                        <Typography variant="h6"
                        fontSize={48} fontWeight={100} className="text-center italic ">
                            Automation isn&apos;t just for big companies — it&apos;s how small businesses grow smart.
                        </Typography>
                    </div>


                </div>
            </div>

        </SectionWrapper>
    )
}



export default TheSolution;