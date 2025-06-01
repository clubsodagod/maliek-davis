"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { List, ListItem, ListSubheader, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react'


const PainPoints = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='digital-presence-the-problem'
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
                    headerLabel={"The Pains of Weak Presence"}
                    tagline={""}
                    size={!desktop ? "md" : "xl"}
                    className=''
                />

                <div
                    className='w-full px-[3vw] mt-10'
                >
                    <div
                        className='w-full flex flex-col md:flex-row gap-12 items-end'
                    >
                        <MotionDiv
                            className='my-auto '
                        >
                            <List

                            >
                                <ListSubheader
                                    sx={{
                                        bgcolor:"transparent",
                                    }}
                                className=''
                                
                                >
                                    <Typography
                                    variant="subtitle1"
                                    fontWeight={"bold"}
                                    fontSize={32}
                                        className=""
                                    >
                                        Sounds familiar?
                                    </Typography>
                                    
                                </ListSubheader>
                                <ListItem>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        &quot;I have a website… but it barely gets traffic.&quot;
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        &quot;My business shows up after my competitors on Google.&quot;
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        fontSize={"1.2em"}
                                        variant="subtitle1"
                                        className="text-center w-full"
                                    >
                                        &quot;People click — but they don&apos;t convert.&quot;
                                    </Typography>

                                </ListItem>

                            </List>

                            <Typography variant="h6">
                                You&apos;re not alone. Most small businesses are stuck with outdated websites, zero strategy, and no real digital footprint. But here&apos;s the truth:
                            </Typography>
                        </MotionDiv>

                        <MotionDiv className='mx-auto'>

                            <Image
                                alt='technology-solutions-cta-image'
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
                                Your digital presence is your most valuable real estate — and most of it is underdeveloped.
                            </Typography>
                        </div>
                </div>
            </div>

        </SectionWrapper>
    )
}



export default PainPoints;