"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, Typography, useMediaQuery } from '@mui/material';
import React from 'react'


const PressureWashingModule = ({ }) => {

    const sectionRef = React.useRef(null);

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
    if (desktop) size = 'xl';
    else if (tabletXL) size = 'lg';
    else if (tablet) size = 'md';
    else if (mobile) size = 'sm';
    else size = 'xs';

    return (
        <div>
            {/* Background GIF */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-[-10]"
            >
                <source src="https://lh3.googleusercontent.com/pw/AP1GczOcYmDSSMNv0nUMbkW4trMt3Yk9_85xvhQYHmQghaUKhLDfww6cTJbxVLL7QW5U2A6xi7Z0VOWsFLLWnIbPg-bRlkpBmVjcBo7VOq0DZq-AWSOcyZR7sViJYKkAUB3wU5ifP8M5g4ocxXzUBJYiMSwTkZmkAkMzOmiA5PWsos57pegXBKQCA6Tw-0nhL4G1eIbHQcZQOMUV8YPmUUJw0kTqWLafl_-yTO-zQ8Ap39ihPUAcduzlB1h8QWMc86YLfgxKxbGbDBZMvBpYosy5XnIgRjwOUikHbDqhzNmJy_-fm2ARa_3Q3MDVtj7_QXLa0a6dyICLm-jDD6tvc3BZIMICuIncANt9QnzlUN3cLPFLuwU0Gjwl4EO8MwQ9-MBnvL9FWLae6pIAPnG4Ovc_5vocB_KGPDoeYHEx-S_cO1bdBk2XwoVP8Un_hJstVySbiOee52ehPNqfkeQhR1dsKdI34CBaBsaV0Bh5GGH_oWjqF8aettb6UEkRk--32jS8lCwkcTFL-jKgDTVQTg-Ue2Dgl6ACt_Tj_FTq-sR8oAoMyHALstQM6W_JdVLgdPm_W0DkqA2vCz_1Mq5lvzoL3GVwMF5XlW6_Z3Od6hyufPbd41nBYMTw6O95k_c-sQJrunVw4p5DGirOAh0tw2_iUUHcr0Bu4aJ-rxoBJ4q3gq_SKmx5No_e6000rRmOCQPlTGLnJEw5UowuDnBWb1HD4XXy_J8IwfzcMUtbdoQGvbJCxAM3k4BXZ0XNuMVpc7qmjg3vbUKj-1YI1vDrZecCZBXRIUtZthMok-z948jQZX8wmpZlDd6-RFbSJ-HbSaN3jWHrKVcDAB_fmJzUmvsV57xtnryAaaMv93_BAVbgRT3xLTbC7i_49t_XiTANErcIDVQ=m15?authuser=0&cpn=UYwHrvn3iTQi_Okp&c=WEB_EMBEDDED_PLAYER&cver=1.20250707.21.00" type="video/mp4" />
                Your browser does not support the video tag!
            </video>


            {/* Overlay to darken the background for readability */}
            <div className="absolute inset-0 bg-black/50 " />
            <SectionWrapper
                ref={sectionRef}
                id={`pressure-washing`}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
            >
                <div
                    className='flex flex-col justify-center max-w-full h-full grow  sm:px-[12.5vw] gap-20'
                >
                    <MainHeroHeader
                        id={"blog-preview-header"}
                        headerLabel={"Proffessional Pressure Washing"}
                        center='text-center'
                        tagline={
                            <Typography
                                fontSize={size === 'xs' ? '1rem' : size === 'sm' ? '1.25rem' : size === 'md' ? '1.5rem' : size === 'lg' ? '1.75rem' : size === 'xl' ? '2rem' : '1.25rem'}
                                variant="subtitle1" className='text-white'>
                                For Homes & Small Businesses — Fast, Reliable, Affordable
                            </Typography>
                        }
                        taglineClassName='text-(#fafafa)'
                        size={size}
                    />

                    <div className="flex justify-center gap-4">
                        <Button variant="contained" className="bg-blue-600 text-white px-6 py-3 rounded-xl">Get a Free Estimate</Button>
                        <Button variant="outlined" className="bg-green-600 text-white px-6 py-3 rounded-xl">Call Now</Button>
                    </div>
                </div>


            </SectionWrapper>
        </div>


    )
}



export default PressureWashingModule;