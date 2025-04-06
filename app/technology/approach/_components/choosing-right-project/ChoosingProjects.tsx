"use client"
import React, { useRef } from 'react'
import { Button, useMediaQuery } from '@mui/material';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import LeftFloatImgTextHero from '@/components/image/LeftFloatImgTextHero';
import Link from 'next/link';
import ResponsiveDialog from '@/components/ResponsiveDialouge';
import { projectSelectionCriteria } from '../_library/copy.const';


const ChoosingProjects = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const [open, setOpen] = React.useState(false);


    return (
        <>
            <SectionWrapper
                ref={sectionRef}
                id='technology-approach-main-section'
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
            >
                <MainHeroHeader
                    headerLabel={"Project Selection Considerations"}
                    tagline={""}
                    size={desktop ? "lg" : "lg"}
                />

                <div className='max-w-full'>
                    <LeftFloatImgTextHero
                        imgPT='mt-[25px]'
                        heroText='I Choose Projects That Align With Set Principles.'
                        photo='https://res.cloudinary.com/dyfhsjtwo/image/upload/v1743816312/choosing-project_thj3pm.webp'
                        pt='pt-[150px]'
                        rounded='rounded-[90px]'
                    />
                </div>

                <div className='w-full flex gap-12'>
                    <Button onClick={() => { setOpen(!open) }} LinkComponent={Link} variant='contained'>Project Criteria</Button>
                    <Button LinkComponent={Link} variant='outlined'>Let&apos;s Brain Storm</Button>
                </div>
                <ResponsiveDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Project Selection Criteria"
                    content={projectSelectionCriteria} // swap with other examples
                />
            </SectionWrapper>
        </>



    )
}

export default ChoosingProjects