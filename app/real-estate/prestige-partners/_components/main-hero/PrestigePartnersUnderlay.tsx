"use client";

import ComponentTransition from '@/components/layout/ComponentTransition';
import { brandLogo } from '@/library/brand.const';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Typography, useMediaQuery } from '@mui/material';

const PrestigePartnersUnderlay = () => {
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px) and (max-width:899px)`);
    const tabletXL = useMediaQuery(`(min-width:900px) and (max-width:1099px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const sharedDistance = mobile
        ? "120vw"
        : tablet
            ? "100vw"
            : tabletXL
                ? "15vw"
                : desktop
                    ? "10vw"
                    : "100vw";

    const marqueeLeftVariants = {
        animate: {
            x: [`-${sharedDistance}`, sharedDistance],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 15,
                    ease: "linear",
                },
            },
        },
    };

    const marqueeRightVariants = {
        animate: {
            x: [sharedDistance, `-${sharedDistance}`],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 15,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <ComponentTransition id="prestige-partners-underlay">
            <div className="relative w-screen h-screen overflow-hidden">
                <div className="flex w-full h-full">
                    {/* Left Side */}
                    <div className="w-1/2 h-full relative">
                        <motion.div
                            className="absolute whitespace-nowrap rotate-[45deg]"
                            variants={marqueeLeftVariants}
                            animate="animate"
                        >
                            <Typography variant="h2" fontSize="6rem" color="secondary.light">
                                Prestige
                            </Typography>
                        </motion.div>

                        <motion.div
                            className="absolute bottom-[40%] whitespace-nowrap -rotate-[45deg]"
                            variants={marqueeLeftVariants}
                            animate="animate"
                        >
                            <Typography variant="h2" fontSize="6rem" color="primary.light">
                                Partners
                            </Typography>
                        </motion.div>
                    </div>

                    {/* Right Side */}
                    <div className="w-1/2 h-full relative">
                        <motion.div
                            className="absolute whitespace-nowrap -rotate-[45deg] right-0"
                            variants={marqueeRightVariants}
                            animate="animate"
                        >
                            <Typography variant="h2" fontSize="6rem" color="secondary.light">
                                Prestige
                            </Typography>
                        </motion.div>

                        <motion.div
                            className="absolute bottom-[40%] whitespace-nowrap rotate-[45deg] right-0"
                            variants={marqueeRightVariants}
                            animate="animate"
                        >
                            <Typography variant="h2" fontSize="6rem" color="primary.light">
                                Partners
                            </Typography>
                        </motion.div>
                    </div>
                </div>

                {/* Center Logo */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 pointer-events-none pb-[75%] md:pb-[40%] 2xl:pb-[30%]">
                    <div
                        className="relative h-[275px] w-[275px] flex justify-center items-center rounded-full overflow-hidden"
                    
                    >

                        <Image
                            alt="MD Logo"
                            src={brandLogo}
                            width={250}
                            height={250}
                            sizes="100vw"
                            className="opacity-90 object-contain brightness-0 relative z-[50]"
                        />
                    </div>



                </div>
            </div>
        </ComponentTransition>
    );
};

export default PrestigePartnersUnderlay;
