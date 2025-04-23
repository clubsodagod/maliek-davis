/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { allPostsMockRealEstate } from '@/app/investments/_library/copy';
import FtPostCard from '@/components/blog-post-preview/FtPostCard';
import SmallPostCard from '@/components/blog-post-preview/SmallPostCard';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { IBlogPostClient } from '@/library/types/blog.types'
import { Grid2, Typography, useMediaQuery } from '@mui/material';
import React from 'react'

interface BlogPageMainModuleProps {
    posts: IBlogPostClient[];
}

const BlogPageMainModule: React.FC<BlogPageMainModuleProps> = ({
    posts,
}) => {

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "xl" : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);

    const [ftPosts, setFtPosts] = React.useState<IBlogPostClient[] | null>(posts);

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

            <div
                className='md:px-10'
            >
                <MainHeroHeader
                    headerLabel={'The Daily Davis'}
                    tagline={"Deep Dives into Technology, Finance & the Future"}
                    size={headerSize}
                />
            </div>


            <div
                className='flex gap-20'
            >
                <MotionDiv
                    className='flex flex-col gap-6 mt-12 2xl:w-2/3'
                >

                    <Typography variant="h4">
                        Featured
                    </Typography>
                    <FtPostCard
                        post={ftPosts ? ftPosts[0] : null}
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
                    <Typography variant="h4"></Typography>

                    <Grid2 container spacing={4}
                        flexDirection={"column"}
                        className="w-full min-w-full"
                    >
                        {allPostsMockRealEstate?.map((post, index) => {
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
        </SectionWrapper>
    )
}



export default BlogPageMainModule;