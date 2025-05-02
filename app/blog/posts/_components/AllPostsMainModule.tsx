"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { TextField, useMediaQuery } from '@mui/material';
import React from 'react'
import PostCard from './PostCard';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IBlogPost } from '@/database/models/blog-posts.model';

interface AllPostsModuleProps {
    posts: IBlogPost[];
}

const AllPostsMainModule: React.FC<AllPostsModuleProps> = ({
    posts,
}) => {


    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "xl" : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);

    const [post,setPost] = React.useState<number>(0);

    return (
        <SectionWrapper
            id='all-posts'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <MainHeroHeader
                headerLabel={'All Posts'}
                tagline={""}
                size={headerSize}
            />

            <div
                className="w-full flex justify-center"
            >
                <TextField 
                    name="search-bar"
                    id="search-bar"
                    label="Search keywords"
                    variant="outlined"
                    slotProps={{
                        input:{
                            endAdornment:<SearchRoundedIcon />,
                            className:"rounded-[50px]",
                            sx: {
                                borderRadius: "50px", // controls the input box
                                '.MuiOutlinedInput-notchedOutline': {
                                  borderRadius: '50px', // controls the visible border
                                },
                            }
                        },
                    }}
                    
                />
            </div>

            <div className='w-screen h-full relative -left-6 z-10'>

                {
                    posts.map((p, i) => {
                        return (
                            <SlidingCardWrapper key={`${p.id}:${i}`} 
                            id={p.id}
                            onClick={() => setPost(i)}>
                                <PostCard post={p} open={post===i} />
                            </SlidingCardWrapper>
                        )
                    })
                }
            </div>


        </SectionWrapper>
    )
}



export default AllPostsMainModule;