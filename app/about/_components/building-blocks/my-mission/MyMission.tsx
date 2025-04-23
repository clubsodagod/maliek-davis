/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { missionCopy } from '@/app/about/_library/copy.const';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Typography, useMediaQuery, Button, Paper } from '@mui/material';
import Image from 'next/image';
import React from 'react'


const MyMission = ({ }) => {
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? "xl" : tabletXL ? undefined : tablet ? undefined : mobile ? "xl" : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);

    const [open, setOpen] = React.useState<boolean>(false);

    return (

        <Paper
            sx={{
                bgcolor: "black",
            }}
        >
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
                        headerLabel={'My Mission: Innovation That Elevates'}
                        tagline={""}
                        size={headerSize}
                        center='md:text-center'
                    />
                </div>

                <MotionDiv
                    className={`w-full flex justify-center `}
                >
                    <Image
                        src={"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586750/Convert_to_PNG_project_24_x4dkwa.png"} alt={'This is a picture representing my nissing.'}
                        sizes="100vw" width={250} height={250}
                        className={`object-contain w-[250px] h-[250px]`}
                    />
                </MotionDiv>


                <div
                    className=' md:px-30 lg:px-40 md:text-center'
                >
                    <Typography variant="h4"
                        color='secondary.dark'
                    >
                        At the heart of everything I do is a simple mission:
                    </Typography>
                </div>


                <div className="w-full px-4 sm:px-8 md:px-50 lg:px-70 2xl:px-120 py-16 space-y-16 text-gray-100">

                    {/* First Block - Image Right, Text Left */}
                    <div className="overflow-hidden">
                        <div className="w-full">
                            <div className="float-right ml-6 mb-4">
                                <Image
                                    src="https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_4_cu3yxd.png"
                                    alt="Mission 1"
                                    width={200}
                                    height={200}
                                    className="rounded-4xl shadow-lg object-contain"
                                />
                            </div>
                            <p className="text-lg pt-20">
                                To leverage technology and finance to create innovative solutions that enhance efficiency, wealth-building, and the quality of life.
                            </p>
                        </div>
                    </div>

                    {/* Second Block - Image Left, Text Right */}
                    <div className="overflow-hidden">
                        <div className="w-full">
                            <div className="float-left mr-6 mb-4">
                                <Image
                                    src="https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586765/Convert_to_PNG_project_6_l6ne1h.png"
                                    alt="Mission 2"
                                    width={200}
                                    height={200}
                                    className="rounded-4xl shadow-lg object-contain"
                                />
                            </div>
                            <p className="text-lg text-right">
                                This means building systems that empower ambitious professionals, investors, and entrepreneurs to make smarter decisions with better tools—whether in software development, real estate investing, or business strategy.
                            </p>
                        </div>
                    </div>

                </div>


                <div
                    className='w-screen absolute left-0 bg-black h-[6vh] bottom-0'
                />
            </SectionWrapper>
        </Paper>

    )
}



export default MyMission;