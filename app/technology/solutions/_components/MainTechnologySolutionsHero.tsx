"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { MotionH4 } from '@/components/motion/MotionH4';
import { span } from 'motion/react-m';
import { programmerImg } from '@/library/image.cdn';
import useMediaQuery from '@mui/material/useMediaQuery';

const solutionTypes: string[] = [
    "Performance",
    "AI",
    "Security & Compliance",
    "Optimization",
    "Automation",
    "Integration",
    "Fractional CTO",
    "Scalability",
    "DevOps",
    "Cloud Infrastructure",
    "Data Engineering",
    "Clean Architecture",
    "Microservices",
    "Web3",
    "Machine Learning",
    "Startup MVP",
    "Digital Transformation",
    "Legacy Modernization",
    "Workflow Design",
    "Custom Software",
    "Personalization",
    "Product Strategy",
    "Testing & QA",
    "Analytics",
    "Realtime Systems",
    "APIs",
    "Code Auditing",
    "No-Code/Low-Code",
    "Platform Engineering"
];

const MainTechnologySolutionsHero = ({ }) => {

    const [solutionLabel, setSolutionLabel] = React.useState<string>(solutionTypes[0])


    const sectionRef = React.useRef(null);

    const welcomeToFutureCopy: string = "In today’s fast-paced world, technology isn’t just a tool—it’s the foundation of success. Whether you’re a CTO  scaling enterprise systems, an engineer optimizing performance, an entrepreneur launching a startup, or a business owner leveraging AI, I provide cutting-edge solutions that drive efficiency, innovation, and limitless growth.";

    const desktop = useMediaQuery(`(min-width:1100px)`);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setSolutionLabel((prevLabel) => {
                const currentIndex = solutionTypes.indexOf(prevLabel);
                const nextIndex = (currentIndex + 1) % solutionTypes.length;
                return solutionTypes[nextIndex];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <SectionWrapper
            ref={sectionRef}
            id='technology-solutions-main-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >
            <div 
                className='w-screen h-[15vh] absolute bottom-0 bg-black left-0 '
            />
            <Box component={MotionDiv}
                className='w-screen relative -left-6 px-6 pb-12 rounded-b-4xl flex flex-col gap-3'
                style={{
                    boxShadow: "1px 6px 8px  #17171747",
                }}
            >
                <MainHeroHeader
                    headerLabel={"Future-Driven Technology Solutions"}
                    tagline={"Scalable, Secure, and Intelligent Technology for Growth & Innovation"}
                    size={"lg"}
                />

                <div
                    className='w-full relative 2xl:pl-[20vw]'
                >
                    <div>
                        <Box
                            sx={{
                                bgcolor: "#000"
                            }}
                            component={MotionDiv}
                            className='w-[400px] h-[350px] md:h-[400px] landscape:xl:h-[450px] landscape:2xl:h-[600px]  landscape:w-[550px] landscape:2xl:w-[1000px] 2xl:h-[600px]  rounded-4xl float-left ml-4 mb-4 absolute left-[200px] md:left-[800px] 2xl:left-[1200px] top-0'
                        />
                        <Box
                            sx={{
                                bgcolor: "#000"
                            }}
                            component={MotionDiv}
                            className='w-[200px] md:w-[400px] landscape:xl:w-[550px] landscape:xl:h-[450px] landscape:2xl:h-[600px] 2xl:w-[800px] h-[350px] md:h-[400px] 2xl:h-[600px]  landscape:2xl:w-[1000px] rounded-4xl float-left ml-4  mb-4'
                            style={{
                                shapeOutside: "content-box",
                                shapeMargin: "25px",
                                clipPath: "inset(0 0 0 0)",
                                float: "right"
                            }}
                        >
                            <Image
                                alt={"Maliek Davis Future of technology image"}
                                src={programmerImg}
                                sizes='100vw' width={9} height={16}
                                style={{
                                    objectFit: "cover",
                                }}
                                className='w-[100%] h-[100%] rounded-4xl  2xl:w-[100vw] '
                            />
                        </Box>
                    </div>

                    <div className='w-full h-40' />
                    <Typography component={MotionDiv} variant={desktop ? "h4" : "subtitle1"} fontWeight={"bold"}
                    color='secondary.light'
                        className=''
                    >
                        Welcome to the Future of Technology
                    </Typography>
                    <Typography component={MotionDiv} variant={desktop ? "subtitle1" : "body1"}
                        className=''
                    >
                        {welcomeToFutureCopy}
                    </Typography>
                </div>

                <Link href={`/contact#consultation-section`}>
                    <Button variant='contained'>
                        Schedule Consultation
                    </Button>
                </Link>
            </Box>
            <Box component={MotionDiv}
                className='w-screen relative -left-6  flex flex-col gap-3 bg-black min-h-[24vh]  justify-center items-center'
                style={{
                    // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)",
                }}
            >
                <Typography
                    component={MotionH4}
                    variant='h4'
                    className='text-center'
                    color='secondary.light'
                >
                    {solutionLabel} <Typography color='#fafafa' component={span} variant='h4' fontWeight={200}>Solutions.</Typography>
                </Typography>
            </Box>
        </SectionWrapper>
    )
}



export default MainTechnologySolutionsHero;