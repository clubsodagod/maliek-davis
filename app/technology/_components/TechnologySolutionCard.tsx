"use client"

import React from 'react'
import { Solution, SolutionCategory } from './TechnologySolutions'
import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface TechnologySolutionCardProps {
    solution: SolutionCategory;
    open: boolean;
}

const TechnologySolutionCard: React.FC<TechnologySolutionCardProps> = ({
    solution, open,
}) => {


    const height: string = open ? "min-h-[15vh]" : ""

    const ServiceComp: React.FC<{ solution: Solution }> = ({ solution }) => {
        return (
            <MotionDiv className='flex flex-col gap-1 flex-1/3 justify-center items-center'>
                <Image
                    alt={solution.heading}
                    src={solution.photo}
                    width={9} height={16} sizes='100vw'
                    style={{
                        objectFit: "contain",
                    }}
                    className='w-[100px] h-[100px]'
                />
                <Typography variant='subtitle2' className='text-center'>
                    {solution.heading}
                </Typography>
            </MotionDiv>
        )
    }

    return (
        <ComponentTransition id={solution.title}>
            <MotionDiv
                initial={{ opacity: 1, y: 0 }} // Starts slightly above
                animate={{ opacity: open ? 1 : 1, y: open ? 20 : 20, scaleX: open ? 1.05 : 1 }} // Moves down when open
                exit={{ opacity: 0, y: 0 }} // Moves up when closing
                transition={{ duration: 0.3, ease: "anticipate" }}
                className={`w-full flex flex-col p-6 ${height} rounded-t-4xl`}
                style={{
                    boxShadow: "1px -6px 8px  #17171747",
                }}
            >

                <Typography
                    variant={open ? 'subtitle1' : 'caption'} fontWeight={"bold"}
                    className='w-full text-center'
                >
                    {solution.title}
                </Typography>
                <div
                    className='flex flex-col gap-6 justify-center items-center mt-12'
                >
                    {
                        open && (
                            <>
                                <div
                                    className='flex justify-center'
                                >
                                    {
                                        solution.solutions.map((s, i) => {

                                            return (
                                                <ServiceComp
                                                    key={`${s.heading} ${i}`}
                                                    solution={s}
                                                />
                                            )
                                        })
                                    }
                                </div>

                                <Typography variant='body2' className='text-center cursor-pointer' fontWeight={"bold"}>
                                    {solution.solutions?.[0]?.results?.[0] || 'No results available'}
                                </Typography>

                                <MotionDiv>
                                    <Link
                                        href={'/contact'}
                                    >
                                        <Button variant='contained'>
                                            Let&apos;s Chat Solutions
                                        </Button>
                                    </Link>
                                </MotionDiv>
                            </>

                        )
                    }
                </div>


            </MotionDiv>
        </ComponentTransition>
    )
}



export default TechnologySolutionCard;