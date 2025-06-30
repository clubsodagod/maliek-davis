"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, useMediaQuery } from '@mui/material';
import React from 'react'


const SellMyHouseMainHero = ({ }) => {
    const sectionRef = React.useRef(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <>
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
                <div className="w-full sm:px-[12.5vw] grow flex flex-col justify-center gap-10 ">
                    <div>

                    </div>
                    <MainHeroHeader
                        headerLabel="Sell Your Home Fast in Metro Detroit, Grand Rapids, or Anywhere in Michigan"
                        headerLabelClassName="md:text-center"
                        taglineClassName="md:text-center"
                        tagline=""
                        size={!desktop ? 'md' : 'lg'}
                    />
                    <p className="text-lg md:text-xl mb-6 md:text-center">
                        Skip the agents, repairs, and waiting games. I buy houses directly from homeowners —
                        with fair cash offers, zero commissions, and closings on your timeline.
                    </p>
                    <div className=" md:mx-auto md:text-center">
                        <Button variant="contained" href="#offer-form" className=" transition">
                            Request Your Cash Offer
                        </Button>
                    </div>
                    <div className="w-full sm:px-[12.5vw] grow flex flex-col justify-center gap-10 mt-10">
                        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center">
                            <div className="p-6 bg-(--foreground) text-(--background) shadow rounded-xl">
                                <p className="font-semibold">✅ Metro Detroit & Grand Rapids Specialist</p>
                            </div>
                            <div className="p-6 bg-(--foreground) text-(--background) shadow rounded-xl">
                                <p className="font-semibold">✅ Sell As-Is — No Repairs, No Showings</p>
                            </div>
                            <div className="p-6 bg-(--foreground) text-(--background) shadow rounded-xl">
                                <p className="font-semibold">✅ Close in as Little as 7 Days — You Choose</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </>
    )
}



export default SellMyHouseMainHero;