"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import BlogPreviewWrapper from '@/components/wrappers/BlogPreviewWrapper';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React from 'react'
import BlogPreviewCard from './BlogPreviewCard';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlogRelatedPostCard from './BlogRelatedPostCard';
import BlogCategoryCard from './BlogCategoryCard';
import { IBlogPost } from '@/database/models/blog-posts.model';
import { ICategory } from '@/database/models/category.model';


interface BlogPreviewProps {
    posts:IBlogPost[]|undefined;
    categories:ICategory[]|undefined;
}



const BlogPreview:React.FC<BlogPreviewProps> = ({
    posts,
    categories
}) => {

    const sectionRef = React.useRef(null);

    const mobile = useMediaQuery(`(max-width:767px)`);

    return (

        <SectionWrapper
            ref={sectionRef}
            id='home-blog-preview-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <div
                className='flex flex-col justify-between h-full grow'
            >
                <MainHeroHeader
                    id={"blog-preview-header"}
                    headerLabel={`Deep Dives into Technology, Finance & the Future`}
                    tagline={"Fresh. Informative. Relevant."}
                    size={mobile ? "md" : "xl"}
                />

                <MotionDiv
                    className='flex gap-12 2xl:pt-12'
                >
                    <BlogPreviewWrapper
                        className='relative left-[12vw] md:left-[-3vw]  xl:left-[-3vw] rounded-4xl bg-gray-950 py-6 px-6 w-screen md:w-[75vw] md:landscape:w-[50vw] '
                    >
                        <BlogPreviewCard
                            post={posts && posts[0]}
                        />
                    </BlogPreviewWrapper>

                    <MotionDiv
                        className='hidden md:landscape:flex md:landscape:flex-col relative xl:left-[-3vw] w-full'
                    >
                        <div className='w-full h-fit mt-3'>
                            <Typography variant='h3' >
                                Featured Posts
                            </Typography>
                            <div
                                className='w-full min-h-[27vh]'
                            >

                                <MotionDiv
                                    className='pb-3 mt-3 min-h-[24vh] w-[48vw]  absolute flex gap-6 overflow-x-auto pr-20'
                                >
                                    {
                                        posts && posts?.map((p, i) => {
                                            if (i === 0) return
                                            return (
                                                <div
                                                    key={`${p._id}`}
                                                        className="overflow-x-visible"
                                                    >
                                                    <BlogRelatedPostCard
                                                    post={p}
                                                />
                                                </div>
                                                
                                            )
                                        })
                                    }


                                </MotionDiv>
                            </div>
                        </div>

                        <div
                            className='w-full mt-20'
                        >
                            <Typography variant='h3' className=''>
                                Categories
                            </Typography>
                            <div
                                className='w-full min-h-[20vh] mt-3 '
                            >

                                <MotionDiv
                                    className='h-max  absolute flex gap-6 overflow-x-auto w-[48vw] pr-20 '
                                >
                                    {
                                        categories && categories.map((c) => {
                                            return (
                                                <BlogCategoryCard
                                                key={c.id}
                                                    category={c}
                                                />
                                            )
                                        })
                                    }


                                </MotionDiv>
                            </div>
                        </div>

                    </MotionDiv>
                </MotionDiv>

                <MotionDiv
                    className="w-full flex gap-3 relative z-50"
                >
                    <Link href={`/blog`}>
                        <Button variant="contained" color='primary'>
                            Go to Blog
                        </Button>
                    </Link>
                    <Link href={`/blog/subscribe`}>
                        <Button variant="outlined" color='primary'
                        >
                            Subscribe
                        </Button>
                    </Link>

                </MotionDiv>
            </div>


        </SectionWrapper>

    )
}



export default BlogPreview;