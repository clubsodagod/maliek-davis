'use client'

import React from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import AccessForm from './AccessForm';
import MainHeroHeader from '@/components/headers/MainHeroHeader';

const LandingPageCTA = () => {
    const mobile = useMediaQuery('(max-width:768px)');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const headerSize = mobile ? 'lg' : undefined;

    return (
        <SectionWrapper
            id="access-form-section"
            initial={initialHeaderAnimation}
            whileInView={{ opacity: 1 }}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className="py-24"
        >
            <div className="w-full max-w-3xl mx-auto px-4 md:text-center flex flex-col gap-10">
                <MainHeroHeader
                    headerLabel={'Tell Me What You’re Looking For'}
                    tagline={""}
                    size={headerSize}
                />

                <AccessForm />

                <Typography variant="caption" color="#aaa" className="text-center mt-2">
                    Spots limited – sourcing slots open quarterly
                </Typography>
            </div>
        </SectionWrapper>
    );
};




export default LandingPageCTA;
