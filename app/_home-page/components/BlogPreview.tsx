/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React from 'react'
import BlogPreviewCard from './BlogPreviewCard';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Button,  Typography } from '@mui/material';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlogRelatedPostCard from './BlogRelatedPostCard';
import { IBlogPost } from '@/database/models/blog-posts.model';
import { ICategory } from '@/database/models/category.model';
import { AnimatePresence, motion } from "motion/react"
import { fadeToRight } from './WhatsHappening';
import SubscriberCTAForm from '@/components/contact-forms/SubscriberCTAForm';

interface BlogPreviewProps {
    posts: IBlogPost[] | undefined;
    categories: ICategory[] | undefined;
}

export const slideInRight = {
    hidden: { opacity: 0, x: 1750 },
    visible: (custom: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            delay: custom * 0.1,
        },
    }),
};
const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};


const BlogPreview: React.FC<BlogPreviewProps> = ({
    posts,
    categories
}) => {
console.log(posts);

    const sectionRef = React.useRef(null);

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? "xl" : tabletXL ? undefined : tablet ? "lg" : mobile ? "md" : undefined;

    const [open, setOpen] = React.useState(false);

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

                <motion.div {...fadeToRight}
                    className=''
                >
                    <MainHeroHeader
                        id={"blog-preview-header"}
                        headerLabel={`Deep Dives into Technology, Finance & the Future`}
                        tagline={"Fresh. Informative. Relevant."}
                        size={headerSize}
                    />
                </motion.div>


                <MotionDiv
                    className='mt-20 flex gap-12 2xl:pt-12'
                >
                    <div
                        className="md:w-1/3"
                    >
                        <BlogPreviewCard
                            post={posts && posts[0]}
                        />
                    </div>


                    <MotionDiv
                        className='hidden md:landscape:flex md:landscape:flex-col relative w-2/3'
                    >
                        <div className='w-full h-fit mt-3'>
                            <Typography variant='h4' >
                                Featured Posts
                            </Typography>
                            <div
                                className='w-full min-h-[27vh]'
                            >

                                <AnimatePresence>
                                    <motion.div
                                        className="py-6 mt-3 min-h-[24vh] w-full absolute flex gap-18 overflow-x-auto pl-5 pr-20 "
                                        variants={staggerContainer}
                                        initial="hidden"
                                        animate="visible"
                                        whileInView={"visible"}
                                    >
                                        {posts && posts?.map((p, i) => {
                                            if (i === 0) return null;
                                            return (
                                                <motion.div
                                                    key={`${p._id}`}
                                                    className="overflow-x-visible rounded-4xl h-full "
                                                    variants={slideInRight}
                                                    custom={i}
                                                    whileInView={"visible"}
                                                >
                                                    <BlogRelatedPostCard post={p} />
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                </AnimatePresence>

                            </div>
                        </div>

                        {/* <div
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
                                                    key={`${c._id} ${c.name}`}
                                                    category={c}
                                                />
                                            )
                                        })
                                    }


                                </MotionDiv>
                            </div>
                        </div> */}

                    </MotionDiv>
                </MotionDiv>

                <MotionDiv
                    className="w-full flex gap-3 relative z-50 mt-12"
                >
                    <Link href={`/blog`}>
                        <Button variant="contained" color='primary'>
                            Go to Blog
                        </Button>
                    </Link>
                    
                        <Button 
                            onClick={() => setOpen(!open)}
                        variant="outlined" color='primary'
                        >
                            Subscribe
                        </Button>
                    

                </MotionDiv>
            </div>

                            <SubscriberCTAForm 
                                open={open}
                                setOpen={setOpen}
                            />
        </SectionWrapper>

    )
}



export default BlogPreview;