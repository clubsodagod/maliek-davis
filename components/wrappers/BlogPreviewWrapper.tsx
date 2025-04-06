"use client"

import React from 'react'
import ComponentTransition from '../layout/ComponentTransition'
import { MotionDiv } from '../motion/MotionDiv'
import { MotionDivProps } from '@/library/types/motion.types'

interface BlogPreviewWrapperProps extends MotionDivProps {
    children:React.ReactNode
}

const BlogPreviewWrapper: React.FC<BlogPreviewWrapperProps> = ({
    children,
    ...props
}) => {

    return (
        <ComponentTransition>
            <MotionDiv
                {...props}
            >
                {children}
            </MotionDiv>
            
        </ComponentTransition>
    )
}



export default BlogPreviewWrapper;