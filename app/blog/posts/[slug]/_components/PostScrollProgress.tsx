'use client'


import { MotionDiv } from '@/components/motion/MotionDiv';
import { cyan } from '@mui/material/colors';
import { useScroll } from 'motion/react'
import React from 'react'

const PostScrollProgress = () => {

    const { scrollYProgress } = useScroll();

    return (
        <div
            className='flex justify-start items-start w-full'
        >
            <MotionDiv style={{
                scaleX: scrollYProgress, backgroundColor: cyan[300],
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: 10,
                originX: 0,
                zIndex: 2000,
            }}
            />
        </div>

    )
}

export default PostScrollProgress