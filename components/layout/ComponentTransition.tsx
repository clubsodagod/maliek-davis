import React, { forwardRef } from 'react'
import { HTMLMotionProps } from 'framer-motion'
import { MotionDiv } from '../motion/MotionDiv'

type ComponentTransitionProps = HTMLMotionProps<'div'>
type ComponentTransitionRef = React.ForwardedRef<HTMLDivElement>

function ComponentTransition({ children, ...rest }: ComponentTransitionProps, ref: ComponentTransitionRef) {
    const initial = { opacity: 0 }
    const animate = { opacity: 1 }
    const exit = { opacity: 0 }

    const transition = { duration: 0.3, ease: 'easeInOut' }
    
    return (
        <MotionDiv
            ref={ref}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
            {...rest}
        >
            {children}
        </MotionDiv>
    )
}

export default forwardRef(ComponentTransition)