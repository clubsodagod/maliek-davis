"use client"

import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Button, Chip, Grid2, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';
import { IBlogPost } from '@/database/models/blog-posts.model';
import { useTheme } from '@mui/material/styles';

interface PostCardProps {
    post: IBlogPost;
    open: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
    post, open
}) => {
    const router = useRouter();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const isOpen = isDesktop || open;

    return (
        <ComponentTransition id={`${post.title}-transition-card`}>
            <MotionDiv
                className="post-card overflow-hidden rounded-t-4xl md:rounded-[100px] p-4"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 20, scaleX: isOpen ? 1 : 1.03 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "anticipate" }}
                style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: "1px -6px 8px  #17171747",
                }}
            >
                <Typography
                    component={'div'}
                    onClick={isOpen ? () => router.push(`/blog/posts/${post.slug}`) : undefined}
                    variant="subtitle1"
                    fontWeight="bold"
                    className="pt-2 pl-3 md:text-center md:px-3"
                >
                    {post.title}
                </Typography>

                {isOpen && (
                    <MotionDiv
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex flex-col gap-6 justify-center items-center mt-6"
                    >
                        <MotionDiv className="flex justify-center">
                            <div className="w-full h-[40vh] md:w-[300px] md:h-[200px]">
                                <Image
                                    alt={`${post.title} featured photo for post.`}
                                    src={post.featuredImg}
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

                        <Grid2 container gap={2}>
                            <Grid2 size="auto">
                                <Chip
                                    onClick={() => router.push(`/blog/categories/${post.category.slug}`)}
                                    color='primary'
                                    label={post.category.name}
                                    sx={{
                                        color: "#fafafa",
                                        fontSize: "0.95rem"
                                    }}
                                />
                            </Grid2>
                        </Grid2>

                        <div className="flex flex-col justify-start md:text-center">
                            <Typography variant="body1" className="line-clamp-2">
                                {post.metaDescription}
                            </Typography>
                        </div>

                        <MotionDiv
                            className="flex gap-3 justify-center md:items-center"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <Button onClick={() => router.push(`/blog/posts/${post.slug}`)} variant="contained">
                                Go to Post
                            </Button>
                        </MotionDiv>
                    </MotionDiv>
                )}
            </MotionDiv>
        </ComponentTransition>
    );
};

export default PostCard;
