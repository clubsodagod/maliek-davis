"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery, List, ListSubheader, Typography, ListItem, ListItemIcon } from '@mui/material';
import Image from 'next/image';
import React from 'react'
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
                    headerLabel={"Woes of the One Man Army"}
                    headerLabelClassName='text-center'
                    tagline={""}
                    size={!desktop ? "md" : "xl"}
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

                            >
                                <ListSubheader
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
                                        You&apos;re juggling too much:
                                    </Typography>

                                </ListSubheader>
                                <ListItem>

                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <ScatterPlotIcon className="color-[--foreground]" />
                                    </ListItemIcon>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        Manually replying to every customer message
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
                                        Copying and pasting between platforms
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
                                        Forgetting follow-ups that cost you money
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
                                        Spending hours doing tasks AI could finish in seconds
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
                            className={"italic text-center"}
                        >
                            You&apos;re not burned out because your business is too big — you&apos;re burned out because your systems are too small.
                        </Typography>
                    </div>
                </div>
            </div>

        </SectionWrapper>
    )
}



export default TheProblem;