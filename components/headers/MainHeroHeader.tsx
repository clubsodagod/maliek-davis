"use client"

import { Typography } from '@mui/material'
import React from 'react'
import PageTransition from '../layout/PageTransition'
import { MotionDivProps } from '@/library/types/motion.types'
import { MotionDiv } from '../motion/MotionDiv'

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
    ...props
}) => {
    const variant = () => {
        switch (size) {
            case 'xs':
                return 'h6'
            case 'sm':
                return 'h5'
            case 'md':
                return 'h4'
            case 'lg':
                return 'h3'
            case 'xl':
                return 'h2'
            default:
                return 'h1'
        }
    }

    const id = props.id || ''
    const textCenter = center

    return (
        <PageTransition id={id} className={`h-fit ${textCenter}`}>
            <Typography
                variant={variant()}
                color="primary"
                component={MotionDiv}
                key={headerLabel}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                sx={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.85)'}}
                className={`break-words text-pretty ${headerLabelClassName || ''}   `}
            >
                {headerLabel}
            </Typography>

            {typeof tagline === 'string' ? (
                <Typography
                    className={`${taglineClassName}`}
                    variant="subtitle1"
                    component={MotionDiv}
                    fontWeight="bold"
                    key={tagline}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    {tagline}
                </Typography>
            ) : (
                <MotionDiv
                    key="tagline-node"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`${taglineClassName}`}
                >
                    {tagline}
                </MotionDiv>
            )}
        </PageTransition>
    )
}

export default MainHeroHeader
