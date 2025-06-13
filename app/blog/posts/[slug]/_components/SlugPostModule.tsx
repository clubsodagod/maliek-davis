"use client"

import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React from 'react'
import PostScrollProgress from './PostScrollProgress';
import PostFeaturedImage from './PostFeaturedImage';
import CreatorsRow from './CreatorsRow';
import { MotionDiv } from '@/components/motion/MotionDiv';
import PostSummary from './PostSummary';
import IdentifiersRow from './IdentifiersRow';
import PostContent from './PostContent';
import { IBlogPost } from '@/database/models/blog-posts.model';
import TableOfContents from './TableOfContents';


const SlugPostModule: React.FC<{
    post: IBlogPost | undefined;
}> = ({
    post
}) => {

        const sectionRef = React.useRef<HTMLDivElement>(null);
        return (

            <div className='bg-(--background)'>
                <SectionWrapper
                    id='investments-area-of-focus'
                    ref={sectionRef}
                    whileInView={{ opacity: 1 }}
                    initial={initialHeaderAnimation}
                    animate={animateHeaderAnimation}
                    transition={transitionHeaderAnimation}
                    exit={{ opacity: 0, scaleY: 0 }}
                    pb='pb-[53vh]'
                >
                    <PostScrollProgress />
                    <div>
                        <PostFeaturedImage
                            description={post?.metaDescription} featuredImg={post?.featuredImg}
                        />
                        <MotionDiv
                            className='relative top-[53vh] flex flex-col gap-5 sm:px-10 md:px-20 lg:px-100 pb-10  w-full items-center'
                        >
                            <CreatorsRow author={post?.author} />
                            <div
                                className='flex flex-col justify-start w-full gap-3'
                            >

                                <PostSummary title={post?.title} description={post?.metaDescription}
                                />
                                <IdentifiersRow
                                    category={post?.category} subcategories={post?.tags}
                                />
                                <TableOfContents 
                                    payload={post?.content}
                                />
                                <PostContent
                                    content={post?.content}
                                />
                            </div>
                        </MotionDiv>

                    </div>


                    <div className=' w-full' />
                </SectionWrapper>
            </div>

        )
    }



export default SlugPostModule;