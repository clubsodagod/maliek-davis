/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import {
    initialHeaderAnimation,
    animateHeaderAnimation,
    transitionHeaderAnimation,
} from '@/library/animations/enter.animations';
import BackgroundUnderlay from './BackgroundUnderlay';

const DealSourcingAndEvaluation = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (visible && entry.isIntersecting) return
                setVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.8, // Adjust this as needed
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <>
            <BackgroundUnderlay visible={true} />

            <div
                className="relative top-[-100vh]"
            >
                <SectionWrapper
                    id="investments-real-estate-main-section"
                    ref={sectionRef}
                    whileInView={{ opacity: 1 }}
                    initial={initialHeaderAnimation}
                    animate={animateHeaderAnimation}
                    transition={transitionHeaderAnimation}
                    exit={{ opacity: 0, scaleY: 0 }}
                >
                    <div
                        className={"relative w-screen h-full -left-6 top-[-12vh] pt-[12vh] pb-[10vh] px-6 rounded-b-4xl shadow-2xl bg-(--background)"}
                    >
                        <MainHeroHeader
                            headerLabel={'How I Find & Evaluate Deals'}
                            tagline={''}
                            size="lg"
                        />
                    </div>

                </SectionWrapper>
            </div>

        </>
    );
};

export default DealSourcingAndEvaluation;
