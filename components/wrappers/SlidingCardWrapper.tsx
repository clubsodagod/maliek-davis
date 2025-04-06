"use client"
import React from 'react'
import { MotionDiv } from '../motion/MotionDiv'
import { MotionDivProps } from '@/library/types/motion.types';
import ComponentTransition from '../layout/ComponentTransition';

interface SlidingCardWrapperProps extends MotionDivProps {
    children: React.ReactNode;
}

const SlidingCardWrapper: React.FC<SlidingCardWrapperProps> = ({
    children,
    ...props
}) => {

    const slidingCardRef = React.useRef(null);

    return (
        <ComponentTransition>
            <MotionDiv
                ref={slidingCardRef}
                className='sliding-card-wrapper relative'
                {...props}
            >
                {children}
            </MotionDiv>
        </ComponentTransition>

    )
}

export default SlidingCardWrapper