"use client"

import { MotionDiv } from '@/components/motion/MotionDiv';
import { Typography } from '@mui/material';
import React from 'react'

const marqueeVariants = {
    animate: {
        x: [0, -1035],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
            },
        },
    },
};

const PrinciplesMarquee = ({ }) => {

    return (
        <div
        className='w-screen min-h-20 relative '
        >
            <div className="marquee ">
                {/* 3. Using framer motion */}
                <MotionDiv
                    className="track"
                    variants={marqueeVariants}
                    animate="animate"
                >
                <Typography variant='h4' color='secondary.light'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performance & Scalability. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performance & Scalability. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performance & Scalability. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performance & Scalability. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performance & Scalability. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performance & Scalability. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performance & Scalability. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performance & Scalability. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performance & Scalability. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
                    <Typography variant='h4' color='primary.light'>
                    Clean Maintainable, & Secure Code.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Clean Maintainable, & Secure Code.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Clean Maintainable, & Secure Code.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Clean Maintainable, & Secure Code.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Clean Maintainable, & Secure Code.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Clean Maintainable, & Secure Code.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Clean Maintainable, & Secure Code.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Clean Maintainable, & Secure Code.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    </Typography>
                    <Typography variant='h4' color='secondary.light'>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI & Automation as Force Multipliers.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI & Automation as Force Multipliers.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI & Automation as Force Multipliers.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI & Automation as Force Multipliers.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI & Automation as Force Multipliers.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI & Automation as Force Multipliers.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI & Automation as Force Multipliers.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI & Automation as Force Multipliers.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Typography>
                    <Typography variant='h4' color='primary.light'>
                    Ethical, Human-Centered Design.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ethical, Human-Centered Design.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ethical, Human-Centered Design.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ethical, Human-Centered Design.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ethical, Human-Centered Design.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ethical, Human-Centered Design.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ethical, Human-Centered Design.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ethical, Human-Centered Design.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Typography>
                </MotionDiv>
            </div>
        </div>
    )
}



export default PrinciplesMarquee;