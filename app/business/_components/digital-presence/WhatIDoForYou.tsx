"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Box, CardMedia, List, ListItem, ListItemIcon, ListSubheader, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { strategies, StrategySection } from '../../_library/copy.const';


const WhatIDoForYou = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='digital-presence-the-opportunity'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >

            <div
                className='w-full xl:px-[12.5vw] mb-20'
            >
                <MainHeroHeader
                    headerLabel={"What I Help You Build"}
                    headerLabelClassName=''
                    tagline={""}
                    taglineClassName=''
                    size={!desktop ? "lg" : "xl"}
                    className=''
                />


                <div
                    className='w-full px-[3vw] mt-30'
                >
                    <div
                        className='w-full flex flex-col  gap-12 items-end'
                    >
                        <MotionDiv
                            className='h-full overflow-x-visible'
                        >
                            <List

                            >
                                {/* <ListSubheader
                                    sx={{
                                        bgcolor: "transparent",
                                    }}
                                    className=''

                                > */}
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={"italic"}
                                    fontSize={32}
                                    className="text-(--foreground)"
                                >
                                    Here&apos;s how we help small businesses own their digital presence and compete with the big players:
                                </Typography>

                                {/* </ListSubheader> */}
                                <StrategyList
                                    strategies={strategies}
                                />

                            </List>

                        </MotionDiv>

                        {/* <MotionDiv className=''>

                            <Image
                                alt='maliek-programmger-image'
                                src={programmerImg}
                                sizes='100vw'
                                width={500}
                                height={500}
                                className={`relative w-full h-full  rounded-[38px] object-[50%_0]`}
                                style={{ objectFit: "cover" }}
                            />
                        </MotionDiv> */}


                    </div>

                    <div
                        className='mt-30'
                    >
                        <Typography variant="h6"
                            fontSize={48} fontWeight={100} className="text-center italic ">
                            Your website is your best salesperson. If it&apos;s not closing deals while you sleep — it&apos;s time to upgrade.
                        </Typography>
                    </div>


                </div>

            </div>

        </SectionWrapper>
    )
}



export default WhatIDoForYou;



type StrategyListProps = {
    strategies: StrategySection[];
};

export const StrategyList: React.FC<StrategyListProps> = ({ strategies }) => {
    return (
        <>
            {strategies.map(({ id, headline, highlights, photo }, index) => {
                const isEven = index % 2 === 0;
                return (
                    <ListItem
                        key={`${headline}-${id}`}
                        className="mb-16"
                        sx={{
                            display: "flex",
                            flexDirection: isEven ? "row" : "row-reverse",
                            gap: 4,
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Image */}
                        <CardMedia
                            component="img"
                            src={photo}
                            alt={headline}
                            sx={{
                                width: "100%",
                                maxWidth: 400,
                                height: "auto",
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />

                        {/* Text Content */}
                        <Box sx={{ flex: 1, minWidth: 300 }}>
                            <ListSubheader
                                sx={{ bgcolor: "transparent", pl: 0 }}
                                className="w-full mb-4"
                            >
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={400}
                                    fontSize={32}
                                    className="text-[--foreground]"
                                >
                                    {headline}
                                </Typography>
                            </ListSubheader>

                            {highlights.map((text, idx) => (
                                <Box
                                    key={idx}
                                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <ScatterPlotIcon className="color-[--foreground]" />
                                    </ListItemIcon>
                                    <Typography
                                        fontSize="1.2em"
                                        variant="subtitle1"
                                        className="text-[--foreground]"
                                    >
                                        {text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </ListItem>
                );
            })}
        </>
    );
};
