/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import FtPostCard from '@/components/blog-post-preview/FtPostCard';
import SmallPostCard from '@/components/blog-post-preview/SmallPostCard';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import Subscriber from '@/components/subscribe/Subscriber';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Grid2, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import MeltingCategoryCard from './melting-categories/CategoryCard';
import { IBlogPost } from '@/database/models/blog-posts.model';
import { ICategory } from '@/database/models/category.model';

interface BlogPageMainModuleProps {
    posts: IBlogPost[];
    categories: ICategory[] | undefined;
}

const BlogPageMainModule: React.FC<BlogPageMainModuleProps> = ({
    posts, categories
}) => {

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "xl" : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);

    const [ftPosts, setFtPosts] = React.useState<IBlogPost[] | undefined>(posts);

    const [category, setCategory] = React.useState<number>(0);

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
                className='flex md:flex-col lg:flex-row gap-20'
            >
                <MotionDiv
                    className='flex flex-col gap-6 md:mt-12 w-full  md:w-2/3'
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



                <MotionDiv className="hidden md:flex flex-col gap-6 mt-12 w-full 2xl:w-1/3">
                    <Typography variant="h4"></Typography>

                    <Grid2 container spacing={4}
                        flexDirection={"row"}
                        // columns={{ xs: 6, sm: 1, xl: 1}}
                        className="w-full min-w-full"
                    >
                        {ftPosts?.map((post, index) => {
                            if (index >= 3 || index === 0) return
                            return (
                                <Grid2
                                    size={{ xs: 6, md: 4, xl: 12 }}
                                    key={`${post._id} : ${index}`}
                                    className={`w-fit`}
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

            <div
                className='w-full flex justify-center '
            >
                <Subscriber />
            </div>


            <div className='w-screen h-full relative -left-6  z-50'>

                <Typography variant="h4" color="secondary" className="px-6 ">
                    Categories
                </Typography>
                <div
                    className={` sliding-card-ctn relative w-full `}
                >
                    {
                        categories && categories.map((c, i) => (
                            <SlidingCardWrapper
                                key={`${c._id} ${i* 100}`}
                                id={c.name}
                                onClick={() => setCategory(i)}
                            >
                                <MeltingCategoryCard
                                    category={c}
                                    open={category === i}
                                    posts={ftPosts}
                                />
                            </SlidingCardWrapper>
                        ))
                    }
                </div>

            </div>

            <MotionDiv className="flex flex-col gap-6 md:mt-12">
                <Typography variant="h4">Recent</Typography>

                <Grid2 container spacing={4}>
                    {ftPosts?.map((post, index) => {
                        if (mobile) {
                            if (index < 1 || index > 4) {
                                if (index===0) {
                                    return
                                }
                                return 
                            }
                        } else {
                            if (index < 4 || index > 7) {
                                return
                            } 
                        }
                        return (
                            <Grid2
                                size={{ xs: 12, md: 4, xl: 3 }}
                                key={`${post._id} ${index* 200}`}
                                className={``}
                            >
                                <SmallPostCard
                                    post={post}
                                    cardImage={{
                                        className: "h-[200px] w-full",
                                    }}
                                    cardWrapper={{
                                        className: "w-full h-[200px]",
                                    }}
                                    w={9} h={16}
                                />
                            </Grid2>
                        )
                    })}
                </Grid2>
            </MotionDiv>
        </SectionWrapper>
    )
}



export default BlogPageMainModule;