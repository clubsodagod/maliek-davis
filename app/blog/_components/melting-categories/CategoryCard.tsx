/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import ComponentTransition from '@/components/layout/ComponentTransition'
import { MotionDiv } from '@/components/motion/MotionDiv'
import { IBlogPost } from '@/database/models/blog-posts.model'
import { ICategory } from '@/database/models/category.model'
import { IBlogPostClient, NormalizedCategory } from '@/library/types/blog.types'
import { Typography, Button } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const MeltingCategoryCard: React.FC<{
    category: ICategory | undefined;
    posts: IBlogPost[]|undefined;
    open: boolean;
}> = ({
    category, open, posts,
}) => {


        return (
            <ComponentTransition id={`${category?._id}-transition-card`}>
                <MotionDiv
                    className="investment-card overflow-hidden rounded-tr-4xl md:rounded-tr-[100px] p-4 "
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
                        {category?.name}
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
                                        alt={`${category?.name} featured photo for investment.`}
                                        src={category?.photo || ""}
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
                                    {category?.description}
                                </Typography>

                                <MotionDiv
                                    className="flex gap-3 justify-center mt-4 md:justify-start"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <Button href={`/blog/categories/${category?.slug}`} variant="contained">More</Button>
                                </MotionDiv>
                            </div>
                        </MotionDiv>
                    )}
                </MotionDiv>
            </ComponentTransition>
        );
    };

export default MeltingCategoryCard;
