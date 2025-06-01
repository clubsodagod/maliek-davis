"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { List, ListItem, ListItemIcon, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { PlanningItem, ValueItem, valueTheyGet, whatIHelpYouWith } from '../../_library/copy.const';
import ComponentTransition from '@/components/layout/ComponentTransition';
import slugify from 'slugify';
import Image from 'next/image';
import { AnimatePresence } from 'motion/react';


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
                className='w-full sm:px-[12.5vw]  '
            >
                <MainHeroHeader
                    headerLabel={"The Shift"}
                    tagline={"Strategic Business Planning That Puts You in Control"}
                    size={!desktop ? "lg" : "lg"}
                    className=''
                    headerLabelClassName='text-right'
                    taglineClassName='text-right'

                />

                <div
                    className='relative -left-6'
                >
                    <div
                        className='relative w-screen sm:left-[-12.5vw] sm:px-[12.5vw]  mt-10  xl:pl-40'
                    >
                        <div
                            className='w-full flex  md:flex-row gap-12 items-end '
                        >
                            <div className='md:w-2/3  my-auto'>

                                <Typography variant='h4' color='secondary.dark' className="pb-6">
                                    What I Help You Plan:
                                </Typography>
                                <MotionDiv className=' gap-10  w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 px-6 '>

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
                                className='my-auto md:w-1/3 '
                            >
                                <div className=''>

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

            <div className='px-6 sm:px-[12.5vw] relative w-screen -left-6 mt-20  min-h-screen justify-center items-center flex flex-col gap-20'>

                <Typography variant='h2' color='primary.dark'>
                    What You Get:
                </Typography>
                <MotionDiv className='relative  flex flex-wrap justify-center items-center  md:px-30 pb-20  overflow-x-auto min-h-full  gap-20   w-full px-6'>

                    {
                        valueTheyGet.map((h, i) => {
                            return (
                                <MotionDiv
                                    key={`${h.title} ${i}`}
                                    className='w-full md:max-w-1/3'
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
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <ComponentTransition id={slugify(plan.title)}>
            <MotionDiv
                className="investment-card overflow-hidden rounded-4xl flex flex-col justify-between p-6 w-full py-10 cursor-pointer bg-(--background) transition-transform hover:scale-[1.01]"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "anticipate" }}
                style={{
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow: "1px -6px 8px #17171747",
                }}
                onClick={toggleExpand}
            >
                <Typography fontSize={{ sm: 24, lg: 36 }} component="div" variant="h4" className={`text-center text-lg font-semibold   ${expanded ? "glow-gradient-text" : "text-(--foreground)"}`}>
                    {plan.title}
                </Typography>

                <AnimatePresence>
                    {expanded && (
                        <MotionDiv
                            key="details"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{
                                type: "spring",
                                bounce: 0.4,
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                            className="mt-6 flex flex-col gap-4 items-center"
                        >
                            <Image
                                src={plan.photo}
                                alt={plan.title}
                                width={500}
                                height={500}
                                className="w-full max-w-sm rounded-xl shadow-md"
                            />
                            <ul className="list-disc pl-6 text-(--foreground) text-left">
                                {plan.bullets.map((point, index) => (
                                    <li key={index} className="text-base">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </MotionDiv>
        </ComponentTransition>
    );
};


const ValueCard: React.FC<{ plan: ValueItem }> = ({ plan }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <ComponentTransition id={slugify(plan.title)}>
            <MotionDiv
                className="investment-card overflow-hidden rounded-4xl flex flex-col justify-between p-6 w-full py-10 cursor-pointer bg-(--background) transition-transform hover:scale-[1.01]"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "anticipate" }}
                style={{
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow: "1px -6px 8px #17171747",
                }}
                onClick={toggleExpand}
            >
                <Typography
                    fontSize={{ sm: 24, lg: 36 }}
                    component="div"
                    variant="h4"
                    className={`text-center text-lg  font-semibold ${expanded ? "glow-gradient-text" : "text-(--foreground)"}`}
                >
                    {plan.icon ? `${plan.icon} ${plan.title}` : plan.title}
                </Typography>

                <AnimatePresence>
                    {expanded && (
                        <MotionDiv
                            key="details"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{
                                type: "spring",
                                bounce: 0.4,
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                            className="mt-6 flex flex-col gap-4 items-center"
                        >
                            <Image
                                src={plan.photo}
                                alt={plan.title}
                                width={500}
                                height={500}
                                className="w-full max-w-sm rounded-xl shadow-md"
                            />
                            <ul className="list-disc pl-6 text-(--foreground) text-left">
                                {plan.bullets.map((point, index) => (
                                    <li key={index} className="text-base">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </MotionDiv>
        </ComponentTransition>
    );
};


export default TheShift;