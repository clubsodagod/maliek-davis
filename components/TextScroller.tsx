"use client";

import { PartnerBenefit } from '@/app/investments/real-estate/prestige-partners/_library/copy.const';
import React, { useRef, useState } from 'react';
import ComponentTransition from './layout/ComponentTransition';
import { MotionDiv } from './motion/MotionDiv';
import { Typography } from '@mui/material';

interface TextScrollerProps {
    benefitList: PartnerBenefit[];
}

const TextScroller: React.FC<TextScrollerProps> = ({ benefitList }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // Scroll listener
    const handleScroll = () => {
        if (!containerRef.current) return;
        const scrollTop = containerRef.current.scrollTop;
        const itemHeight = containerRef.current.clientHeight;
        const index = Math.round(scrollTop / itemHeight);
        setActiveIndex(index);
    };

    // Handle dot click
    const scrollTo = (index: number) => {
        const item = itemRefs.current[index];
        if (item) {
            item.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <ComponentTransition id="text-scroller">
            <div className="relative w-full h-[40vh]">
                {/* Scrollable Text Container */}
                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="w-full h-full overflow-y-auto scroll-smooth snap-y snap-mandatory pr-8"
                >
                    {benefitList.map((benefit, idx) => (
                        <MotionDiv
                            key={idx}
                            ref={(el) => {
                                itemRefs.current[idx] = el;
                            }}
                            className="snap-start flex flex-col justify-center items-center h-[40vh] px-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: activeIndex === idx ? 1 : 0.2,
                                y: activeIndex === idx ? 0 : 10,
                            }}
                            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                        >
                            <Typography variant="h5" fontWeight="bold" className="text-center mb-2" color={`secondary.light`}>
                                {benefit.title}
                            </Typography>
                            <Typography variant="body1" className="text-center opacity-80 max-w-xl" color={`#fafafa`}>
                                {benefit.description}
                            </Typography>
                        </MotionDiv>
                    ))}
                </div>

                {/* Dots: absolutely positioned to the right */}
                <div className="absolute top-1/2 -translate-y-1/2 right-3 md:right-15 2xl:right-20 flex flex-col gap-2 items-center">
                    {benefitList.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex
                                ? 'bg-gradient-to-br from-[#60abe4] to-[#8f11cc] scale-125 shadow-md'
                                : 'bg-gray-400 opacity-40'}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

            </div>
        </ComponentTransition>

    );
};

export default TextScroller;




