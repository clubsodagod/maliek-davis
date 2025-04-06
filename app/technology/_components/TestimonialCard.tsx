"use client"

import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import { Testimonial } from './SocialProof';
import { span } from 'motion/react-client';
import Link from 'next/link';
import Image from 'next/image';

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    testimonial
}) => {

    return (
        <ComponentTransition>
            <div
                className='flex flex-col gap-6 justify-between'
            >
                <div
                    className='w-full flex gap-3'
                >

                    <div
                        className=' flex-1/2 min-w-[35vw] md:h-[55vw] 2xl:max-h-[65vh]'
                    >
                        <Box
                            component={MotionDiv}
                            className="rounded-4xl w-[50vw] h-[55vw] 2xl:max-h-[65vh] absolute left-[-15vw]"
                            sx={{
                                bgcolor: "#232323",
                            }}
                        >

                            <Image 
                                alt={testimonial.projectName}
                                src={testimonial.photo}
                                sizes='100vw' width={9} height={16} 
                                style={{
                                    objectFit:"cover",
                                    objectPosition:"0 0"
                                }}
                                className='w-[100%] h-[100%] rounded-4xl'
                            />
                        </Box>
                    </div>

                    <div
                        className='flex flex-col gap-3   relative   overflow-x-hidden justify-center'
                    >

                        <Typography variant='subtitle1' fontWeight={40}
                            className=' text-left'
                        >
                            {testimonial.name}
                        </Typography>
                        <Typography variant='body2' fontStyle={"italic"}
                            className=''
                        >
                            {`"${testimonial.review}"`} <Typography component={span} fontWeight={"bold"}>- {testimonial.projectName} </Typography>
                        </Typography>

                        <Link href={`/technology/portfolio${testimonial.path}`}>
                            <Button variant='outlined'>
                                View Case Study
                            </Button>
                        </Link>
                    </div>


                </div>
                <div className='grow' />
                <div>
                    <Link href={`/contact`}>
                        <Button variant='contained'>
                            Let&apos;s Chat Solutions
                        </Button>
                    </Link>
                </div>

            </div>

        </ComponentTransition >
    )
}



export default TestimonialCard;