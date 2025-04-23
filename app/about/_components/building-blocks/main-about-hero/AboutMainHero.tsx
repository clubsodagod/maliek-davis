/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Typography, useMediaQuery, Button } from '@mui/material';
import React from 'react'


const AboutMainHero = ({ }) => {
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "xl" : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);

    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <SectionWrapper
            id='main-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <div
                className='md:px-20'
            >
                <MainHeroHeader
                    headerLabel={'About Maliek Davis'}
                    tagline={"Innovating at the Intersection of Technology, Finance, and Entrepreneurship."}
                    size={headerSize}
                />
            </div>

            <div
                className='md:px-40 2xl:px-100'
            >
                <MotionDiv
                    className={`md:text-center grow flex flex-col justify-center items-center ${open && "pb-6"} relative ${!open && "-bottom-30 md:-bottom-50"} `}
                >
                    <Typography variant="subtitle1" fontWeight={700}
                        color='secondary.dark'
                        fontSize={
                            desktop ? "1.25rem" :        // 20px
                            tabletXL ? "2.25rem" :      // 18px
                            tablet ? "2rem" :            // 16px
                            mobile ? "0.95rem" :         // Slightly smaller for mobile
                            "1rem"
                        }
                    >
                        My Journey: From Code to Capital
                    </Typography>
                    <Typography variant="body1"
                        className={`${open ? "" : "line-clamp-[10]"}`}
                        fontSize={
                            desktop ? "2rem" :        // 20px
                            tabletXL ? "2rem" :      // 18px
                            tablet ? "1.75rem" :            // 16px
                            mobile ? "0.95rem" :         // Slightly smaller for mobile
                            "1rem"
                        }
                    >
                        I’ve always been drawn to how systems work—whether in software, finance, or business. My journey started with a deep curiosity about technology and its ability to transform industries. I taught myself to code, driven by an analytical mindset and an ability to break down complex problems into elegant solutions.
                        <br /><br />
                        That passion led me to software engineering, where I refined my skills in clean architecture, systems design, and automation, ensuring that every line of code serves a purpose. But I didn&apos;t stop at technology—I saw the power of financial strategy and how it shapes industries and personal wealth. This realization sparked my deep dive into real estate investing, where I apply my technical expertise to analyze, optimize, and execute high-impact investment strategies.
                        <br /><br />
                        Today, I operate at the crossroads of technology, finance, and entrepreneurship, helping professionals and investors navigate opportunities that drive value, efficiency, and financial growth.
                    </Typography>
                </MotionDiv>
            </div>


            <>
                <div
                    className="w-screen py-12 relative -left-6 flex gap-6 justify-center items-center md:h-[25vh]"
                    style={{
                        background: 'linear-gradient(to top, black, transparent)',
                    }}
                >
                    <Button variant="contained">
                        My Mission
                    </Button>
                    <Button variant="outlined"
                        onClick={() => { setOpen(!open) }}
                    >
                        {open ? "Close" : "More"}
                    </Button>
                </div>
            </>

            <div
                className='w-screen absolute left-0 bg-black h-[6vh] bottom-0'
            />
        </SectionWrapper>
    )
}



export default AboutMainHero;