"use client"

import { Typography } from '@mui/material'
import React from 'react'
import PageTransition from '../layout/PageTransition';
import { MotionDivProps } from '@/library/types/motion.types';
import { MotionDiv } from '../motion/MotionDiv';

interface MainHeroHeaderProps extends MotionDivProps {
    headerLabel: string;
    tagline: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    center?: string;
    taglineClassName?: string;
    headerLabelClassName?: string;
}

const MainHeroHeader: React.FC<MainHeroHeaderProps> = ({
    headerLabel,
    tagline,
    size,
    center,
    taglineClassName,
    ...props
}) => {

    const variant = () => {
        switch (size) {
            case 'xs':
                return 'h6';
            case 'sm':
                return 'h5';
            case 'md':
                return 'h4';
            case 'lg':
                return 'h3';
            case 'xl':
                return 'h2';
            default:
                return 'h1';
        }
    };

    const id = props.id ? props.id : '';

    const textCenter = center;

    return (
        <PageTransition
            id={id}
            className={`h-fit ${textCenter}`}
        >
            <Typography
                variant={variant()}
                color='primary'
                component={MotionDiv}
                key={headerLabel} // Triggers animation when headerLabel changes
                initial={{ opacity: 0, y: -20 }} // Start off-screen
                animate={{ opacity: 1, y: 0 }} // Fade in and move down smoothly
                exit={{ opacity: 0, y: 20 }} // Moves down when changing
                transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth effect
            >
                {headerLabel}
            </Typography>
            <Typography
                className={`${taglineClassName}`}
                variant='subtitle1'
                component={MotionDiv}
                fontWeight={"bold"}
                key={tagline} // Triggers animation when headerLabel changes
                initial={{ opacity: 0, y: -20 }} // Start off-screen
                animate={{ opacity: 1, y: 0 }} // Fade in and move down smoothly
                exit={{ opacity: 0, y: 20 }} // Moves down when changing
                transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth effect
            >
                {tagline}
            </Typography>
        </PageTransition>
    )
}

export default MainHeroHeader