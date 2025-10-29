/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CarouselCard from "./CarouselCard";

/**
 * ──────────────────────────────────────────────────────────────────────────
 * Schemas (lightweight, extensible)
 * ──────────────────────────────────────────────────────────────────────────
 */
export type Price = {
    size: "Single" | "Regular" | "Large" | "Party";
    quantity?: number;           // e.g., # of wings
    priceCents: number;          // store as cents for precision
    note?: string;               // e.g., "includes yum-yum sauce"
};

export type FoodProduct = {
    id: string;
    name: string;
    slug: string;
    description: string;
    images: string[];            // first used as primary
    tags?: string[];
    prices: Price[];
};

const cents = (dollars: number) => Math.round(dollars * 100);

/**
 * Seed products (easily add more later)
 * Images from: /public/the-lunch-box/{salmon-bites.png,wings.png,fries.png}
 */
const products: FoodProduct[] = [
    {
        id: "wings",
        name: "Crazy Crispy Wings",
        slug: "crazy-crispy-wings",
        description:
            "Shatter-crisp skin with juicy center. Tossed in your choice: Mild, Hot, or Parmesan Garlic.",
        images: ["/images/the-lunch-box/wings.png"],
        tags: ["Signature", "Crispy"],
        prices: [
            { size: "Regular", quantity: 8, priceCents: cents(12) },
            { size: "Large", quantity: 12, priceCents: cents(16) },
            { size: "Party", quantity: 20, priceCents: cents(25), note: "Best value" },
        ],
    },
    {
        id: "salmon-bites",
        name: "Salmon Bites",
        slug: "salmon-bites",
        description:
            "Buttery salmon cubes with garlic mash & house yum-yum drizzle. Fresh, rich, unforgettable.",
        images: ["/images/the-lunch-box/salmon-bites.png"],
        tags: ["Chef Favorite"],
        prices: [
            { size: "Regular", priceCents: cents(16), note: "with garlic mash" },
            { size: "Large", priceCents: cents(19) },
        ],
    },
    {
        id: "fries",
        name: "Crispy Fermented Fries",
        slug: "crispy-fermented-fries",
        description:
            "Natural tang + ultra-crisp exterior. Add garlic butter or parmesan dusting for the win.",
        images: ["/images/the-lunch-box/fries.png"],
        tags: ["Add-On", "Crunch"],
        prices: [
            { size: "Regular", priceCents: cents(6) },
            { size: "Large", priceCents: cents(8) },
        ],
    },
];

/**
 * Utility to format the cheapest visible price for a product
 */
const displayFromPrice = (p: FoodProduct) =>
    `$${(Math.min(...p.prices.map(x => x.priceCents)) / 100).toFixed(2)}`;

/**
 * ──────────────────────────────────────────────────────────────────────────
 * HeroCarousel
 * ──────────────────────────────────────────────────────────────────────────
 */
type HeroCarouselProps = {
    autoMs?: number; // autoplay interval
};

const clampIndex = (i: number, len: number) => (i + len) % len;

const HeroCarousel: React.FC<HeroCarouselProps> = ({ autoMs = 3800 }) => {
    const [index, setIndex] = React.useState(0);
    const [isPaused, setPaused] = React.useState(false);



    // Keyboard arrows
    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") setIndex(i => (i + 1) % products.length);
            if (e.key === "ArrowLeft") setIndex(i => clampIndex(i - 1, products.length));
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const go = (dir: 1 | -1) =>
        setIndex(i => clampIndex(i + dir, products.length));

    /**
     * Card: framer-motion with subtle 3D lane effect controlled by `offset`
     */
    const Card: React.FC<{ item: FoodProduct; offset: number; i: number }> = ({
        item,
        offset,
        i,
    }) => {
        const depth = -90 * Math.abs(offset);     // z pushback
        const yaw = -16 * offset;                 // face toward center
        const shift = 60 * offset;                // x lane shift
        const scale = offset === 0 ? 1 : 0.93;

        return (
            <motion.div
                key={item.id}
                className="group relative w-[280px] sm:w-[320px] rounded-2xl border border-white/10 bg-neutral-900/70 shadow-xl overflow-hidden"
                style={{
                    transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, x: shift, z: depth - 40, rotateY: yaw }}
                animate={{
                    opacity: 1,
                    x: shift,
                    z: depth,
                    rotateY: yaw,
                    scale,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 24, mass: 0.8 }}
                whileHover={{ z: depth + 40, scale: scale * 1.02 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, info) => {
                    if (info.velocity.x > 400 || info.offset.x > 120) go(-1);
                    else if (info.velocity.x < -400 || info.offset.x < -120) go(1);
                }}
                aria-roledescription="slide"
                aria-label={`${item.name} — slide ${i + 1} of ${products.length}`}
            >
                {/* Media */}
                <div className="relative h-[180px] sm:h-[220px] w-full bg-neutral-800">
                    <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 280px, 320px"
                        className="object-cover"
                        priority={i === index}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/5" />
                    {item.tags?.[0] && (
                        <div className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-900 backdrop-blur">
                            {item.tags[0]}
                        </div>
                    )}
                </div>

                {/* Body */}
                <div className="p-4">
                    <div className="mb-1 flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-white leading-snug">
                            {item.name}
                        </h3>
                        <span className="rounded-md bg-white/10 px-2 py-1 text-sm text-white">
                            From {displayFromPrice(item)}
                        </span>
                    </div>
                    <p className="mb-3 text-sm text-white/70 line-clamp-2">{item.description}</p>

                    <button
                        className="mt-1 w-full rounded-xl bg-amber-400 text-neutral-900 font-semibold py-2.5 shadow-[0_10px_30px_rgba(255,193,7,0.35)] transition-colors hover:bg-amber-300 focus:outline-none"
                        onClick={() => {
                            // hook up to router or cart later
                            console.log("Order:", item.slug);
                        }}
                    >
                        Order Now
                    </button>
                </div>

                {/* Background texture */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ transform: "translateZ(-1px)" }}
                >
                    <div className="absolute bottom-3 right-4 text-7xl font-black tracking-tight text-white/5">
                        LUNCH
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <section
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* BG + headline */}
            <div className="mx-auto  py-10 sm:py-10">
                {/* 3D lane container */}
                <div className="relative">


                    <div className="relative"
                        style={{ perspective: 1200 }}>
                        {/* Track (render all with offsets for lane effect) */}
                        <div className="flex items-stretch gap-6 sm:gap-8 md:justify-center">
                            {products.map((item, i) => {

                                return <CarouselCard imageSrc={item.images[0]} title={item.name} price={displayFromPrice(item)} tag={item.tags?.[0]} key={item.id} offset={i - 1}
                                />;
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Soft vignette edges */}
        </section>
    );
};

export default HeroCarousel;
