"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { TechPhilosophyPoint } from "../_library/copy.const";
import { Typography } from "@mui/material";

type Props = {
    item: TechPhilosophyPoint;
    isActive: boolean;
};

const TechPhilosophyCard = ({ item, isActive }: Props) => {
    return (
        <motion.div
            className="w-full h-full px-6 flex flex-col 2xl:flex-row items-center justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{
                opacity: isActive ? 1 : 0,
                transition: { duration: 0.3, ease: "easeInOut" }
            }}
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                    y: isActive ? 0 : 20,
                    opacity: isActive ? 1 : 0,
                    transition: {  duration: 0.2 }
                }}
                className="w-full lg:w-1/2 text-white text-center lg:text-left"
            >
                <Typography color="secondary.light" variant="h4" className="text-3xl font-bold mb-4">{item.title}</Typography>
                <Typography  variant="subtitle1" className="text-lg">{item.description}</Typography>
            </motion.div>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{
                    x: isActive ? 0 : 100,
                    opacity: isActive ? 1 : 0,
                    transition: {  duration: 0.2 }
                }}
                className="w-full lg:w-1/2 h-[300px] relative"
            >
                <Image
                    src={item.photo}
                    alt={item.title}
                    fill
                    className="object-cover rounded-xl shadow-md"
                />
            </motion.div>
        </motion.div>
    );
};

export default TechPhilosophyCard;
