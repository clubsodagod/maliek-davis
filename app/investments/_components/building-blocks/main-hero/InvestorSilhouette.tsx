"use client"

import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react'


const InvestorSilhouette = ({ }) => {
    const photo = "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742150340/mmmaneiwzfvwoxmmcsof_tzxow6.webp";

    return (
        <div className="w-screen relative -left-6 bottom-[-24vh] md:bottom-[-10vh]  landscape:xl:bottom-[-15vh] ">
            <Image
                src={photo}
                alt="This is a silhouette of Maliek Davis, sitting down professionally."
                sizes="100vw"
                priority
                width={9}
                height={16}
                className="relative w-full h-full object-cover md:w-[75vw] landscape:md:w-[35vw] landscape:2xl:w-[24vw] md:left-[25vw] landscape:md:left-[65vw] landscape:2xl:left-[76vw]  md:bottom-[-6vh]"
                style={{
                    WebkitMaskImage: `url("https://static.vecteezy.com/system/resources/previews/001/209/957/non_2x/square-png.png")`,
                    maskImage: `url("https://static.vecteezy.com/system/resources/previews/001/209/957/non_2x/square-png.png")`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "cover",
                    maskSize: "cover",
                    filter: "brightness(0)",
                }}
            />

            <div className="absolute inset-0 flex flex-col gap-1 items-center justify-center pt-10 px-20 md:px-30 lg:px-40  text-center z-10 md:w-[75vw] landscape:md:w-[50vw] landscape:2xl:w-[33vw] md:ml-[25vw] landscape:md:ml-[57.5vw] landscape:2xl:ml-[71vw] md:mt-20 landscape:md:mt-30">
                <Typography variant="h6" className="text-white md:text-xl font-medium max-w-3xl">
                    Wealth isn&apos;t built overnight. It&apos;s engineered through strategy, discipline, & insight.
                </Typography>
                <Typography href='' color='primary.light' component="a" variant="subtitle1" className='underline italic '>
                    More
                </Typography>
            </div>
        </div>

    )
}



export default InvestorSilhouette;