"use client"

import PostCard from '@/app/blog/posts/_components/PostCard';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import { IBlogPost } from '@/database/models/blog-posts.model';
import { ICategory } from '@/database/models/category.model';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react'

interface CategoryModuleProps {
    category: ICategory | undefined;
    posts: IBlogPost[]| undefined;
}
const CategoryModule: React.FC<CategoryModuleProps> = ({
    category,
    posts
}) => {



    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? undefined : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);

    const [post, setPost] = React.useState<number>(0);

    return (

        <SectionWrapper
            id='main-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >

            <MotionDiv
                className='w-screen relative -left-6 top-[-12vh] px-6 2xl:px-0 2xl:left-0 bg-black  rounded-b-4xl shadow-2xs'
            >

                <div
                    className='w-screen  relative -left-6  '
                >

                    <Image
                        alt={category?.description || ""}
                        src={category?.photo || ""}
                        sizes='100vw'
                        width={9}
                        height={16}
                        style={{
                            objectFit: "cover",
                        }}
                        priority
                        className={`rounded-b-4xl  min-h-[65vh] 2xl:min-h-[35vh] 2xl:h-[65vh] w-full`}
                    />
                </div>

                <div
                    className='md:px-10 absolute bottom-0 pt-[12vh] pb-6 pr-6'
                >
                    <MainHeroHeader
                        headerLabel={`${category?.name}`}
                        tagline={category?.description}
                        size={headerSize}
                    />
                </div>
            </MotionDiv>

            <MotionDiv>
                <Typography variant="h5"  className={`w-full text-center`}>
                    {category?.name} Posts
                </Typography>
                <div className='w-screen h-full relative -left-6  z-10 2xl:grid 2xl:grid-cols-4 2xl:gap-12 2xl:px-[12vw]'>

                    {
                        posts && posts.map((p, i) => {
                            return (
                                <SlidingCardWrapper key={`${p.id}:${i}`}
                                    id={p.id}
                                    onClick={() => setPost(i)}>
                                    <PostCard post={p} open={post === i} />
                                </SlidingCardWrapper>
                            )
                        })
                    }
                </div>
            </MotionDiv>
        </SectionWrapper>
    )
}



export default CategoryModule;