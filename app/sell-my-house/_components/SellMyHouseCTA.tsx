"use client";

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import {
    initialHeaderAnimation,
    animateHeaderAnimation,
    transitionHeaderAnimation,
} from '@/library/animations/enter.animations';
import { useMediaQuery, Button, Typography, Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { SellMyHouseForm } from './SellMyHouseForm';

const SellMyHouseCTA = () => {
    const sectionRef = React.useRef(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    return (
        <SectionWrapper
            id="home-sell-your-home-fast-section"
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <div className="w-full sm:px-[12.5vw] grow flex flex-col justify-center gap-10">
                <MainHeroHeader
                    headerLabel="If You’re Ready to Sell — I’m Ready to Buy"
                    headerLabelClassName="md:text-center"
                    taglineClassName="md:text-center"
                    tagline=""
                    size={!desktop ? 'lg' : 'lg'}
                />

                <section id='offer-form' className="py-10 px-6 md:flex gap-10">
                    <MotionDiv>
                        <Box
                            sx={{
                                p: 3,
                                borderRadius: '2rem',
                                backdropFilter: 'blur(8px)',
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            }}
                            className="min-w-full "
                        >
                            <Image
                                src="https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170632/pd5ein5jrluxvxrro6yv_kibfof.webp"
                                alt="Happy seller"
                                width={300}
                                height={300}
                                className="rounded-4xl object-cover w-full min-h-[30vh]"
                            />
                        </Box>
                    </MotionDiv>

                    <Box className="max-w-3xl mx-auto flex flex-col justify-center gap-4 mt-10 md:mt-0 text-center">
                        <Typography variant="body1" fontSize="1.125rem">
                            Get a fast, fair offer based on real data — and move forward with confidence.
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => setDialogOpen(true)}
                        >
                            Request My Cash Offer
                        </Button>

                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            100% confidential. No pressure. No obligation.
                        </Typography>
                    </Box>
                </section>
            </div>
            <SellMyHouseForm
                open={dialogOpen} setOpen={setDialogOpen}
            />
        </SectionWrapper>
    );
};

export default SellMyHouseCTA;
