"use client"

import React, { useState } from 'react'
import { coreValues } from '@/app/about/_library/copy.const';
import Image from 'next/image';
import { Button, Typography } from '@mui/material';


const CoreValuesSlider = ({ }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % coreValues.length);
    };

    const prev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? coreValues.length - 1 : prev - 1
        );
    };

    const currentValue = coreValues[currentIndex];

    return (
        <div className="flex flex-col items-center gap-6 py-12 px-4 sm:px-8 md:px-16 lg:px-32">
            <Typography variant="h5" fontWeight={700}
                color="secondary.dark"
            >
                {currentValue.name}
            </Typography>

            <Image
                src={currentValue.photo}
                alt={currentValue.name}
                width={500}
                height={300}
                className="rounded-xl shadow-lg object-cover"
            />

            <Typography variant="body1" className="text-center max-w-2xl">
                {currentValue.message}
            </Typography>

            {/* Index Indicator */}
            <div className="flex gap-2 mt-4">
                {coreValues.map((_, i) => (
                    <span
                        key={i}
                        className={`h-3 w-3 rounded-full ${i === currentIndex ? "bg-white" : "bg-gray-500"
                            }`}
                    />
                ))}
            </div>

            {/* Optional Navigation Buttons */}
            <div className="flex gap-4 mt-6">
                <Button variant="contained" onClick={prev} className="px-4 py-2 bg-gray-800 rounded text-white">
                    Prev
                </Button>
                <Button variant="outlined" onClick={next} className="px-4 py-2 bg-gray-800 rounded text-white">
                    Next
                </Button>
            </div>
        </div>
    );
};



export default CoreValuesSlider;