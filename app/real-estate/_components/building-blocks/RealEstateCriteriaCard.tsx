"use client"

import { RealEstateStrategy } from '@/app/investments/_library/copy'
import ComponentTransition from '@/components/layout/ComponentTransition'
import { MotionDiv } from '@/components/motion/MotionDiv'
import { Typography, Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const RealEstateCriteriaCard: React.FC<{
    criteria: RealEstateStrategy;
    open: boolean;
    index: number;
}> = ({
    criteria, open
}) => {
        const [strategyIndex, setStrategyIndex] = useState(0);

        useEffect(() => {
            if (!open) return;

            const interval = setInterval(() => {
                setStrategyIndex(prev => (prev + 1) % criteria.bulletPoints.length);
            }, 3000);

            return () => clearInterval(interval);
        }, [open, criteria.bulletPoints.length]);

        const currentStrategy = criteria.bulletPoints[strategyIndex];

        return (
            <ComponentTransition id={`${criteria.title}-transition-card`}>
                <MotionDiv
                    className="criteria-card overflow-hidden rounded-t-4xl md:rounded-t-[100px] p-4"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: open ? 1 : 1, y: open ? 20 : 20, scaleX: open ? 1 : 1.03 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: "anticipate" }}
                    style={{
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxShadow: "1px -6px 8px  #17171747",
                    }}
                >
                    <Typography variant="subtitle1" fontWeight="bold" className="pt-4 pl-6">
                        {criteria.title}
                    </Typography>

                    {open && (
                        <MotionDiv
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="md:flex gap-6"
                        >
                            <MotionDiv className="flex justify-center my-4">
                                <div
                                    className="w-[30vh] h-[30vh] md:w-[300px] md:h-[300px]"
                                >
                                    <Image
                                        alt={`${criteria.title} featured photo for criteria.`}
                                        src={criteria.photo}
                                        sizes="100vw"
                                        width={9}
                                        height={16}
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "25%",
                                        }}
                                        className='w-full h-full'
                                    />
                                </div>

                            </MotionDiv>

                            <div className="flex flex-col text-center justify-start md:text-left my-4">
                                <Typography variant="body1">
                                    {currentStrategy}
                                </Typography>

                                <MotionDiv
                                    className="flex gap-3 justify-center mt-4 md:justify-start"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <Button LinkComponent={Link} variant="contained">Let&apos;s Talk Alignment</Button>
                                </MotionDiv>
                            </div>
                        </MotionDiv>
                    )}
                </MotionDiv>
            </ComponentTransition>
        );
    };

export default RealEstateCriteriaCard;
