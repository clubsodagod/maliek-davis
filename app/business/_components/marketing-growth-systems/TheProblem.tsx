"use client"


import React from 'react'
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { List, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';


const TheProblem = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='ai-automation-the-problem'
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
                    headerLabel={"Marketing Burnout is Real"}
                    headerLabelClassName='text-center'
                    tagline={""}
                    size={!desktop ? "lg" : "xl"}
                    className=''
                />


                <div
                    className='w-full px-[3vw] mt-10'
                >
                    <div
                        className='w-full flex flex-col md:flex-row gap-12 items-center'
                    >
                        <MotionDiv
                            className='my-auto '
                        >
                            <List
                                sx={{
                                    listStylePosition:"inside"
                                }}
                            >
                                <ListItemText
                                    sx={{
                                        bgcolor: "transparent",
                                        mb:3
                                    }}

                                >
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={"bold"}
                                        fontSize={32}
                                        className="text-center"
                                    >
                                        You&apos;ve probably said this:
                                    </Typography>

                                </ListItemText>
                                <ListItem>

                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <ScatterPlotIcon className="color-[--foreground]" />
                                    </ListItemIcon>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        &quot;I post on social but don&apos;t get clients.&quot;
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <ScatterPlotIcon className="color-[--foreground]" />
                                    </ListItemIcon>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        &quot;I tried ads — it didn&apos;t work.&quot;
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <ScatterPlotIcon className="color-[--foreground]" />
                                    </ListItemIcon>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        &quot;I don&apos;t have time to market and run the business.&quot;
                                    </Typography>

                                </ListItem>

                            </List>


                        </MotionDiv>

                        <MotionDiv className='flex'>

                            <Image
                                alt='ai-automation-image'
                                src={"https://images.pexels.com/photos/1888883/pexels-photo-1888883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                sizes='100vw'
                                width={500}
                                height={500}
                                className={`relative w-full h-full overflow-x-visible overflow-y-hidden rounded-[38px] object-[50%_0]`}
                                style={{ objectFit: "cover" }}
                            />
                        </MotionDiv>


                    </div>


                    <div
                        className='pt-10'
                    >
                        <Typography variant="subtitle1"
                            className={"italic sm:text-center"}
                        >
                            Most small businesses are stuck in random acts of marketing — no strategy, no data, no consistent growth. And when you&apos;re already wearing 10 hats, it&apos;s easy to push marketing to the side.
                        </Typography>
                    </div>
                </div>
            </div>

        </SectionWrapper>
    )
}



export default TheProblem;