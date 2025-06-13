"use client";
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import {
    initialHeaderAnimation,
    animateHeaderAnimation,
    transitionHeaderAnimation,
} from '@/library/animations/enter.animations';
import { Button, Typography, useMediaQuery } from '@mui/material';
import React from 'react';

const SellYourHomeFastSection = () => {
    const sectionRef = React.useRef(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id="home-sell-your-home-fast-section"
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=""
        >
            <div className="w-full sm:px-[12.5vw] grow flex flex-col justify-center gap-10">&apos;
                <MainHeroHeader
                    headerLabel="Sell Your Home Fast in Metro Detroit, Grand Rapids, or Anywhere in Michigan"
                    headerLabelClassName="text-center"
                    taglineClassName="text-center"
                    tagline=""
                    size={!desktop ? 'md' : 'lg'}
                />

                <Typography className="text-center" variant="subtitle1">
                    Whether you&apos;re dealing with an inherited property, financial stress,
                    or just want to skip the agent route — I’ll make a data-backed cash
                    offer and close on your timeline.
                </Typography>

                <div className="flex justify-center w-full mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="dark:bg-(--foreground) bg-(--background) dark:text-(--background) text-(--foreground) p-6 rounded-4xl shadow h-[33vh] w-[33vh] flex items-center justify-center text-center">
                            <Typography variant="body1" fontWeight="600">
                                ✅ Local Michigan Buyer — Detroit & Grand Rapids Focus
                            </Typography>
                        </div>
                        <div className="dark:bg-(--foreground) bg-(--background) dark:text-(--background) text-(--foreground) p-6 rounded-4xl shadow h-[33vh] w-[33vh] flex items-center justify-center text-center">
                            <Typography variant="body1" fontWeight="600">
                                ✅ No Repairs. No Commissions. No Showings.
                            </Typography>
                        </div>
                        <div className="dark:bg-(--foreground) bg-(--background) dark:text-(--background) text-(--foreground) p-6 rounded-4xl shadow h-[33vh] w-[33vh] flex items-center justify-center text-center">
                            <Typography variant="body1" fontWeight="600">
                                ✅ Close in as Little as 7 Days — On Your Terms
                            </Typography>
                        </div>
                    </div>
                </div>

                <Typography
                    variant="body1"
                    className=" mb-8 md:px-50 text-center"
                >
                    I work with homeowners throughout{' '}
                    <strong>Michigan</strong> and <strong>nationwide</strong>. If you&apos;re
                    ready to sell, I&apos;m ready to make a fair, strategic offer.
                </Typography>

                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Button
                    variant='contained'
                        href="/sell-my-house"
                        className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-lg shadow border border-gray-300 hover:bg-gray-200 transition text-center"
                    >
                        Learn How It Works
                    </Button>
                    <Button
                        variant="outlined"
                        href="/sell-my-house#offer-form"
                        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition text-center"
                    >
                        Request My Cash Offer
                    </Button>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default SellYourHomeFastSection;
