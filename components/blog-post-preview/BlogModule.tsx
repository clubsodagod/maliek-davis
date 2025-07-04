/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React, { useState } from 'react'
import { MotionDiv } from '@/components/motion/MotionDiv';
import { IBlogPostClient, NormalizedCategory } from '@/library/types/blog.types';
import { Button, Grid2, Typography } from '@mui/material';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import FtPostCard from './FtPostCard';
import { allPostsMockRealEstate, ftPostsMockRealEstate } from '@/app/_investments/_library/copy';
import SmallPostCard from './SmallPostCard';
import { IBlogPost } from '@/database/models/blog-posts.model';



const now = new Date();


interface BlogPreviewProps {
    headerLabel: string;
    headerSize?: "xs" | "sm" | "md" | "lg" | "xl";
    tagline?: string;
    id: string;
    posts?: IBlogPost[]|undefined;
}

const BlogModule: React.FC<BlogPreviewProps> = ({
    headerLabel, headerSize, tagline, id, posts:postsProps
}) => {

    const sectionRef = React.useRef(null);

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? "xl" : tabletXL ? "xl" : tablet ? "lg" : mobile ? "xl" : undefined;

    const [posts, setPosts] = useState<IBlogPost[] | undefined>(postsProps);
    const [ftPosts, setFtPosts] = useState<IBlogPost[] | undefined>(postsProps);
    const [ftPost, setFtPost] = useState<number>(0);
    return (

        <SectionWrapper
            ref={sectionRef}
            id={`${id}-section`}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <div
                className='flex flex-col justify-between h-full grow  sm:px-[12.5vw]'
            >
                <MainHeroHeader
                    id={"blog-preview-header"}
                    headerLabel={headerLabel}
                    tagline={tagline || ""}
                    size={size}
                />

                <div
                    className='flex gap-6'
                >
                    <MotionDiv
                        className='flex flex-col gap-6 mt-12 2xl:w-2/3'
                    >

                        <Typography variant="h4">
                            Featured
                        </Typography>
                        <FtPostCard
                            post={ftPosts ? ftPosts[ftPost] : null}
                            cardImage={{
                                className: "2xl:w-full ",
                            }}
                            cardWrapper={{
                                className: "w-full h-[400px] 2xl:h-full "
                            }}
                            w={9} h={16}
                        />
                    </MotionDiv>



                    <MotionDiv className="hidden 2xl:flex flex-col gap-6 mt-12 min-w-1/3">
                        <Typography variant="h4">Recent</Typography>

                        <Grid2 container spacing={4} 
                            flexDirection={"column"}
                            className="w-full min-w-full"
                        >
                            {ftPosts?.map((post, index) => {
                                if (index >= 3 || index === 0) return
                                return (
                                    <Grid2
                                        size={{ xs: 6, md: 4, xl: 12 }}
                                        key={post.id}
                                        className={`min-w-full`}
                                    >
                                        <SmallPostCard
                                            post={post}
                                            cardImage={{
                                                className: "h-[300px] w-full",
                                            }}
                                            cardWrapper={{
                                                className: "w-full h-[300px]",
                                            }}
                                            w={9} h={16}
                                        />
                                    </Grid2>
                                )
                            })}
                        </Grid2>
                    </MotionDiv>
                </div>


                <MotionDiv className="flex flex-col gap-6 mt-12">
                    <Typography variant="h4">Recent</Typography>

                    <Grid2 container spacing={4}>
                        {posts?.map((post, index) => {
                            if (index < 3 || index > 5 ) return
                            return (
                                <Grid2
                                    size={{ xs: 6, md: 4, xl: 3 }}
                                    key={post.id}
                                    className={``}
                                >
                                    <SmallPostCard
                                        post={post}
                                        cardImage={{
                                            className: "h-[300px] w-full",
                                        }}
                                        cardWrapper={{
                                            className: "w-full h-[300px]",
                                        }}
                                        w={9} h={16}
                                    />
                                </Grid2>
                            )
                        })}
                    </Grid2>
                </MotionDiv>


                <MotionDiv
                    className="w-full flex gap-3 relative z-50 mt-6"
                >
                    <Link href={`/blog`}>
                        <Button variant="contained" color='primary'>
                            Go to Blog
                        </Button>
                    </Link>
                        <Button variant="outlined" color='primary'
                        >
                            Subscribe
                        </Button>

                </MotionDiv>
            </div>


        </SectionWrapper>

    )
}



export default BlogModule;