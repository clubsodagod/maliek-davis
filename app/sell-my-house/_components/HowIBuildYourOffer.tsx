"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Box, List, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import LottieEmbed from './LottieEmbed';


const HowIBuildYourOffer = ({ }) => {
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

            <div className="w-full sm:px-[12.5vw] grow flex flex-col justify-center gap-6 ">

                <MainHeroHeader
                    headerLabel="How I Build Your Offer"
                    headerLabelClassName="md:text-center"
                    taglineClassName="md:text-center"
                    tagline=""
                    size={!desktop ? 'md' : 'lg'}
                />

                <div
                    className='block md:flex gap-10'
                >
                    <div
                        className='w-full md:w-1/3'
                    >
                        <LottieEmbed
                            src="https://lottie.host/embed/72204116-a720-4c2d-89e2-7c203ff9d20d/chFifmatYp.lottie"
                            height={400}
                            title='How I Build Your Offer Animation'
                            width="100%"
                        />
                    </div>
                    <Box component="section" pb={10}>
                        <Box maxWidth="lg" mx="auto" textAlign="center">
                            <Typography variant="body1" fontSize="1.125rem" mb={3} fontWeight="700">
                                I don&apos;t play pricing games. Every offer I make is built on:
                            </Typography>

                            <List
                                sx={{
                                    maxWidth: "fit-content",
                                    mx: "auto",
                                    textAlign: { xs: "center", md: "left" },
                                }}
                            >
                                {[
                                    "Comparable sales in your area",
                                    "Current market conditions and inventory trends",
                                    "Your property’s current condition and potential",
                                    "My repair and resale projections",
                                ].map((item, idx) => (
                                    <ListItem key={idx} disableGutters sx={{ justifyContent: "center" }}>
                                        <ListItemText
                                            primaryTypographyProps={{ variant: "body1" }}
                                            primary={`• ${item}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>

                            <Typography variant="body1" fontSize="1.125rem" mt={4}>
                                I&apos;ll walk you through every part of the offer — in plain English. <span className='text-[1.5rem]'>😮‍💨</span>
                            </Typography>
                        </Box>
                    </Box>
                </div>


            </div>

        </SectionWrapper>


    )
}



export default HowIBuildYourOffer;