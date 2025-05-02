"use client"

import { MotionDiv } from '@/components/motion/MotionDiv';
import { IBlogPostClient } from '@/library/types/blog.types';
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import React from 'react'


const PostFeaturedImage: React.FC<{
    description:IBlogPostClient["meta"]["description"]|undefined;
    featuredImg:IBlogPostClient["featuredImg"]|undefined;
}> = ({
    description, featuredImg
}) => {

    return (
        <MotionDiv
            className='w-full h-[65dvh] absolute left-0 top-0'
        >

            {
                featuredImg && description ?
                    <Image
                        alt={description}
                        src={featuredImg}
                        sizes='100vw'
                        width={16}
                        height={9}
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                        }}
                        priority
                    /> :
                    <Skeleton
                        width={"100%"}
                        height={"100%"}
                        animation="wave"
                    />
            }

        </MotionDiv>
    )
}



export default PostFeaturedImage;