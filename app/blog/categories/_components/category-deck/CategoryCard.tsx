"use client"

import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { IBlogPostClient } from '@/library/types/blog.types'
import { Typography, Button } from '@mui/material';
import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ICategory } from '@/database/models/category.model';

interface CategoryCardProps {
    category: ICategory;
    posts:IBlogPostClient[]|undefined;
    open: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    category, open
}) => {


    const router = useRouter();

    return (

        <ComponentTransition id={`${category.name}-transition-card`}>
            <MotionDiv
                className={`"category-card overflow-hidden  md:rounded-t-[100px] p-4 ${open ? undefined : "rounded-t-4xl"}`}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: open ? 1 : 1, y: open ? 20 : 20, scaleX: open ? 1 : 1.03 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "anticipate" }}
                style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: `${open ? "1px -6px 8px  #17171747" : "1px -6px 8px  #17171747"}`,
                }}
            >

                {
                    open ?
                        null : (
                            <Typography component={'div'} onClick={open ? () => { router.push(`/blog/posts/${category.slug}`) } : undefined} variant="subtitle1" fontWeight="bold" className="pt-2 pl-3">
                                {category.name}
                            </Typography>
                        )
                }



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
                                    alt={`${category.name} featured photo for category.`}
                                    src={category.photo}
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


                        <div className="flex flex-col justify-start md:text-center my-4">
                            <Typography component={'div'} onClick={open ? () => { router.push(`/blog/categories/${category.slug}`) } : undefined} variant="subtitle1" fontWeight="bold" className="pt-2 ">
                                {category.name}
                            </Typography>
                            <Typography variant="body1">
                                {category.description}
                            </Typography>

                            <MotionDiv
                                className="flex gap-3 justify-center md:items-center mt-4 "
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <Button onClick={() => { router.push(`/blog/categories/${category.slug}`) }} variant="contained">Go to category</Button>
                            </MotionDiv>
                        </div>
                    </MotionDiv>
                )}

            </MotionDiv>
        </ComponentTransition>
    )
}



export default CategoryCard;