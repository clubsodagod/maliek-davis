"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Typography, useMediaQuery } from '@mui/material';
import React from 'react'


const WhatIsABrand = ({ }) => {

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
                className='w-full sm:px-[12.5vw] grow flex flex-col justify-center'
            >
                <MainHeroHeader
                    headerLabel={"What Is a Brand — And Why Does It Matter?"}
                    headerLabelClassName='text-right'
                    tagline={""}
                    taglineClassName='text-right'
                    size={!desktop ? "md" : "lg"}
                    className=''
                />
                <div
                    className='lg:pl-50'
                >
                    <Typography variant="subtitle1"
                        fontSize={30}
                        className="text-right"
                    >
                        Your brand isn&apos;t just your logo or your colors. It&apos;s the <span className="italic">feeling</span> people get when they hear your name. It&apos;s the reputation you build, the promise you deliver, and the value you stand for.

                        Whether you&apos;re selling candles, coaching, real estate, or coffee — <strong>your brand is what makes people trust, choose, and remember you.</strong>
                    </Typography>
                </div>

                <div
                    className='lg:pr-50 mt-20 flex flex-col'
                >
                    <Typography variant="h2"
                        fontSize={30}
                        className=""
                    >
                        <strong>brand</strong> <span className='font-light'>/ brænd /</span>
                    </Typography>
                    <Typography variant="body1"
                        fontSize={30}
                        className=""
                    >
                        <span className='text-gray-600'>Noun:</span> <span className='font-light'>A &quot;brand&quot; is a distinctive element, like a name, symbol, or design, used to identify goods or services. It&apos;s more than just a name; it encompasses the overall image, perception, and emotional connection a company cultivates in the minds of consumers. Brands communicate a product&apos;s qualities and are crucial for differentiating a company from its competitors.</span>
                    </Typography>
                </div>

                <div
                    className='lg:px-20 mt-50 flex flex-col'
                >
                    <Typography variant="h2"
                        fontWeight={100}
                        className="text-center"
                    >
                        Brand <strong>=</strong> Perception
                    </Typography>
                    <div
                        className='lg:px-40 text-center'
                    >
                        <Typography variant="caption"
                            fontSize={24}
                            fontWeight={100}
                            className="text-center  italic"
                        >
                            🧠 <br/> And perception dertermines value. It&apos;d be wise to remember.
                        </Typography>
                    </div>

                </div>

            </div>



        </SectionWrapper>
    )
}



export default WhatIsABrand;

// A "brand" is a distinctive element, like a name, symbol, or design, used to identify goods or services. It's more than just a name; it encompasses the overall image, perception, and emotional connection a company cultivates in the minds of consumers. Brands communicate a product's qualities and are crucial for differentiating a company from its competitors. 