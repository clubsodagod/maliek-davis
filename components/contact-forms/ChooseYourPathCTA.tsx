/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery } from '@mui/material';
import React from 'react'
import MainHeroHeader from '../headers/MainHeroHeader';
import SectionWrapper from '../wrappers/SectionWrapper';
import LeftFloatImgTextHero from '../image/LeftFloatImgTextHero';
import WorkWithMeOptionsCard from '@/app/technology/solutions/_components/solutions-cta/WorkWithMeOptionsCard';
import SolutionsCTAForm from '@/app/technology/solutions/_components/solutions-cta/SolutionsCTAForm';


const ChooseYourPathCTA = ({ }) => {
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const [result, setResult] = React.useState<number>(0);


    const [open, setOpen] = React.useState(false);
    const [formType, setFormType] = React.useState<number>(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <SectionWrapper
            ref={sectionRef}
            id='technology-approach-real-results-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <MainHeroHeader
                headerLabel={"Let's Work Together!"}
                tagline={"Choose Your Path"}
                size={desktop ? "lg" : "xl"}
            />

            <div className='max-w-full w-full h-full'>
                <LeftFloatImgTextHero
                    imgPT='mt-[25px]'
                    heroText="Together we can mastermind innovation."
                    objectFit='cover'
                    photo='https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742150340/fpgxqrksmtjyxmhwv8jr_byigi9.webp'
                    pt='pt-[150px]'
                    rounded='rounded-[90px]'
                    imgHeight='h-[250px] md:h-[400px] 2xl:h-[600px]'
                    imgWidth='w-[235px] md:w-[400px] landscape:xl:w-[550px] landscape:2xl:w-[1000px] 2xl:w-[800px]'
                />
            </div>


            <div className='relative mt-12'>
                <WorkWithMeOptionsCard
                    desktop={desktop}
                    formType={formType}
                    setFormType={setFormType}
                    handleClickOpen={handleClickOpen}
                />
            </div>

            <SolutionsCTAForm
                open={open}
                setOpen={setOpen}
                formType={formType}
            />
        </SectionWrapper>

    )
}



export default ChooseYourPathCTA;