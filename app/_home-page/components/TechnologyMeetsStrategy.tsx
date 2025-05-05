"use client"
import MainHeroHeader from '@/components/headers/MainHeroHeader'
import { MotionDiv } from '@/components/motion/MotionDiv'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import { animateHeaderAnimation, initialHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations'
import {  techMeetStrategyImg } from '@/library/image.cdn'
import { technologyMeetsStrategyCopy } from '@/library/technology.copy'
import { Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { coreExpertiseCopy } from '../library/copy'
import useMediaQuery from '@mui/material/useMediaQuery';
import RightFloatImgTextHero from '@/components/image/RightFloatImgTextHero'



const TechnologyMeetsStrategy = () => {

    const sectionRef = React.useRef<HTMLDivElement>(null);

    const mobile = useMediaQuery(`(max-width:767px)`);

    const [headerLabel, setHeaderLabel] = React.useState<'Core Expertise' | 'Technology Meets Strategy'>('Technology Meets Strategy');
    const [tagline, setTagline] = React.useState<string | "">('A New Perspective on Innovation');
    const [headerSize, setHeaderSize] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>(mobile ? "md" : "xl");
    const [coreExpertise, setCoreExpertise] = React.useState<boolean>(false);

    function handleCoreExpertise() {
        setCoreExpertise(!coreExpertise);
        setHeaderLabel(coreExpertise === true ? 'Core Expertise' : 'Technology Meets Strategy');
        setTagline(coreExpertise ? 'Explore Our Expertise' : 'A New Perspective on Innovation');
        setHeaderSize(coreExpertise ? 'md' : 'xl');
    }

    const BtnGroup = () => {

        return (
            <MotionDiv
                className="w-full flex gap-3 relative z-50 xl:w-fit xl:mx-auto "
            >
                <Button variant="contained" href={`/technology/portfolio`} color='primary'>
                    Explore Work
                </Button>
                <Button variant="outlined" color='primary'
                    onClick={() => handleCoreExpertise()}
                >
                    Core Expertise
                </Button>
            </MotionDiv>
        )
    }

    const TechnologyMeetsStrategyMain = () => {

        return (
            <>



                {/* section copy */}
                <div className='relative w-full '>
                    <RightFloatImgTextHero
                        imgPT='0'
                        heroText={
                            <>
                                <Typography
                                    component={"h5"}
                                    variant='h5'
                                    fontSize={{ xs: "1rem", sm: "2rem" }}
                                    className='md:pl-30'
                                >
                                    {technologyMeetsStrategyCopy}
                                </Typography>
                            </>

                        }
                        photo={techMeetStrategyImg}
                        pt='pt-[100px]'
                        rounded='rounded-[90px]'
                        imgWidth='w-[250px] md:w-[450px] lg:w-[625px] xl:landscape:w-[750px]'
                        imgHeight='h-[450px] md:h-[650px] md:landscape:h-[500px] lg:h-[775px] 2xl:h-[600px]'
                        objectFit='cover' mainCtnRight={''} blkBoxLeft=''
                    />
                </div>


                {/* CTA Buttons */}
                <BtnGroup />
            </>





        )
    }

    const CoreExpertise = () => {

        return (
            <>
                <div className=" relative w-full "
                    onClick={() => handleCoreExpertise()}>


                    <RightFloatImgTextHero
                        imgPT='0'
                        heroText={
                            <>
                            <div
                                className='relative w-full md:pl-40 rounded-4xl'
                            >
                                {
                                    coreExpertiseCopy.map((e, i) => (
                                        <div
                                            className='overflow-x-visible'
                                            key={`${e.label} ${i}`}>
                                            <Typography
                                                variant='subtitle1'
                                                fontSize={{ xs: "1.2rem", sm: "1.45rem" }}
                                                className={`relative ${i === 0 ? "pt-[50px]" : "pt-[25px]"}   text-pretty`}
                                                fontWeight={"bold"}
                                            >
                                                {e.label}
                                            </Typography>
                                            <Typography
                                                variant='body1'
                                                // fontSize={{ xs: "1.2rem", sm: "1.45rem" }}
                                                className={` relative  text-pretty break-words `}
                                            >
                                                {e.copy}
                                            </Typography>
                                        </div>
                                    ))
                                }
                            </div>
                                
                            </>

                        }
                        photo={techMeetStrategyImg}
                        pt='pt-[100px]'
                        rounded='rounded-[90px]'
                        imgWidth='w-[250px] md:w-[450px] lg:w-[625px] xl:landscape:w-[750px]'
                        imgHeight='h-[450px] md:h-[650px] md:landscape:h-[500px] lg:h-[775px] 2xl:h-[600px]'
                        objectFit='cover' mainCtnRight={''} blkBoxLeft=''
                    />








                </div>

                {/* CTA Buttons */}
                <BtnGroup />
            </>
        )
    }

    useEffect(() => {
        if (coreExpertise === true) {
            setHeaderLabel('Core Expertise');
            setTagline("");
            setHeaderSize('lg');
        } else {
            setHeaderLabel('Technology Meets Strategy');
            setTagline("A New Perspective on Innovation");
            setHeaderSize(mobile ? "lg" : "xl");
        }
    }, [coreExpertise, mobile])

    return (
        <div
            className=''
        >



            <SectionWrapper
                ref={sectionRef}
                id='technology-meets-strategy-section'
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
            >

                <MainHeroHeader
                    id={headerLabel}
                    headerLabel={headerLabel}
                    tagline={tagline}
                    size={headerSize}
                />


                {!coreExpertise && <TechnologyMeetsStrategyMain />}
          
                    {coreExpertise && <CoreExpertise />}
      

            </SectionWrapper>
        </div>


    )
}

export default TechnologyMeetsStrategy