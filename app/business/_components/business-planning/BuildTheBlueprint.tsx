"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import React from 'react'


const BuildTheBlueprint = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='business-planning-build-blueprint-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >


            <div
                className='w-full xl:px-[12.5vw]  grow flex flex-col justify-center items-center gap-10'
            >
                <MainHeroHeader
                    headerLabel={"Let's Build the Blueprint"}
                    tagline={""}
                    size={!desktop ? "md" : "lg"}
                    className=''
                    headerLabelClassName='text-center'
                    taglineClassName='text-right'

                />

                <Typography variant="subtitle1" fontSize={40}>
                    I help small business owners create the kind of strategic clarity that big brands pay millions for. You&apos;ll walk away with a plan — not just ideas.
                </Typography>

                <MotionDiv className="flex gap-6">
                    <Button LinkComponent={Link} variant="contained">
                        👉 Start My Strategic Plan
                    </Button>
                </MotionDiv>
            </div>
        </SectionWrapper>
    )
}



export default BuildTheBlueprint;