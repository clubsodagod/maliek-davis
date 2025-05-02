import React, { forwardRef } from 'react'
import { HTMLMotionProps } from 'framer-motion'
import { MotionDiv } from './motion/MotionDiv'

type PageTransitionProps = HTMLMotionProps<'div'>
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>

function PageTransition({ children, ...rest }: PageTransitionProps, ref: PageTransitionRef) {
    const initial = { opacity: 0 }
    const animate = { opacity: 1 }
    const exit = { opacity: 0 }

    const transition = { duration: 0.75, ease: 'easeInOut' }

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

export default forwardRef(PageTransition)