"use client";

import React from 'react';
import ComponentTransition from '../layout/ComponentTransition';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LeftFloatImgTextHeroProps {
    photo: string;
    heroText: React.ReactNode;
    pt: string;
    rounded: string;
    imgPT: string;
    imgHeight?: string;
    imgWidth?: string;
    objectFit?: React.CSSProperties["objectFit"];
    OtherComponent?: React.ReactNode;
}

const imageAnimation = {
    initial: { x: -100, opacity: 0, scale: 1.25 },
    whileInView: { x: 0, opacity: 1, scale: 1 },
    transition: { duration: 1, ease: "easeOut" },
};

const textAnimation = {
    initial: { x: 100, opacity: 0, scale: 1.25 },
    whileInView: { x: 0, opacity: 1, scale: 1 },
    transition: { duration: 1, ease: "easeOut", delay: 0.3 },
};

const LeftFloatImgTextHero: React.FC<LeftFloatImgTextHeroProps> = ({
    photo,
    heroText,
    pt,
    rounded,
    imgPT,
    imgHeight,
    imgWidth,
    objectFit,
    OtherComponent
}) => {
    const mobile = useMediaQuery(`(max-width:768px)`);
    const imageHeight = imgHeight ?? "h-[450px] md:h-[400px] 2xl:h-[600px]";
    const imageWidth = imgWidth ?? "w-[235px] md:w-[400px] landscape:xl:w-[550px] landscape:2xl:w-[1000px] 2xl:w-[800px]";
    const imageFit = objectFit ?? "cover";

    return (
        <ComponentTransition>
            <div className='relative -left-20 z-10'>
                <div className={`relative w-screen px-6 h-full 2xl:-top-12 ${rounded}`}>
                    {/* Float Image with Motion */}
                    <Box
                        component={motion.div}
                        {...imageAnimation}
                        className={`relative -left-6 ${imageWidth} ${imageHeight} rounded-4xl float-right right-[100px] mr-4 mb-4 ${imgPT} ${rounded} bg-(--foreground) shadow-2xl`}
                        style={{
                            shapeOutside: "content-box",
                            shapeMargin: "5px",
                            float: "left"
                        }}
                    >
                        <Image
                            alt='technology-solutions-cta-image'
                            src={photo}
                            sizes='100vw'
                            width={500}
                            height={500}
                            className={`relative w-full h-full overflow-x-visible overflow-y-hidden ${rounded} object-[50%_0]`}
                            style={{ objectFit: imageFit }}
                        />
                    </Box>
                </div>

                {/* Wrapped Text Content with Motion */}
                <motion.div
                    {...textAnimation}
                    className={`relative ${pt} ${typeof heroText === "string" ? "w-[105vw]" : `${mobile ? "w-[105vw]" : "w-[100vw]"}`}`}
                >
                    {typeof heroText === 'string' ? (
                        <Typography
                            variant='subtitle1'
                            component='div'
                            fontWeight={100}
                            sx={{
                                textShadow:"2px 2px"
                            }}
                            className="break-words relative "
                        >
                            {heroText}
                        </Typography>
                    ) : (
                        heroText
                    )}

                    <div className="hidden lg:landscape:block">
                        {OtherComponent}
                    </div>
                </motion.div>
            </div>
        </ComponentTransition>
    );
};

export default LeftFloatImgTextHero;
