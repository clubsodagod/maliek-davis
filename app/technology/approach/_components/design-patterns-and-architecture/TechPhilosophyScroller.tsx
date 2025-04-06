"use client";

import React, { useState } from "react";
import TechPhilosophyCard from "./TechPhilosophyCard";
import { techPhilosophy } from "../_library/copy.const";

const TechPhilosophyScroller = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;
        const height = e.currentTarget.clientHeight;
        const index = Math.round(scrollTop / height);
        setActiveIndex(index);
    };

    return (
        <div
            className="w-fit h-[calc(100vh-120px)] overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth"
            onScroll={handleScroll}
        >
            {techPhilosophy.map((item, i) => (
                <div
                    key={i}
                    className="snap-start  h-[calc(100vh-120px)] flex justify-center items-center"
                >
                    <TechPhilosophyCard item={item} isActive={i === activeIndex} />
                </div>
            ))}
        </div>
    );
};

export default TechPhilosophyScroller;
