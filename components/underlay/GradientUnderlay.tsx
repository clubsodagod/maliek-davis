"use client"

import React from 'react'
import { MotionDiv } from '../motion/MotionDiv';


const GradientUnderlay = () => {

    return (
        <>
            <MotionDiv
                className='gradient-blob'
            />
            <MotionDiv
                className='gradient-blob-reverse'
            />
            <MotionDiv
                className='noise-underlay-overlay'
            />
        </>


    )
}



export default GradientUnderlay;