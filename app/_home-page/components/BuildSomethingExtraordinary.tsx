"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Box, Button } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import GeneralDynamicContact from '@/components/contact-forms/GeneralDynamicContactForm';
import { grey } from '@mui/material/colors';


const BuildSomethingExtraordinary = () => {

    const sectionRef = React.useRef(null);

    return (
        <SectionWrapper
            ref={sectionRef}
            id='lets-build-something-extraordinary-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >



            <MainHeroHeader
                headerLabel={"Let's Build Something Extraordinary"}
                tagline={"Vision Start with Alignment"}
                size={"lg"}
                className=''
            />
            <div
                className='w-full flex justify-evenly items-center '
            >
                        <Box
                            className='w-fit hidden xl:block max-h-full p-10 rounded-4xl '
                            sx={{
                                bgcolor: grey[900]
                            }}
                        >
                            <Image
                                alt="Technology Meets Strategy Hero Image of Maliek Davis looking to his left, your right."
                                src={"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_4_cu3yxd.png"}
                                width={9}
                                height={16}
                                sizes='100vw'
                                className='hidden xl:block w-[500px]'
                                style={{
                                    objectFit: 'cover',

                                }}
                            />
                        </Box>


                    <GeneralDynamicContact />

            </div>

            <MotionDiv
                className="w-full flex gap-3  z-50 "
            >
                <Button variant="contained" color='primary'>
                    Let&apos;s Connect
                </Button>

            </MotionDiv>









        </SectionWrapper>

    )
}



export default BuildSomethingExtraordinary;