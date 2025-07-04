/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'


const RealEstateMainHero = ({ }) => {

    const sectionRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <SectionWrapper
                id='investments-real-estate-main-section'
                ref={sectionRef}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
            >

                <MainHeroHeader
                    headerLabel={'Real Estate Investments: Unlocking High-Value Opportunities'}
                    tagline={'Strategic Investments. Scalable Growth. Long-Term Investments.'}
                    size='md'
                />
                <div className="flex flex-col md:flex-row items-center md:items-center gap-6 w-full grow ">
                    {/* Image Section */}
                    <MotionDiv className="w-full md:w-1/2 flex justify-center">
                        <Image
                            alt="Unlocking Investments"
                            src="https://res.cloudinary.com/dyfhsjtwo/image/upload/v1744997256/unlocking-investments_vbiofk.webp"
                            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 30vw"
                            width={250} height={250}
                            className="rounded-4xl shadow-md object-cover w-full h-auto max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-3/4 "
                        />

                    </MotionDiv>

                    {/* Text + Buttons Section */}
                    <MotionDiv className="w-full md:w-1/2 flex flex-col gap-6 pr-0 sm:pr-4 md:pr-8 lg:pr-12 xl:pr-60">
                        <Typography variant="body1">
                            I specialize in identifying underperforming, high-potential real estate assets and transforming them into profitable investments. Whether through multifamily acquisitions, distressed asset recovery, rental property growth, or strategic wholesaling, my approach ensures investors achieve high returns, cash flow stability, and long-term equity-growth.
                        </Typography>

                        <div className="flex gap-6 pt-2">
                            <MotionDiv>
                                <Button variant="contained" color="primary">
                                    <Link href="/investor-profile">
                                        Investment Criteria
                                    </Link>
                                </Button>
                            </MotionDiv>
                            <MotionDiv>
                                <Button variant="outlined" color="primary">
                                    <Link href="/schedule-call">
                                        Let&apos;s Talk
                                    </Link>
                                </Button>
                            </MotionDiv>
                        </div>
                    </MotionDiv>

                </div>



            </SectionWrapper>
        </>

    )
}



export default RealEstateMainHero;