"use client"

import { InvestmentFocus } from '@/app/investments/_library/copy'
import ComponentTransition from '@/components/layout/ComponentTransition'
import { MotionDiv } from '@/components/motion/MotionDiv'
import { Typography, Button } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const InvestmentFocusCard: React.FC<{
    investment: InvestmentFocus;
    open: boolean;
    index: number;
}> = ({
    investment, open
}) => {
        const [strategyIndex, setStrategyIndex] = useState(0);

        useEffect(() => {
            if (!open) return;

            const interval = setInterval(() => {
                setStrategyIndex(prev => (prev + 1) % investment.strategies.length);
            }, 3000);

            return () => clearInterval(interval);
        }, [open, investment.strategies.length]);

        const currentStrategy = investment.strategies[strategyIndex];

        return (
            <ComponentTransition id={`${investment.category}-transition-card`}>
                <MotionDiv
                    className="investment-card overflow-hidden rounded-t-4xl md:rounded-t-[100px] p-4"
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
                    <Typography variant="subtitle1" fontWeight="bold" className="pt-2 pl-3">
                        {investment.category}
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
                                        alt={`${investment.category} featured photo for investment.`}
                                        src={investment.photo}
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

                            <div className="flex flex-col justify-start md:text-left my-4">
                                <Typography variant="body1">
                                    {currentStrategy.description}
                                </Typography>

                                <MotionDiv
                                    className="flex gap-3 justify-center mt-4 md:justify-start"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <Button variant="contained">More</Button>
                                    <Button variant="outlined">Subscribe</Button>
                                </MotionDiv>
                            </div>
                        </MotionDiv>
                    )}
                </MotionDiv>
            </ComponentTransition>
        );
    };

export default InvestmentFocusCard;
