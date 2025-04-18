"use client"

import { MotionDiv } from '@/components/motion/MotionDiv';
import { IBlogPostClient } from '@/library/types/blog.types';
import { Typography } from '@mui/material';
import React from 'react'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';

// import useMediaQuery from '@mui/material/useMediaQuery';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);


const BlogRelatedPostCard: React.FC<{ post: IBlogPostClient }> = ({
    post,
}) => {

    const router = useRouter();

    const CardText = () => {
        return (
            <MotionDiv className='flex flex-col gap-3 p-3 h-full justify-center'>
                <MotionDiv
                className='w-full'
                onClick={(e)=>{e.preventDefault();router.push(`/blog/posts/${post.slug}`)}}
                >
                                    <Typography variant='subtitle1' fontWeight={'bold'} className='cursor-pointer'>
                    {post.title}
                </Typography>
                </MotionDiv>

                <Typography variant='body1' className='line-clamp-2'>
                    {post.meta.description}
                </Typography>
                                        <MotionDiv
                                            className='flex flex-col'
                                        >
                
                                            <Typography variant='body2'>
                                                {post.author.name}
                                            </Typography>
                
                                            <Typography variant='body2'>
                                                {dayjs(post.createdAt).fromNow()}
                                            </Typography>
                
                                        </MotionDiv>
            </MotionDiv>
        )
    }

    return (
        <MotionDiv
            className={` min-w-[300px] h-full flex rounded-4xl`}
            style={{
                backdropFilter: "blur(25px)",
                backgroundColor: "#fafafa45"
            }}
        >

            <CardText />
        </MotionDiv> 
    )
}



export default BlogRelatedPostCard;