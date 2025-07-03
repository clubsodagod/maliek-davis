"use client"

import React, { useState } from 'react'
import { PostCardProps } from './FtPostCard';
import { Skeleton, Typography, Button } from '@mui/material';
import Link from 'next/link';
import ComponentTransition from '../layout/ComponentTransition';
import { MotionDiv } from '../motion/MotionDiv';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SmallPostCard: React.FC<PostCardProps> = ({
    post,
    cardWrapper,
    cardImage,
    w,
    h,
}) => {
    const isLoading = !post;
    const [expanded, setExpanded] = useState(false);

    return (
        <ComponentTransition id={post?._id?.toString() || 'small-post-loading'}>
            <MotionDiv
                {...cardWrapper}
                className="relative cursor-pointer rounded-xl overflow-hidden shadow-md"
                onClick={() => setExpanded((prev) => !prev)}
            >
                <MotionDiv className="flex flex-col gap-3">
                    {/* Image Container */}
                    <div className=" w-full relative">
                        {isLoading ? (
                            <Skeleton variant="rectangular" width="100%" height="100%" />
                        ) : (
                            <>
                                <Image
                                    alt={post.title}
                                    src={post.featuredImg}
                                    className={cardImage.className}
                                    sizes="100vw"
                                    style={{ objectFit: 'cover' }}
                                    width={w}
                                    height={h}
                                />

                                {/* Overlay Content */}
                                <motion.div
                                    initial={{ height: "4rem" }}
                                    animate={{
                                        height: expanded ? "100%" : "4rem",
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="absolute bottom-0 left-0 w-full z-10 backdrop-blur-md bg-black/50 text-white p-4 flex flex-col justify-end"
                                    style={{
                                        borderTopLeftRadius: expanded ? "0.5rem" : "0",
                                        borderTopRightRadius: expanded ? "0.5rem" : "0",
                                    }}
                                >
                                    <Typography variant="subtitle1" fontWeight={600} className="text-white">
                                        {post.title}
                                    </Typography>

                                    {expanded && (
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
                                    )}
                                </motion.div>
                            </>
                        )}
                    </div>

                    {/* Skeleton Description */}
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

export default SmallPostCard;
