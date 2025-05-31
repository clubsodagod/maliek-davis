"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { List, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import React from 'react'


const ForgettableSmallBusinesses = ({ }) => {

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
                className='w-full xl:px-[12.5vw]  flex flex-col justify-center grow'
            >
                <MainHeroHeader
                    headerLabel={"You're Only Small because You're Forgettable"}
                    headerLabelClassName='text-center'
                    tagline={""}
                    taglineClassName='text-center'
                    size={!desktop ? "md" : "lg"}
                    className=''
                />

                <div
                    className=" mt-10 text-center"
                >
                    <Typography variant="subtitle1" fontSize={24}>
                        In today&apos;s market, being “the best-kept secret” doesn&apos;t pay the bills.
                        You need to look, sound, and show up like a leader in your niche — even if you&apos;re just getting started.
                    </Typography>
                </div>


                <div
                    className='w-full  flex flex-col text-center mt-10'
                >

                    <Typography variant="subtitle1" fontSize={36} fontWeight={"bold"}>
                        I help small business owners craft brands that:
                    </Typography>

                    <div
                        className='text-center w-fit mx-auto'
                    >
                        <List
                            sx={{textAlign:"center"}}
                        >
                            <ListItem
                                className='text-center'
                            >
                                <ListItemIcon>
                                    <ScatterPlotIcon className='color-(--foreground)' />
                                </ListItemIcon>
                                <ListItemText>
                                    Stand out in crowded markets
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ScatterPlotIcon className='color-(--foreground)' />
                                </ListItemIcon>
                                <ListItemText>
                                    Build instant trust and recognition
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ScatterPlotIcon className='color-(--foreground)' />
                                </ListItemIcon>
                                <ListItemText>
                                    Attract premium customers who value quality over price
                                </ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </div>

            </div>



        </SectionWrapper>
    )
}



export default ForgettableSmallBusinesses;