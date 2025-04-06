
"use client"
import { MotionDivProps } from '@/library/types/motion.types'
import React from 'react'
import { MotionDiv } from '../motion/MotionDiv'


interface FloatBoxWrapperProps extends MotionDivProps {
    children: React.ReactNode
}

const FloatBoxWrapper: React.FC<FloatBoxWrapperProps> = ({ children, ...props }) => {
    return (
        <MotionDiv
            {...props}
            className={`${props.className}`}
        >
            {children}
        </MotionDiv>
    )
}

export default FloatBoxWrapper