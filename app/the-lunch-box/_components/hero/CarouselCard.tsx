/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
// components/CarouselCard.tsx
"use client";

import * as React from "react";
import { motion } from "motion/react";

type CarouselCardProps = {
    imageSrc: string;
    title: string;
    price?: string;
    tag?: string;           // e.g., "New", "Best Seller"
    rating?: number;        // 0–5
    ctaLabel?: string;      // e.g., "Order Now"
    onClick?: () => void;
    /** Relative position to the active slide. 0=center, -1=left, 1=right, etc. */
    offset?: number;
    className?: string;
};

export default function CarouselCard({
    imageSrc,
    title,
    price,
    tag,
    rating,
    ctaLabel = "Order",
    onClick,
    offset = 0,
    className = "",
}: CarouselCardProps) {
    // Lane transform derived from offset (for the carousel to control depth & yaw)
    const laneX = 60 * offset;             // px shift left/right
    const laneYaw = -18 * offset;          // deg rotateY (face toward center)
    const laneZ = 60 * Math.abs(offset) - 100;
    const laneScale = offset === 0 ? 1 : 0.94;

    // simple hover tilt via pointer position (adds on top of lane transform)
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });

    const handlePointerMove = (e: React.PointerEvent) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;  // 0..1
        const py = (e.clientY - rect.top) / rect.height;  // 0..1
        // Map to small tilt range
        const ry = (px - 0.5) * 10; // rotateY
        const rx = -(py - 0.5) * 8; // rotateX
        setTilt({ rx, ry });
    };

    const resetTilt = () => setTilt({ rx: 0, ry: 0 });

    return (
        <div
            className={`relative select-none ${className}`}
            style={{ perspective: 1200 }}
        >
            <motion.div
                ref={cardRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={resetTilt}
                initial={{ opacity: 0, z: laneZ - 60, rotateY: laneYaw, x: laneX, scale: laneScale * 0.98 }}
                animate={{
                    opacity: 1,
                    x: laneX,
                    z: laneZ,
                    rotateY: laneYaw + tilt.ry,
                    rotateX: tilt.rx,
                    scale: laneScale,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ z: laneZ + 40, scale: laneScale * 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.8 }}
                className="group relative w-[280px] rounded-2xl overflow-hidden bg-neutral-900/70 border border-white/10 shadow-xl"
            >
                {/* image */}
                <div className="relative aspect-5/7 w-full rounded-t-2xl">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="h-full w-full object-cover rounded-2xl"
                        draggable={false}
                    />
                    {/* top gradient + tag */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b rounded-t-2xl from-black/30 via-transparent to-black/0" />
                    {tag && (
                        <div className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-900 backdrop-blur">
                            {title}
                        </div>
                    )}
                </div>

                {/* body */}
                {/* <div className="relative z-10 p-4">
                    <div className="mb-1 flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-white leading-snug">
                            {title}
                        </h3>
                        {price && (
                            <span className="rounded-md bg-white/10 px-2 py-1 text-sm text-white">
                                {price}
                            </span>
                        )}
                    </div>

                    
                    {typeof rating === "number" && (
                        <div
                            className="mb-3 text-[13px] text-white/80"
                            aria-label={`Rating ${rating} out of 5`}
                        >
                            {"★".repeat(Math.round(rating))}
                            <span className="text-white/30">
                                {"★".repeat(5 - Math.round(rating))}
                            </span>
                            <span className="ml-1 align-middle text-white/60">
                                {rating.toFixed(1)}
                            </span>
                        </div>
                    )}

                </div> */}


            </motion.div>
        </div>
    );
}
