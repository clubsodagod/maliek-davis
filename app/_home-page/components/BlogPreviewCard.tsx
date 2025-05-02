"use client"

import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { IBlogPost } from '@/database/models/blog-posts.model';
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
                className='w-full  h-full flex flex-col gap-6 relative'
            >
                <div
                className='w-[110vw] md:w-full  xl:w-full'
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
                        className='rounded-4xl h-[40vh] md:landscape:h-[50vh] xl:h-[60dvh] w-full '
                    />
                </div>

                <div className='absolute top-0 text-white h-[40vh] md:landscape:h-[50vh] xl:h-[60dvh] flex flex-col justify-end  py-6 px-6 pl-6 '>
                    <MotionDiv>
                        <Typography variant='h6' fontWeight={"bold"}>
                            {post?.title}
                        </Typography>
                    </MotionDiv>

                    <MotionDiv>
                        <Typography variant='body1'>
                            {post?.metaDescription}
                        </Typography>
                    </MotionDiv>

                    <MotionDiv
                        className='flex gap-3'
                    >

                        <Image
                            alt={`something`}
                            src={post?.featuredImg||""}
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
                                {post?.author.toString()}
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