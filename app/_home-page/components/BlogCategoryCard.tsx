"use client"

import { MotionDiv } from '@/components/motion/MotionDiv';
import { NormalizedCategory } from '@/library/types/blog.types'
import { Typography } from '@mui/material';
import React from 'react'
import { useRouter } from 'next/navigation';


interface BlogCategoryCardProps {
    category:NormalizedCategory;
}

const BlogCategoryCard: React.FC<BlogCategoryCardProps> = ({
    category,
}) => {

    const router = useRouter();

    const CardText = () => {
        return (
            <MotionDiv className='flex flex-col gap-3 p-3  justify-center items-center cursor-pointer'
                onClick={()=> router.push(`/blog/categories/${category.slug}`)}
            >
                <Typography variant='h4' fontWeight={'bold'} align='center' className='w-full text-center'
                    
                >
                    {category.name}
                </Typography>
            </MotionDiv>
        )
    }

    return (
        <MotionDiv
            className={` w-[300px] h-full flex rounded-4xl justify-center items-center`}
            style={{
                backdropFilter: "blur(25px)",
                backgroundColor: "#fafafa45"
            }}
        >

            <CardText />
        </MotionDiv> 
    )
}



export default BlogCategoryCard;