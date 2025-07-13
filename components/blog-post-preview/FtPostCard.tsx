"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Typography, Skeleton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ComponentTransition from '../layout/ComponentTransition';
import { MotionDiv } from '../motion/MotionDiv';
import { MotionDivProps } from '@/library/types/motion.types';
import Link from 'next/link';
import { IBlogPost } from '@/database/models/blog-posts.model';

interface ImgProps extends MotionDivProps {
    img?: HTMLImageElement;
}

export interface PostCardProps {
    post: IBlogPost | null;
    cardWrapper: MotionDivProps;
    cardImage: ImgProps;
    w: number;
    h: number;
}

const FtPostCard: React.FC<PostCardProps> = ({
    post,
    cardWrapper,
    cardImage,
}) => {
    const isLoading = !post;
    const [expanded, setExpanded] = useState(false);

    return (
        <ComponentTransition id={post?._id?.toString() || 'ft-post-loading'}>
            <MotionDiv
                {...cardWrapper}
                className="relative cursor-pointer rounded-xl min-w-full shadow-md"
                onClick={() => setExpanded((prev) => !prev)}
            >
                    <MotionDiv className="min-w-full h-[45vh] 2xl:h-fit 2xl:w-fit  overflow-hidden rounded-lg relative group">
                    <div className=" w-full relative h-full  2xl:max-h-[600px]">
                        {isLoading ? (
                            <Skeleton variant="rectangular" width="100%" height="100%" />
                        ) : (
                            <>
                                <Image
                                    alt={post.title}
                                    src={post.featuredImg}
                                    className={`${cardImage.className}   w-full min-h-full`}
                                    sizes="100vw"
                                    width={9}
                                    height={16}
                                    style={{ objectFit: 'cover' }}
                                />

                                {/* Overlay Content */}
                                <motion.div
                                    // initial={{ height: "fit" }}
                                    animate={{ height: expanded ? "100%" : "33%" }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="absolute bottom-0 left-0 w-full z-10 backdrop-blur-md bg-black/50 text-white p-5 flex flex-col justify-start  min-w-full"
                                    style={{
                                        borderTopLeftRadius: expanded ? "0.5rem" : "0",
                                        borderTopRightRadius: expanded ? "0.5rem" : "0",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                        className="text-white line-clamp-2"
                                    >
                                        {post.title}
                                    </Typography>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="mt-3"
                                        >
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                className="mb-4"
                                            >
                                                {post.metaDescription}
                                            </Typography>
                                            <Link href={`/blog/posts/${post.slug}`} passHref>
                                                <Button
                                                    variant="text"
                                                    color="inherit"
                                                    size="small"
                                                    className="underline"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Read Full Article
                                                </Button>
                                            </Link>
                                        </motion.div>
  
                                </motion.div>
                            </>
                        )}
                    </div>

                    {/* Skeleton Loading State */}
                    {isLoading && (
                        <MotionDiv>
                            <Skeleton variant="text" width="100%" height={20} />
                            <Skeleton variant="text" width="90%" height={20} />
                        </MotionDiv>
                    )}
                </MotionDiv>
            </MotionDiv>
        </ComponentTransition>
    );
};

export default FtPostCard;
