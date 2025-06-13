"use client";

import React from 'react';
import { Box } from '@mui/material';

interface LottieEmbedProps {
    src: string;
    title?: string;
    width?: string | number;
    height?: string | number;
}

const LottieEmbed: React.FC<LottieEmbedProps> = ({
    src,
    title,
    width,
    height,
}) => {
    return (
        <Box
            component="iframe"
            src={src}
            title={title}
            width={width}
            height={height}
            sx={{
                border: 'none',
                borderRadius: 2,
                overflow: 'hidden',
            }}
        />
    );
};

export default LottieEmbed;
