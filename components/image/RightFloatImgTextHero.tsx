"use client";

import React from 'react';
import ComponentTransition from '../layout/ComponentTransition';
import { Box, Typography } from '@mui/material';
import { MotionDiv } from '../motion/MotionDiv';
import Image from 'next/image';

interface RightFloatImgTextHeroProps {
    photo: string;
    heroText: string;
    pt: string;
    rounded: string;
    imgPT: string;
    imgHeight?: string;
    imgWidth?: string;
    objectFit?: React.CSSProperties["objectFit"];
    mainCtnRight?:string;
    blkBoxLeft?:string;
}

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
                    {/* Float Image on the Right */}
                    <Box
                        sx={{ bgcolor: "#000" }}
                        component={MotionDiv}
                        className={`relative -right-6 ${imageWidth} ${imageHeight} rounded-4xl float-left ${blkBoxLeft} ml-4 mb-4 ${imgPT} ${rounded}`}
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
                            className={`relative w-full h-full overflow-x-visible overflow-y-hidden ${rounded}`}
                            style={{ objectFit: imageFit }}
                        />
                    </Box>
                </div>

                {/* Wrapped Text Content */}
                <div className={`relative ${pt} w-full`}>
                    <Typography
                        variant='subtitle1'
                        component='span'
                        fontWeight='100'
                        className={`break-words relative`}
                        // fontSize={"1.5rem"}
                    >
                        {heroText}
                    </Typography>
                </div>
            </div>
        </ComponentTransition>
    );
};

export default RightFloatImgTextHero;
