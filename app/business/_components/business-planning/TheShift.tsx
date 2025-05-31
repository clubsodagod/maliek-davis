"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { List, ListItem, ListItemIcon, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { PlanningItem, ValueItem, valueTheyGet, whatIHelpYouWith } from '../../_library/copy.const';
import ComponentTransition from '@/components/layout/ComponentTransition';
import slugify from 'slugify';


const TheShift = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='business-planning-the-shift-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >

            <div
                className='w-full xl:px-[12.5vw] '
            >
                <MainHeroHeader
                    headerLabel={"The Shift"}
                    tagline={"Strategic Business Planning That Puts You in Control"}
                    size={!desktop ? "md" : "lg"}
                    className=''
                    headerLabelClassName='text-right'
                    taglineClassName='text-right'

                />

                <div
                    className='relative -left-6'
                >
                    <div
                        className='relative w-screen left-[-12.5vw]  mt-10 px-6 xl:pl-40'
                    >
                        <div
                            className='w-full flex flex-col md:flex-row gap-12 items-end'
                        >
                            <div className='w-1/3'>

                                <Typography variant='h4' color='primary.dark'>
                                    What I Help You Plan:
                                </Typography>
                                <MotionDiv className='flex flex-col gap-10 px-6 w-full'>

                                    {
                                        whatIHelpYouWith.map((h, i) => {
                                            return (
                                                <MotionDiv
                                                    key={`${h.title} ${i}`}
                                                >
                                                    <PlanCard plan={h} />
                                                </MotionDiv>
                                            )
                                        })
                                    }

                                </MotionDiv>
                            </div>
                            <MotionDiv
                                className='my-auto w-2/3 '
                            >
                                <div className='pl-40'>

                                    <List

                                    >
                                        <ListItem>
                                            <Typography
                                                fontSize={"1.25em"}
                                                variant="subtitle1"
                                                className=" w-full "
                                            >
                                                I&apos;ll help you build a <strong>clear, actionable plan</strong> that ties everything together:
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <ScatterPlotIcon />
                                            </ListItemIcon>
                                            <Typography variant="subtitle1" >
                                                Brand
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <ScatterPlotIcon />
                                            </ListItemIcon>
                                            <Typography variant="subtitle1" >
                                                Digital Presence
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <ScatterPlotIcon />
                                            </ListItemIcon>
                                            <Typography variant="subtitle1" >
                                                Automation Systems
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <ScatterPlotIcon />
                                            </ListItemIcon>
                                            <Typography variant="subtitle1" >
                                                Marketing & Growth Engines
                                            </Typography>
                                        </ListItem>

                                    </List>
                                    <List

                                    >
                                        <ListItem>
                                            <Typography
                                                fontSize={"1.25em"}
                                                variant="subtitle1"
                                                className=" w-full "
                                            >
                                                So instead of asking, <span style={{ fontWeight: "200" }} className='italic underline  '>“What should I be doing?”</span>, you’ll know exactly:
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <ScatterPlotIcon />
                                            </ListItemIcon>
                                            <Typography variant="subtitle1" >
                                                Your Business Direction
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <ScatterPlotIcon />
                                            </ListItemIcon>
                                            <Typography variant="subtitle1" >
                                                How You&apos;re getting there
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <ScatterPlotIcon />
                                            </ListItemIcon>
                                            <Typography variant="subtitle1" >
                                                What to focus on each week to hit your goals
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </div>

                            </MotionDiv>
                        </div>
                    </div>
                </div>

            </div>

                    <div className='relative w-screen -left-6 mt-20 min-h-screen h-screen justify-center items-center flex flex-col gap-20'>

                        <Typography variant='h2' color='primary.dark'>
                            What You Get:
                        </Typography>
                        <MotionDiv className='relative w-scren flex flex-col lg:flex-row gap-20 px-30 pb-20 w-full overflow-x-auto h-fit overflow-y-hidden'>

                            {
                                valueTheyGet.map((h, i) => {
                                    return (
                                        <MotionDiv
                                            key={`${h.title} ${i}`}
                                            className='w-full md:min-w-[300px]'
                                        >
                                            <ValueCard plan={h} />
                                        </MotionDiv>
                                    )
                                })
                            }

                        </MotionDiv>
                    </div>

        </SectionWrapper>
    )
}


const PlanCard: React.FC<{ plan: PlanningItem }> = ({ plan }) => {

    return (
        <ComponentTransition
            id={slugify(plan.title)}
        >
            <MotionDiv
                className="investment-card overflow-hidden rounded-t-4xl md:rounded-4xl flex flex-col justify-between p-6 w-full min-w-full  py-10 cursor-pointer bg-(--background)  transition-transform hover:scale-[1.01]"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "anticipate" }}
                style={{
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow: "1px -6px 8px #17171747",
                }}>

                <Typography component="div" variant="h4" className="text-lg font-semibold text-(--foreground)">
                    {plan.title}
                </Typography>
            </MotionDiv>
        </ComponentTransition>
    )
}
const ValueCard: React.FC<{ plan: ValueItem }> = ({ plan }) => {

    return (
        <ComponentTransition
            id={slugify(plan.title)}
        >
            <MotionDiv
                className="investment-card overflow-hidden rounded-t-4xl md:rounded-4xl flex flex-col justify-between p-6 w-full min-w-full  py-10 cursor-pointer bg-(--background)  transition-transform hover:scale-[1.01]"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "anticipate" }}
                style={{
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow: "1px -6px 8px #17171747",
                }}>

                <Typography component="div" variant="h4" className="text-lg font-semibold text-(--foreground)">
                    {plan.title}
                </Typography>
            </MotionDiv>
        </ComponentTransition>
    )
}


export default TheShift;