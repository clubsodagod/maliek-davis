"use client";

import React from 'react';
import ComponentTransition from '../layout/ComponentTransition';
import { Box, Typography } from '@mui/material';
import { MotionDiv } from '../motion/MotionDiv';
import Image from 'next/image';

interface RightFloatImgTextHeroProps {
    photo: string;
    heroText: React.ReactNode;
    pt: string;
    rounded: string;
    imgPT: string;
    imgHeight?: string;
    imgWidth?: string;
    objectFit?: React.CSSProperties["objectFit"];
    mainCtnRight?: string;
    blkBoxLeft?: string;
}

const imageMotion = {
    initial: { x: 100, opacity: 0, scale: 1.25 },
    whileInView: { x: 0, opacity: 1, scale: 1 },
    transition: { duration: 1, ease: "easeOut" },
};

const textMotion = {
    initial: { x: -100, opacity: 0, scale: 1.25 },
    whileInView: { x: 0, opacity: 1, scale: 1 },
    transition: { duration: 1, ease: "easeOut", delay: 0.3 },
};

const RightFloatImgTextHero: React.FC<RightFloatImgTextHeroProps> = ({
    photo,
    heroText,
    pt,
    rounded,
    imgPT,
    imgHeight,
    imgWidth,
    objectFit,
    mainCtnRight,
    blkBoxLeft
}) => {
    const imageHeight = imgHeight ?? "h-[450px] md:h-[400px] 2xl:h-[600px]";
    const imageWidth = imgWidth ?? "w-[235px] md:w-[400px] landscape:xl:w-[550px] landscape:2xl:w-[1000px] 2xl:w-[800px]";
    const imageFit = objectFit ?? "cover";

    return (
        <ComponentTransition>
            <div className={` relative ${mainCtnRight} z-10 `}>
                <div className={`relative w-screen px-6 h-full 2xl:-top-12 ${rounded} `}>
                    {/* Float Image on the Right with Motion */}
                    <Box
                        component={MotionDiv}
                        {...imageMotion}
                        className={`bg-(--foreground) relative -right-6 ${imageWidth} ${imageHeight} rounded-4xl float-left ${blkBoxLeft} ml-4 mb-4 ${imgPT} ${rounded} drop-shadow-2xl`}
                        style={{
                            shapeOutside: "content-box",
                            shapeMargin: "5px",
                            float: "right"
                        }}
                    >
                        <Image
                            alt='technology-solutions-cta-image'
                            src={photo}
                            sizes='100vw'
                            width={500}
                            height={500}
                            className={`relative w-full h-full  ${rounded} object-[50%_0]`}
                            style={{ objectFit: imageFit }}
                        />
                    </Box>
                </div>

                {/* Wrapped Text Content with Motion */}
                <MotionDiv {...textMotion} className={`relative ${pt}`}>
                    {typeof heroText === 'string' ? (
                        <Typography
                            variant='subtitle1'
                            component='div'
                            fontWeight={100}
                            className="break-words relative"
                        >
                            {heroText}
                        </Typography>
                    ) : (
                        heroText
                    )}
                </MotionDiv>
            </div>
        </ComponentTransition>

    );
};

export default RightFloatImgTextHero;
