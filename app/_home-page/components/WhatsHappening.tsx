"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React, { useState, useEffect, useRef } from 'react';
import AnnouncementCard from './AnnouncementCard';
import { IAnnouncement } from '@/database/models/announcement.model';
import { getAnnouncements } from '@/utility/fetchers/content-manager.fetcher';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { useMediaQuery } from '@mui/material';
import { motion } from "motion/react";


export const slideInLeftBounce = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
        },
    },
};

export const slideInRightBounce = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
        },
    },
};

export const slideUpBounce = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
        },
    },
};

export const fadeToRight = {
    initial: { x: -200, opacity: 0 },
    whileInView: {
        x: 0,
        opacity: 1,
    },
    transition: {
        duration: 0.4,
        // times: [0, 0.4, 1], // controls pacing of scale keyframes
    },
};

const WhatsHappening = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [announcement, setAnnouncement] = useState<number>(0);
    const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? "xl" : tabletXL ? undefined : tablet ? "lg" : mobile ? "lg" : undefined;


    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await getAnnouncements();
                setAnnouncements(res);
            } catch (error) {
                console.error("Failed to fetch announcements:", error);
            }
        };
        fetchAnnouncements();
    }, []);

    return (
        <SectionWrapper
            ref={sectionRef}
            id='whats-happening'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <motion.div {...fadeToRight}
                className=''
            >
                <MainHeroHeader
                    id={"whats-happening-header"}
                    headerLabel={`What's Happening`}
                    headerLabelClassName=''
                    tagline={"Live & Upcoming: Projects. Events. Announcements."}
                    size={headerSize}
                    variants={fadeToRight}
                    animate="whileInView"
                    initial={fadeToRight.initial}
                    transition={fadeToRight.transition}
                />
            </motion.div>

            <div
                className="
        mb-auto 
        md:px-[6vw] 
        flex flex-col 
        md:grid md:grid-cols-2 md:gap-6
    "
            >
                {announcements.map((a, i) => {
                    const cardVariant = mobile ? slideUpBounce : slideInRightBounce;
                    return (
                        <MotionDiv
                            key={`${a.title}-${i}`}
                            variants={cardVariant}
                            initial="hidden"
                            whileInView="visible"
                            className="w-full"
                        >
                            <SlidingCardWrapper
                                id={a.title}
                                onClick={() => setAnnouncement(i)}
                            >
                                <AnnouncementCard
                                    announcement={a}
                                    open={i === announcement}
                                    index={i}
                                />
                            </SlidingCardWrapper>
                        </MotionDiv>
                    );
                })}
            </div>

        </SectionWrapper>
    );
};

export default WhatsHappening;
