"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import SolutionsCTAForm from './SolutionsCTAForm';
import useMediaQuery from '@mui/material/useMediaQuery';
import { whyChooseMeCopy } from '../../_library/copy.const';
import WorkWithMeOptionsCard from './WorkWithMeOptionsCard';

const SolutionsCTA = ({ }) => {

    const sectionRef = React.useRef(null);

    const [open, setOpen] = React.useState(false);
    const [formType, setFormType] = React.useState<number>(0);

    const desktop = useMediaQuery(`(min-width:1100px)`);
    const tablet = useMediaQuery(`(min-width:768px)`);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (<SectionWrapper
        ref={sectionRef}
        id='technology-solutions-cta-section'
        whileInView={{ opacity: 1 }}
        initial={initialHeaderAnimation}
        animate={animateHeaderAnimation}
        transition={transitionHeaderAnimation}
        exit={{ opacity: 0, scaleY: 0 }}
        className='pb-0'
    >
        <MainHeroHeader
            headerLabel={"Ready to Transform Your Business with the Right Technology?"}
            size={!tablet ? "md": tablet ? "lg" : desktop ? "xl" : "md"}
            taglineClassName='text-[#fafafa]'
            tagline={''}
        />

        <div>

            <div className='relative w-full px-6 h-full 2xl:-top-12 '>
                {/* Float Image With Shape */}
                <div
                    className="relative w-1/4 "
                    style={{
                        shapeOutside: `url("https://res.cloudinary.com/dyfhsjtwo/image/upload/v1743561699/yakdsv8timnbm7dwsemu_1_ghkvch.svg")`,
                        shapeMargin: '24px',
                        float: 'right',
                        position: 'relative',
                        marginLeft: '24px',
                        marginBottom: '24px',
                    }}
                >
                    <Image
                        alt='technology-solutions-cta-image'
                        src={"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1743562624/suited_text_mbaheo.webp"}
                        sizes='100vw' width={9} height={16}
                        className='relative  w-[55vw] h-[50vh] landscape:md:h-[70vh]  overflow-x-visible -left-6 landscape:md:left-6'
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>

                {/* Wrapped Text Content */}
                <div className='overflow-hidden  md:pt-40 md:ml-90 2xl:pt-20'>
                    {whyChooseMeCopy.map((s, i) => (
                        <div className='mb-4 md:mb-8' key={`${s.info} ${i}`}>
                            <Typography variant='subtitle1'>
                                <Typography
                                    variant='subtitle1'
                                    component='span'
                                    fontWeight='600'
                                    color='secondary.light'
                                >
                                    {s.label}:
                                </Typography>
                                &nbsp;{s.info}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>

            <div className='relative p-0'>
                <WorkWithMeOptionsCard 
                    desktop={desktop}
                    formType={formType}
                    setFormType={setFormType}
                    handleClickOpen={handleClickOpen}
                />
            </div>
        </div>
        <SolutionsCTAForm
            open={open}
            setOpen={setOpen}
            formType={formType}
        />


    </SectionWrapper>

    )
}



export default SolutionsCTA;