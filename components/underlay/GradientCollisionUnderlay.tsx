"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

// Function to generate a random position within the viewport
const randomPosition = () => ({
    x: (Math.random() * 10) * (window.innerWidth - 200), // Ensures blobs stay within the window
    y: Math.random() * 10 * (window.innerHeight - 200),
});

const Blob = ({ color }: { color: string }) => {
    const [position, setPosition] = useState(randomPosition());

    useEffect(() => {
        const updatePosition = () => setPosition(randomPosition());

        const interval = setInterval(updatePosition, 5000);
        window.addEventListener("resize", updatePosition); // Recalculate positions on resize

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", updatePosition);
        };
    }, []);

    return (
        <motion.div
            className="absolute w-40 h-40 rounded-full blur-3xl opacity-50"
            style={{
                background: color,
                boxShadow: "inset 50px 50px 17px 0px #60abe4, inset 100px 100px 17px 0px #8f11cc"
            }}
            animate={position}
            transition={{ duration: 4, ease: "easeInOut" }}
        />
    );
};

const GradientCollisionUnderlay = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full">
            <Blob color="linear-gradient(47deg, #60abe4 21%, #8f11cc 67%, #60abe4 81%)" />
            <Blob color="linear-gradient(134deg, #8f11cc 21%, #60abe4 67%, #8f11cc 81%)" />
            <Blob color="linear-gradient(94deg, #60abe4 21%, #8f11cc 67%, #60abe4 81%)" />
        </div>
    );
};

export default GradientCollisionUnderlay;
