"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { List, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import Image from 'next/image';
import { investorImg } from '@/library/image.cdn';
import DynamicBusinessLeadCaptureModule from '../form/DynamicBusinessLeadCaptureModule';


const BrandLikeABossCTA = ({ }) => {

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
                className='w-full sm:px-[12.5vw]  grow flex flex-col justify-center items-center gap-10'
            >
                <MainHeroHeader
                    headerLabel={"It's Time to Brand Like a Boss"}
                    headerLabelClassName='text-center'
                    tagline={""}
                    taglineClassName='text-center'
                    size={!desktop ? "lg" : "lg"}
                    className=''
                />


                <div
                    className='flex flex-col md:flex-row gap-20 mt-10 '
                >

                    <div
                        className='mx-auto mt-10 flex  flex-col sm:flex-row xl:flex-col gap-10 items-center xl:w-1/2'
                    >
                        <div className="relative w-full   h-[400px] sm:h-fit rounded-4xl overflow-hidden  ">
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
                            className=" text-center sm:w-full  sm:my-auto xl:my-0 "
                        >
                            <div
                                className='w-full'
                            >
                                <List
                                className="text-center min-w-full"
                            >
                                <ListItem>
                                    <ListItemIcon>
                                        <ScatterPlotIcon className='color-(--foreground)' />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Ready to stop blending in?
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <ScatterPlotIcon className='color-(--foreground)' />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Want to charge more and get more customers?
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <ScatterPlotIcon className='color-(--foreground)' />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Need to finally look like the expert you are?
                                    </ListItemText>
                                </ListItem>
                            </List>
                            </div>
                            
                        </div>

                    </div>

                        <DynamicBusinessLeadCaptureModule formType='branding' />

                    
                </div>

                <div
                    className='mx-auto mt-10'
                >
                    <Typography variant="subtitle1">
                        👉 Let&apos;s build your brand strategy — and make your business <span className='italic'>unmissable</span>.
                    </Typography>
                </div>
            </div>



        </SectionWrapper>
    )
}



export default BrandLikeABossCTA;