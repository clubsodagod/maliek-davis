"use client"

import { investmentCategories } from '@/app/investments/_library/copy';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import { animateHeaderAnimation, initialHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import InvestmentFocusCard from './InvestmentFocusCard';


const InvestmentsFocus = ({ }) => {

    const sectionRef = React.useRef<HTMLDivElement>(null);


    const [investment, setInvestment] = useState<number>(0);

    const svgRef = useRef<SVGSVGElement | null>(null);
    const [svgHeight, setSvgHeight] = useState<number | null>(null);

    useEffect(() => {
        if (svgRef.current) {
            const height = svgRef.current.getBoundingClientRect().height;
            setSvgHeight(height);
            console.log('SVG height:', height);
        }
    }, [svgHeight]);

    return (
        <>
            <SectionWrapper
                id='investments-area-of-focus'
                ref={sectionRef}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
            >

                <div
                    className='relative flex flex-col'
                >
                    <div
                        className='bg-black w-screen h-full relative -left-6 top-[-12vh] px-6 pt-[12vh]'
                    >
                        <div
                            className='w-full flex flex-col justify-center gap-12 grow h-full'
                        >
                            <MainHeroHeader
                                headerLabel={'Investment Vehicles I Focus On'} tagline={'Dynamic assets for any economic environment.'}
                                size='xl'
                            />

                            <div
                                className='w-full flex justify-center gap-12'
                            >

                                <div
                                    className='w-[200px] h-[200px]'
                                >

                                    <Image
                                        alt='Liquid metal, carbon uptrend arrow.'
                                        src={"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586751/Convert_to_PNG_project_21_kqqjwf.png"}
                                        sizes={"100vw"}
                                        width={9} height={16}
                                        className='w-full h-full object-cover'
                                        priority
                                    />
                                </div>
                            </div>


                        </div>

                        <div
                            className='relative min-w-screen -left-6  md:min-h-[10vh] grow  z-[100] bg-black '
                        />
                    </div>

                    <div className='w-full flex flex-col justify-center relative top-[-12vh]'>

                        <div className='w-screen h-full relative -left-6 z-10'>

                            <svg
                                ref={svgRef}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1440 100"
                                preserveAspectRatio="none"
                                className="w-screen" style={{ transform: "rotate(180deg)" }}
                            >
                                <path
                                    fill="#000"
                                    d="M0,0 Q0,100 100,100 H1340 Q1440,100 1440,0 L1440,100 L0,100 Z"
                                />
                            </svg>
                            <div
                                className={` sliding-card-ctn relative top-[-6.25vh]  md:top-[-16.55vh] `}
                            >
                                {
                                    investmentCategories.map((a, i) => (
                                        <SlidingCardWrapper
                                            key={`${a.category} ${i}`}
                                            id={a.category}
                                            onClick={() => setInvestment(i)}
                                        >
                                            <InvestmentFocusCard
                                                investment={a}
                                                index={i}
                                                open={investment === i}
                                            />
                                        </SlidingCardWrapper>
                                    ))
                                }
                            </div>
                            {/* Optionally show the measured height */}
                            {/* {svgHeight && (
                                <div className="text-white absolute top-2 left-2 text-xs">
                                    SVG Height: {Math.round(svgHeight)}px
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>

            </SectionWrapper>

        </>

    )
}



export default InvestmentsFocus;