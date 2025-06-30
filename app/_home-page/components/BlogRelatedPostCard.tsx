"use client"

import { MotionDiv } from '@/components/motion/MotionDiv';
import { Typography } from '@mui/material';
import React from 'react'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { IBlogPost } from '@/database/models/blog-posts.model';

// import useMediaQuery from '@mui/material/useMediaQuery';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);


const BlogRelatedPostCard: React.FC<{ post: IBlogPost | undefined }> = ({
    post,
}) => {

    const router = useRouter();

    const CardText = () => {
        return (
            <MotionDiv className='flex flex-col   h-full justify-center'>
                <MotionDiv
                    className="w-full p-3 bg-cover bg-center bg-no-repeat cursor-pointer rounded-t-4xl"
                    onClick={(e) => {
                        e.preventDefault();
                        router.push(`/blog/posts/${post?.slug}`);
                    }}
                    style={{
                        backgroundImage: `url(${post?.featuredImg})`,
                    }}
                >
                    <div className="bg-black/30 backdrop-blur-sm p-2 rounded-4xl p-4">
                        <Typography variant="subtitle2" fontWeight="bold" className="text-[#fafafa]">
                            {post?.title}
                        </Typography>
                    </div>
                </MotionDiv>


                <div
                    className='p-3 flex flex-col gap-3 bg-(--foreground) text-(--background) rounded-b-4xl'
                >
                    <MotionDiv
                        className='flex flex-col'
                    >

                        <Typography variant='body2' className='line-clamp-4'>
                            {post?.metaDescription}
                        </Typography>

                        <div
                            className="flex justify-between"
                        >

                            <Typography variant='body2' className="pt-1">
                                {post?.author.firstName}
                            </Typography>
                            <Typography variant='body2' className="pt-1">
                                {dayjs(post?.createdAt).fromNow()}
                            </Typography>
                        </div>

                    </MotionDiv>
                </div>

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