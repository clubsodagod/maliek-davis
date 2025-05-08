"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Skeleton, useMediaQuery } from '@mui/material';
import React from 'react'
import CategoryCard from './category-deck/CategoryCard';
import { ICategory } from '@/database/models/category.model';

interface CategoriesMainModuleProps {
    categories: ICategory[] | undefined;
}

const CategoriesMainModule: React.FC<CategoriesMainModuleProps> = ({
    categories,
}) => {

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "xl" : undefined;

    const sectionRef = React.useRef<HTMLDivElement>(null);

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
                className='md:px-10 '
            >
                <MainHeroHeader
                    headerLabel={`Categories`}
                    tagline={""}
                    size={headerSize}
                />
            </div>


            <div className='w-screen h-full relative -left-6 z-10'>

                {
                    categories ? (
                        <>
                            {
                                categories.map((c, i) => {
                                    return (
                                        <SlidingCardWrapper key={`${c.id}:${i}`}
                                            id={c.id}
                                            onClick={() => setCategory(i)}>
                                            <CategoryCard category={c} open={category === i} posts={undefined} />
                                        </SlidingCardWrapper>
                                    )
                                })
                            }
                        </>
                    )
                        : (
                            <>
                                {
                                    ["one:1", "two:2", "three"].map((s,i)=>(
                                        <Skeleton 
                                            key={`${s} ${i}`}
                                            animation="wave"
                                        />
                                    ))
                                }
                            </>
                        )
                }


            </div>



        </SectionWrapper>

    )
}



export default CategoriesMainModule;