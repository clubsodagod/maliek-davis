"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React from 'react'
import Image from 'next/image';
import { Button, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';



const mainHeroBenefits: { label: string, photo: string }[] = [
    {
        label: 'Increase Performance & Scalability',
        photo: 'https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586752/Convert_to_PNG_project_11_tojbmw.png'
    },
    {
        label: 'Leverage AI & Automation',
        photo: 'https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_4_cu3yxd.png'
    },
    {
        label: 'Future-Proof Your Business',
        photo: 'https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586765/Convert_to_PNG_project_8_grrrui.png'
    },
]


const MainTechnologyHero = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='main-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >
            {/* <div className='w-full grow' /> */}


            <div
                className='w-full px-[12.5vw] xl:mt-10 '
            >
                <MainHeroHeader
                    headerLabel={"The Future is Now: Build Scalable, Intelligent, and Secure Technology That Grows With You"}
                    tagline={"Transform your business with cutting-edge AI, automation, and scalable architectures—trusted by startups enterprises, and innovators."}
                    size={!desktop ? "md" : "lg"}
                    className=''
                    center={"text-center "}
                />

                <div
                    className='w-full flex gap-12 sm:min-h-[45vh]'
                >
                    {/* <div
                        className='w-full flex justify-center xl:justify-end grow xl:flex-1/2 2xl:flex-1/5'
                    >
                        <Image
                            alt="Main hero Image of Maliek Davis"
                            src={"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1743261375/b3xtgxprmoq2gczwgkug_jcuovs.webp"}
                            width={9}
                            height={16}
                            sizes='100vw'
                            className='hidden md:block portrait:w-[50%] landscape:w-[24%] landscape:xl:w-[100%] '
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                height: '100%',
                            }}
                        />
                    </div> */}

                    <div
                        className='hidden landscape:xl xl:flex flex-col gap-6 items-center grow justify-end ' 
                    >
                        <MotionDiv
                            className='w-full flex gap-12 mt-12  justify-between '
                        >

                            {
                                mainHeroBenefits.map((b, i) => (
                                    <MotionDiv
                                        key={`${b.label} ${i}`}
                                        className='flex-1/3 flex flex-col justify-center items-center'
                                    >
                                        <Image
                                            alt={b.label}
                                            src={b.photo}
                                            sizes='100vw'
                                            width={9}
                                            height={16}
                                            style={{
                                                objectFit: "contain",
                                            }}
                                            className='w-full md:w-[200px] md:landscape:w-[150px]'
                                        />
                                        <Typography variant='caption' fontWeight={'bold'} className='text-center w-full'>
                                            {b.label}
                                        </Typography>
                                    </MotionDiv>
                                ))
                            }

                        </MotionDiv>
                        <Button variant='contained'
                        href='/contact'
                            className=''
                        >
                            Schedule Your Strategy Call
                        </Button>
                    </div>
                </div>

            </div>

            <MotionDiv
                className='w-full flex gap-12 xl:hidden'
            >

                {
                    mainHeroBenefits.map((b, i) => (
                        <MotionDiv
                            key={`${b.label} ${i}`}
                            className='flex-1/3 flex flex-col justify-center items-center'
                        >
                            <Image
                                alt={b.label}
                                src={b.photo}
                                sizes='100vw'
                                width={9}
                                height={16}
                                style={{
                                    objectFit: "contain",
                                }}
                                className='w-full md:w-[200px] md:landscape:w-[150px]'
                            />
                            <Typography variant='caption' fontWeight={'bold'} className='text-center w-full'>
                                {b.label}
                            </Typography>
                        </MotionDiv>
                    ))
                }

            </MotionDiv>

            <div
                className='xl:hidden w-full'
            >
                <Button variant='contained'
                    className='md:w-1/3 md:mx-auto '
                >
                    Schedule Your Strategy Call
                </Button>
            </div>

        </SectionWrapper>
    )
}



export default MainTechnologyHero;