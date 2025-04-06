"use client"

import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Typography } from '@mui/material';
import React from 'react'

interface WhyChooseMeCardProps {
    benefit: {
        label: string;
        info: string;
    };
    open: boolean;
}

const WhyChooseMeCard: React.FC<WhyChooseMeCardProps> = ({
    benefit: { info, label },
    open,
}) => {

    const height:string = open ? "min-h-[15vh]" : ""

    return (
        <ComponentTransition>
            <MotionDiv

                initial={{ opacity: 1, y: 0 }} // Starts slightly above
                animate={{ opacity: open ? 1 : 1, y: open ? 20 : 20, scaleX: open ? 1.05 : 1 }} // Moves down when open
                exit={{ opacity: 0, y: 0 }} // Moves up when closing
                transition={{ duration: 0.3, ease: "anticipate" }}
                className={` min-w-full ${height} gap-6  flex flex-col items-end pr-6 py-3 `}
                style={{
                    boxShadow: "1px -6px 8px  #17171747",
                    borderTopRightRadius: "75px"
                }}
            >
                <Typography variant='subtitle2' className='w-1/2 ' fontWeight={"bold"}>
                    {label}
                </Typography>

                {
                    open && (
                        <MotionDiv
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                                className='w-full flex justify-end'
                            >
                            <Typography
                                variant='body2' className='w-1/2 mt-6 ml-auto'
                            >
                                {info}
                            </Typography>
                        </MotionDiv>
                    )
                }

            </MotionDiv>
        </ComponentTransition>
    )
}



export default WhyChooseMeCard;