"use client"
import { MotionDivProps } from '@/library/types/motion.types';
import { AnimatePresence } from 'motion/react'
import React from 'react'
import PageTransition from '../layout/PageTransition';
import { useSectionObserver } from '@/utility/hooks/UseSectionObserver';

interface SectionWrapperProps extends MotionDivProps {
    children: React.ReactNode
    pb?:string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
    children,
    pb,
    ...props
}) => {

    const id = props.id ? props.id : '';
    useSectionObserver(0.6)
    return (
        <AnimatePresence
            key={id}
        >
            <PageTransition
                    {...props}
                className={`min-h-screen w-full  flex flex-col gap-12 px-6 2xl:px-40 pt-[12vh] md:pt-[75px] ${pb?pb:'pb-[6vh]'} relative  overflow-y-visible justify-between overflow-x-clip`}
            >
                    {children}
            </PageTransition>

        </AnimatePresence>

    )
}

export default SectionWrapper