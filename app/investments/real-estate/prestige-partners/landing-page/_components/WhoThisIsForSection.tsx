'use client'

import { Typography, useMediaQuery, Box } from '@mui/material';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import React from 'react';
import MainHeroHeader from '@/components/headers/MainHeroHeader';

const builtForList = [
    "Don’t want to compete with 20 buyers on the MLS",
    "Want consistent, quality deal flow",
    "Are too busy for wholesaler spam and dead leads",
    "Want sourcing handled professionally",
];

const notForList = [
    "Looking for retail prices",
    "Just browsing or “seeing what’s out there”",
    "Unwilling to act when a deal matches",
];

const WhoThisIsForSection = () => {
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined =
        desktop ? undefined :
            tabletXL ? undefined :
                tablet ? undefined :
                    mobile ? "md" : undefined;

    return (
        <SectionWrapper
            id='who-this-is-for-section'
            initial={initialHeaderAnimation}
            whileInView={{ opacity: 1 }}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className="py-24"
        >
            <div className="w-full max-w-4xl mx-auto px-4 text-center flex flex-col gap-10">
                <MainHeroHeader
                    headerLabel={'Built for Investors Who…'}
                    tagline={""}
                    size={headerSize}
                />

                <Box className="flex flex-col gap-4">
                    {builtForList.map((item, idx) => (
                        <Box key={idx} className="flex items-center gap-3 justify-center text-left">
                            <FaCheckCircle className="text-green-500" />
                            <Typography variant="body1" >
                                {item}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Box className="mt-12 border-t border-neutral-800  max-w-xl mx-auto pt-[64px]">
                    <Typography variant="subtitle2"  gutterBottom>
                        ❌ Not for investors who…
                    </Typography>
                    <Box className="flex flex-col gap-4">
                        {notForList.map((item, idx) => (
                            <Box key={idx} className="flex items-center gap-3 justify-center text-left">
                                <FaTimesCircle className="text-red-500" />
                                <Typography variant="body2" >
                                    {item}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </div>
        </SectionWrapper>
    );
};

export default WhoThisIsForSection;
