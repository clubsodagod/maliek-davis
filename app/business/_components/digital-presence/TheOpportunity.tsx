"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { List, ListItem, ListItemIcon, ListSubheader, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';


const TheOpportunity = ({ }) => {

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
                className='w-full sm:px-[12.5vw] mb-20'
            >
                <MainHeroHeader
                    headerLabel={"The Opportunity: Become Discoverable, Trustworthy, and Profitable Online"}
                    headerLabelClassName='text-right'
                    tagline={"Your Digital Presence is Your 24/7 Storefront"}
                    taglineClassName='text-right'
                    size={!desktop ? "md" : "xl"}
                    className=''
                />


                <div
                    className='w-full px-[3vw] mt-30'
                >
                    <div
                        className='w-full flex flex-col md:flex-row gap-12 items-end'
                    >
                        <MotionDiv
                            className='my-auto '
                        >
                            <List

                            >
                                <ListSubheader
                                    sx={{
                                        bgcolor: "transparent",
                                    }}
                                    className=''

                                >
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={"bold"}
                                        fontSize={32}
                                        className=""
                                    >
                                        When done right, it:
                                    </Typography>

                                </ListSubheader>
                                <ListItem>
                                    <ListItemIcon>
                                        <ScatterPlotIcon className='color-(--foreground)' />
                                    </ListItemIcon>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        Makes you look like a trusted authority <span className='italic'>(even if you&apos;re a one-person team)</span>
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
                                        Drives more qualified leads and buyers to your inbox
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
                                        Builds brand awareness, trust, and long-term equity
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
                            You don’t need a fancy site. You need a smart one.
                        </Typography>
                    </div>


                </div>
            </div>

        </SectionWrapper>
    )
}



export default TheOpportunity;