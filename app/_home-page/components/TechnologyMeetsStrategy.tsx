"use client"
import MainHeroHeader from '@/components/headers/MainHeroHeader'
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import { animateHeaderAnimation, initialHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations'
import { techMeetStrategyImg } from '@/library/image.cdn'
import { technologyMeetsStrategyCopy } from '@/library/technology.copy'
import { Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { coreExpertiseCopy } from '../library/copy'
import useMediaQuery from '@mui/material/useMediaQuery';
import RightFloatImgTextHero from '@/components/image/RightFloatImgTextHero'
import { motion, useAnimation, useInView } from 'motion/react'
import { fadeToRight } from './WhatsHappening'


const MotionButton = motion(Button);

const TechnologyMeetsStrategy = () => {

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? "xl" : tabletXL ? undefined : tablet ? "lg" : mobile ? "xl" : undefined;
    const sectionRef = React.useRef<HTMLDivElement>(null);


    const [headerLabel, setHeaderLabel] = React.useState<'Core Expertise' | 'Technology Meets Strategy'>('Technology Meets Strategy');
    const [tagline, setTagline] = React.useState<string | "">('A New Perspective on Innovation');
    const [coreExpertise, setCoreExpertise] = React.useState<boolean>(false);

    function handleCoreExpertise() {
        setCoreExpertise(!coreExpertise);
        setHeaderLabel(coreExpertise === true ? 'Core Expertise' : 'Technology Meets Strategy');
        setTagline(coreExpertise ? 'Explore Our Expertise' : 'A New Perspective on Innovation');
    }

    const BtnGroup = () => {

        const ref = React.useRef(null);
        const inView = useInView(ref);
        const controls = useAnimation();

        useEffect(() => {
            if (inView) {
                controls.start('visible');
            }
        }, [inView, controls]);

        const buttonVariants = {
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
                opacity: 1,
                scale: [1, 1.05, 0.95, 1.05, 0.95, 1], // entrance scale bounce
                transition: {
                    duration: 0.8,
                    ease: 'easeOut',
                },
            },
            pulse: {
                scale: [1, 1.2, 1],
                transition: {
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                },
            },
            pulseAlt: {
                scale: [1.2, 1, 1.2],
                transition: {
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                },
            },
        };
        return (

            <motion.div
                ref={ref}
                className="w-full flex gap-10 relative z-50 xl:w-fit md:mx-auto md:justify-center"
            >
                <MotionButton
                    variant="contained"
                    href={`/technology/portfolio`}
                    color="primary"
                    variants={buttonVariants}
                    initial="hidden"
                    animate={inView ? ['visible', 'pulse'] : 'hidden'}
                >
                    Explore Work
                </MotionButton>

                <MotionButton
                    variant="outlined"
                    color="primary"
                    onClick={() => handleCoreExpertise()}
                    variants={buttonVariants}
                    initial="hidden"
                    animate={inView ? ['visible', 'pulseAlt'] : 'hidden'}
                >
                    Core Expertise
                </MotionButton>
            </motion.div>
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
                                    variant='subtitle1'
                                    fontSize={{ xs: "1rem", sm: "2rem" }}
                                    className=' md:pl-30 2xl:pl-100'
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
                                                    className={`relative ${i === 0 ? "pt-[50px]" : "pt-[25px]"}   text-pretty text-right`}
                                                    fontWeight={"bold"}
                                                >
                                                    {e.label}
                                                </Typography>
                                                <Typography
                                                    variant='body1'
                                                    // fontSize={{ xs: "1.2rem", sm: "1.45rem" }}
                                                    className={` relative  text-pretty break-words text-right `}
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
                        imgWidth='w-[225px] md:w-[450px] lg:w-[625px] xl:landscape:w-[750px]'
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
        } else {
            setHeaderLabel('Technology Meets Strategy');
            setTagline("A New Perspective on Innovation");
        }
    }, [coreExpertise, mobile])

    return (
        <div
            className=''
        >



            <SectionWrapper
                ref={sectionRef}
                id='technology-meets-strategy'
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
            >

                <motion.div {...fadeToRight}
                    className=''
                >
                    <MainHeroHeader
                        id={headerLabel}
                        headerLabel={headerLabel}
                        tagline={tagline}
                        size={headerSize}
                    />
                </motion.div>



                {!coreExpertise && <TechnologyMeetsStrategyMain />}

                {coreExpertise && <CoreExpertise />}


            </SectionWrapper>
        </div>


    )
}

export default TechnologyMeetsStrategy