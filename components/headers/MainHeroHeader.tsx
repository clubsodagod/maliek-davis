"use client"

import { Typography } from '@mui/material'
import React from 'react'
import { MotionDivProps } from '@/library/types/motion.types'
import { MotionDiv } from '../motion/MotionDiv'
import ComponentTransition from '../layout/ComponentTransition'

interface MainHeroHeaderProps extends MotionDivProps {
    headerLabel: string
    tagline: string | React.ReactNode
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    center?: string
    taglineClassName?: string
    headerLabelClassName?: string
}

const MainHeroHeader: React.FC<MainHeroHeaderProps> = ({
    headerLabel,
    tagline,
    size,
    center,
    taglineClassName,
    headerLabelClassName,
    initial,
    animate,
    exit,
    transition,
    variants,
    ...props
}) => {
    const variant = () => {
        switch (size) {
            case 'xs': return 'h6';
            case 'sm': return 'h5';
            case 'md': return 'h4';
            case 'lg': return 'h3';
            case 'xl': return 'h2';
            default: return 'h1';
        }
    };

    const id = props.id || '';
    const textCenter = center;

    return (
        <ComponentTransition id={id} className={`h-fit ${textCenter}`}>
            <div>
                        <Typography
                variant={variant()}
                color="primary"
                component={MotionDiv}
                key={headerLabel}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}
                variants={variants}
                sx={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.85)' }}
                className={`break-words text-pretty ${headerLabelClassName || ''}`}
            >
                {headerLabel}
            </Typography>

            {typeof tagline === 'string' ? (
                <Typography
                    className={taglineClassName}
                    variant="subtitle1"
                    component={MotionDiv}
                    fontWeight="bold"
                    key={tagline}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={transition}
                    variants={variants}
                >
                    {tagline}
                </Typography>
            ) : (
                <MotionDiv
                    key="tagline-node"
                    className={taglineClassName}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={transition}
                    variants={variants}
                >
                    {tagline}
                </MotionDiv>
            )}
            </div>

        </ComponentTransition>
    );
};


export default MainHeroHeader
