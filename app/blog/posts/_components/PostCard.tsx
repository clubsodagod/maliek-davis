"use client"

import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Button, Chip, Grid2, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';
import { IBlogPost } from '@/database/models/blog-posts.model';

interface PostCardProps {
    post: IBlogPost;
    open: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
    post, open
}) => {

    const router = useRouter();

    return (

        <ComponentTransition id={`${post.title}-transition-card`}>
            <MotionDiv
                className="post-card overflow-hidden rounded-t-4xl md:rounded-t-[100px] p-4"
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

                <Typography component={'div'} onClick={open ? () => { router.push(`/blog/posts/${post.slug}`) } : undefined} variant="subtitle1" fontWeight="bold" className="pt-2 pl-3">
                    {post.title}
                </Typography>


                {open && (
                    <MotionDiv
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="md:flex md:flex-col gap-6 md:justify-center md:items-center" 
                    >
                        <MotionDiv className="flex justify-center my-4">
                            <div
                                className="w-full h-[40vh] md:w-[300px] md:h-[300px]"
                            >
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

                        <Grid2 container
                        gap={2}
                        >
                            <Grid2
                                size="auto"
                            >
                                <Chip
                                    onClick={()=>{router.push(`/blog/categories/${post.category.slug}`)}}
                                    color='primary'
                                    label={post.category.name}
                                    sx={{
                                        color:"#fafafa",
                                        fontSize:"0.95rem"
                                    }}
                                />
                            </Grid2>
                            {
                                post.tags.map((kw, i) => {
                                    return (
                                        <Grid2
                                            key={`${kw} ${i}`}
                                            size="auto"
                                        >
                                            <Chip
                                                color='secondary'
                                                label={kw}
                                                sx={{
                                                    color:"#fafafa",
                                                    fontSize:"0.95rem"
                                                }}
                                            />
                                        </Grid2>
                                    )
                                })
                            }
                        </Grid2>
                        <div className="flex flex-col justify-start md:text-center my-4">
                            <Typography variant="body1">
                                {post.metaDescription}
                            </Typography>

                            <MotionDiv
                                className="flex gap-3 justify-center md:items-center mt-4 "
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <Button onClick={() => { router.push(`/blog/posts/${post.slug}`) }} variant="contained">Go to Post</Button>
                            </MotionDiv>
                        </div>
                    </MotionDiv>
                )}

            </MotionDiv>
        </ComponentTransition>
    )
}



export default PostCard;