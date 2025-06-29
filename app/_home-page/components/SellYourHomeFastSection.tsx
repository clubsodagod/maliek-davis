"use client";

import { SellMyHouseForm } from '@/app/sell-my-house/_components/SellMyHouseForm';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import {
    initialHeaderAnimation,
    animateHeaderAnimation,
    transitionHeaderAnimation,
} from '@/library/animations/enter.animations';
import { Button, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { motion } from 'framer-motion';

export const pulse = {
    animate: {
        scale: [1, 1.2, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
        },
    },
};
export const pulseAlt = {
    animate: {
        scale: [1.2, 1, 1.2],
        transition: {
            duration: 2,
            repeat: Infinity,
        },
    },
};


const fadeUp = {
    initial: { y: 40, opacity: 0, scale: 0 },
    whileInView: {
        y: 0,
        opacity: 1,
        scale: [0, 1.25, 1],
    },
    transition: {
        duration: 0.8,
        ease: "easeOut",
        // times: [0, 0.4, 1], // controls pacing of scale keyframes
    },
};

const cardVariants = {
    hidden: { x: 170, opacity: 0 },
    visible: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.2,
            ease: "easeOut"
        }
    })
};

const SellYourHomeFastSection = () => {
    const sectionRef = React.useRef(null);
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? "xl" : tabletXL ? undefined : tablet ? "lg" : mobile ? "md" : undefined;

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

                {/* Hero Header with animation */}
                <motion.div {...fadeUp}>
                    <MainHeroHeader
                        headerLabel="Sell Your Home Fast in Metro Detroit, Grand Rapids, or Anywhere in Michigan"
                        headerLabelClassName="text-center"
                        taglineClassName="text-center"
                        tagline=""
                        size={headerSize}
                    />
                </motion.div>

                {/* Subtitle */}
                <motion.div {...fadeUp}>
                    <Typography className="text-center" variant="subtitle1">
                        Whether you&apos;re dealing with an inherited property, financial stress,
                        or just want to skip the agent route — I’ll make a data-backed cash
                        offer and close on your timeline.
                    </Typography>
                </motion.div>

                {/* Benefit Cards with stagger */}
                <div className="flex justify-center w-full mb-8 px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl">
                        {[
                            "✅ Local Michigan Buyer — Detroit & Grand Rapids Focus",
                            "✅ No Repairs. No Commissions. No Showings.",
                            "✅ Close in as Little as 7 Days — On Your Terms"
                        ].map((text, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                className="bg-(--background) dark:bg-(--foreground) text-(--foreground) dark:text-(--background) p-4 sm:p-6  rounded-3xl shadow-md  w-full h-[200px] sm:h-[225px] md:h-[250px] flex items-center justify-center text-center transition-all"
                            >
                                <Typography
                                    variant="body1"
                                    fontWeight={600}
                                    className="text-base sm:text-lg md:text-xl"
                                >
                                    {text}
                                </Typography>
                            </motion.div>
                        ))}
                    </div>
                </div>


                {/* Bottom Paragraph */}
                <motion.div {...fadeUp}>
                    <Typography variant="body1" className="mb-8 md:px-50 text-center">
                        I work with homeowners throughout{' '}
                        <strong>Michigan</strong> and <strong>nationwide</strong>. If you&apos;re
                        ready to sell, I&apos;m ready to make a fair, strategic offer.
                    </Typography>
                </motion.div>

                {/* Buttons with Pulse Animation */}
                <motion.div {...fadeUp}>
                    <div className="flex flex-col items-center md:flex-row justify-center gap-10">
                        <motion.div {...pulse}>
                            <Button
                                variant="contained"
                                href="/sell-my-house"
                                className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-lg shadow border border-gray-300 hover:bg-gray-200 transition text-center"
                            >
                                Learn How It Works
                            </Button>
                        </motion.div>
                        <motion.div {...pulseAlt}>
                            <Button
                                variant="outlined"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setDialogOpen(!dialogOpen);
                                }}
                                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition text-center"
                            >
                                Request My Cash Offer
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>

            </div>

            {/* Modal Form */}
            <SellMyHouseForm open={dialogOpen} setOpen={setDialogOpen} />
        </SectionWrapper>
    );
};

export default SellYourHomeFastSection;
