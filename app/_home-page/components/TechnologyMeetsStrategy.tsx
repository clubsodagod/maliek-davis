"use client"
import MainHeroHeader from '@/components/headers/MainHeroHeader'
import { MotionDiv } from '@/components/motion/MotionDiv'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import { animateHeaderAnimation, initialHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations'
import { coreValuesTechMeetStrategy, techMeetsStrategyTextBoxImg, techMeetStrategyImg, textSVGProfessional } from '@/library/image.cdn'
import { technologyMeetsStrategyCopy } from '@/library/technology.copy'
import { Button, Typography } from '@mui/material'
import Image from 'next/image'
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
                className="w-full flex gap-3 relative z-50 xl:w-fit xl:mx-auto"
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
                        heroText={technologyMeetsStrategyCopy}
                        photo={techMeetStrategyImg}
                        pt='pt-[100px]'
                        rounded='rounded-[90px]'
                        imgWidth='w-[250px]'
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
                <div className=" h-full max-h-full grow  max-w-full overflow-x-visible "
                    onClick={() => handleCoreExpertise()}>
                    <MotionDiv
                        className='overflow-x-visible min-h-full'
                    >
                        <Image
                            alt="Technology Meets Strategy Hero Image of Maliek Davis looking to his left, your right."
                            src={coreValuesTechMeetStrategy}
                            width={9}
                            height={16}
                            sizes='100vw'
                            className='w-full xl:w-[25%] left-[-3vw] xl:left-0 md:w-[50%] '
                            style={{
                                height: mobile ? "95dvh" : "90dvh",
                                objectFit: 'cover',
                                objectPosition: '0 50%',
                                position: "relative",
                                // zIndex: -1,
                                // top: "0",
                                float: "left",
                                shapeOutside: `url(${coreValuesTechMeetStrategy})`,
                                shapeMargin: "0"
                            }}
                        />
                        {
                            coreExpertiseCopy.map((e, i) => (
                                <div
                                    className='overflow-x-visible'
                                    key={`${e.label} ${i}`}>
                                    <Typography
                                        variant='subtitle1'
                                        fontSize={{ xs: "1.2rem", sm: "1.45rem" }}
                                        className={`relative ${i === 0 ? "pt-[50px]" : "pt-[25px]"}  ${i === 2 && "left-[48px]"} text-pretty`}
                                        fontWeight={"bold"}
                                    >
                                        {e.label}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        // fontSize={{ xs: "1.2rem", sm: "1.45rem" }}
                                        className={` relative ${i === 2 && "left-[48px]"} text-pretty break-words `}
                                    >
                                        {e.copy}
                                    </Typography>
                                </div>
                            ))
                        }
                    </MotionDiv>









                    {/* <div
                        className='flex flex-col gap-3  top-[275px] relative'

                    > */}


                </div>
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
                <div
                    className='relative left-[-48px]'
                >
                    {coreExpertise && <CoreExpertise />}
                </div>

            </SectionWrapper>
        </div>


    )
}

export default TechnologyMeetsStrategy