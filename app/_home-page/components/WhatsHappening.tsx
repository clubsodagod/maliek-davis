"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React, { useState, useEffect, useRef } from 'react';
import AnnouncementCard from './AnnouncementCard';
import { IAnnouncement } from '@/database/models/announcement.model';
import { getAnnouncements } from '@/utility/fetchers/content-manager.fetcher';

const WhatsHappening = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [announcement, setAnnouncement] = useState<number>(0);
    const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);

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
            id='whats-happening-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <div className='flex flex-col gap-3 h-full grow relative'>
                <MainHeroHeader
                    id={"whats-happening-header"}
                    headerLabel={`What's Happening`}
                    tagline={"Live & Upcoming: Projects. Events. Announcements."}
                    size={"lg"}
                />
            </div>

            <div>
                {announcements.map((a, i) => (
                    <SlidingCardWrapper
                        key={`${a.title}-${i}`}
                        id={a.title}
                        onClick={() => setAnnouncement(i)}
                    >
                        <AnnouncementCard
                            announcement={a}
                            open={i === announcement}
                            index={i}
                        />
                    </SlidingCardWrapper>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default WhatsHappening;
