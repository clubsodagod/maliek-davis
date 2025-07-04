"use client"

import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { IBlogPost } from '@/database/models/blog-posts.model';
import Link from 'next/link';
// import useMediaQuery from '@mui/material/useMediaQuery';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);


const BlogPreviewCard: React.FC<{ post: IBlogPost|undefined }> = ({
    post,
}) => {
    


    // const mobile = useMediaQuery(`(max-width:767px)`);

    return (
        <ComponentTransition>
            <MotionDiv
                className='w-full  h-fit flex flex-col gap-6 relative  bg-(--foreground) rounded-4xl shadow-gray-400 shadow-md'
            >
                <div
                className='w-full md:w-full  xl:w-full'
                >
                    <Image
                        alt={`something`}
                        src={post?.featuredImg||""}
                        sizes='100vw'
                        width={9}
                        height={16}
                        style={{
                            objectFit:"cover"
                        }}
                        className='rounded-t-4xl h-[40vh] md:landscape:h-[25vh]  w-full '
                    />
                </div>

                <div className='  text-(--background)  flex flex-col justify-end  pb-6 px-6  '>
                    <MotionDiv>
                        <Link href={`/blog/posts/${post?.slug}`}>
                            <Typography  variant='h6' fontWeight={"bold"}>
                                {post?.title}
                            </Typography>
                        </Link>
                        
                    </MotionDiv>

                    <MotionDiv>
                        <Typography variant='body1'>
                            {post?.metaDescription}
                        </Typography>
                    </MotionDiv>

                    <MotionDiv
                        className='flex gap-3 mt-3'
                    >

                        <Image
                            alt={`something`}
                            src={post?.author.avatar||""}
                            sizes='100vw'
                            width={9}
                            height={16}
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "100%",
                            }}
                        />
                        <MotionDiv
                            className='flex flex-col'
                        >

                            <Typography variant='body1'>
                                {post?.author.firstName}
                            </Typography>

                            <Typography variant='body1'>
                                {dayjs(post?.createdAt).fromNow()}
                            </Typography>

                        </MotionDiv>

                    </MotionDiv>

                </div>
            </MotionDiv>
        </ComponentTransition>
    )
}



export default BlogPreviewCard;