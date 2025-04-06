"use client";

import { motion, MotionProps } from "framer-motion";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { CorePrinciple } from "./CoreGuidingPrinciples";
import { Typography } from "@mui/material";

type CorePrincipleComponentProps = {
    principle: CorePrinciple;
} & MotionProps;

const CorePrincipleCard = ({ principle, ...motionProps }: CorePrincipleComponentProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    return (
        <motion.div
            {...motionProps}
            ref={cardRef}
            className="min-h-full max-h-full w-full flex flex-col items-center justify-center gap-6 px-6 text-center"
        >
            <Typography variant="h5" className="text-3xl font-bold mb-4">
                {principle.title}
            </Typography>
            <Image
                priority
                width={9}
                height={16}
                sizes="100vw"
                src={principle.photo}
                alt={principle.title}
                style={{
                    objectFit: "contain"
                }}
                className="w-full h-[200px] max-w-xl object-cover rounded-2xl shadow-md mb-8"
            />
            <ul className="space-y-2 text-lg">
                {principle.bullets.map((point, idx) => (
                    <li key={idx}> <Typography variant="body1"> ✅ {point}</Typography></li>
                ))}
            </ul>
        </motion.div>
    );
};

export default CorePrincipleCard;
