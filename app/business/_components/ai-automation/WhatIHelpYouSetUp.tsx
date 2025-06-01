"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery, List, Typography, Box, CardMedia, ListItem, ListItemIcon } from '@mui/material';
import React from 'react'
import { BusinessCapabilityModule, businessCapabilityModules } from '../../_library/copy.const';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';


const WhatIHelpYouSetUp = ({ }) => {

    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='ai-automation-what-i-help-setup'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >

            <div
                className='w-full sm:px-[12.5vw] mb-20'
            >
                <MainHeroHeader
                    headerLabel={"What I Help You Setup"}
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

                                <Typography
                                    variant="subtitle1"
                                    fontWeight={"italic"}
                                    fontSize={32}
                                    className="text-(--foreground) pb-10"
                                >
                                    Here&apos;s how we help small businesses own their digital presence and compete with the big players:
                                </Typography>


                                <FeatureList 
                                    value={businessCapabilityModules}
                                />

                            </List>

                        </MotionDiv>


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



export default WhatIHelpYouSetUp;


type FeatureListProps = {
    value: BusinessCapabilityModule[];
};

export const FeatureList: React.FC<FeatureListProps> = ({ value }) => {
    return (
        <>
            {value.map(({ photo, label, features }, index) => {
                const isEven = index % 2 === 0;

                return (
                    <ListItem
                        key={`feature-${index}`}
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
                            alt={label}
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
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={400}
                                    fontSize={32}
                                    className="text-[--foreground]"
                                >
                                    {label}
                                </Typography>

                            {features.map((feature, idx) => (
                                <Box
                                    key={`feature-${index}-item-${idx}`}
                                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <ScatterPlotIcon className="text-[--foreground]" />
                                    </ListItemIcon>
                                    <Typography
                                        fontSize="1.2em"
                                        variant="subtitle1"
                                        className="text-[--foreground]"
                                    >
                                        {feature}
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