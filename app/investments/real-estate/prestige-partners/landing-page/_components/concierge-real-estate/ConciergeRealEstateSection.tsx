"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { useMediaQuery, Typography, Card, Box, CardContent } from '@mui/material';
import React from 'react'
import { FaBullseye, FaLock, FaHourglassHalf } from 'react-icons/fa';


const ConciergeRealEstateSection = ({ }) => {

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? undefined : tablet ? undefined : mobile ? "md" : undefined;



    const sectionRef = React.useRef<HTMLDivElement>(null);

    return (
        <SectionWrapper
            ref={sectionRef}
            id='concierge-real-estate-section'
            initial={initialHeaderAnimation}
            whileInView={{ opacity: 1 }}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className="py-24"
        >
            <div className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-10">
                <MainHeroHeader
                    headerLabel={'Concierge Real Estate Investing'}
                    tagline={
                        "Private sourcing for investors who value time, control, and premium returns."
                    }
                    size={headerSize}
                />

                <Typography variant="subtitle1" >
                    You’re not buying properties off a shelf. You’re getting tailored deal sourcing from an operator who works only with a select group of investors.
                    I find the deals others can’t—and match them to your unique goals.
                </Typography>

                <div className="grid md:grid-cols-3 gap-6 mt-10 text-center">
                    <Card className=" border border-neutral-800 text-white rounded-4xl shadow-lg"
                        sx={{
                            borderRadius: '2rem',
                        }}
                    >
                        <Box
                            className="bg-(--foreground)"
                        >
                            <CardContent className="flex flex-col items-center gap-4 py-8 rounded-4xl">
                                <FaBullseye size={32} className='text-(--background)' />
                                <Typography variant="h6" fontWeight={600} className='text-(--background)'>
                                    Custom-Sourced
                                </Typography>
                                <Typography variant="body2" className='text-(--background)'>
                                    You set the criteria. I do the legwork.
                                </Typography>
                            </CardContent>
                        </Box>

                    </Card>

                    <Card className="bg-(--background) border border-neutral-800 text-white rounded-4xl shadow-lg"
                        sx={{
                            borderRadius: '2rem',
                        }}>
                        <Box
                            className="bg-(--foreground)"
                        >
                            <CardContent className="flex flex-col items-center gap-4 py-8">
                                <FaLock size={32} className='text-(--background)' />
                                <Typography variant="h6" fontWeight={600} className='text-(--background)'>
                                    Private Access
                                </Typography>
                                <Typography variant="body2" className='text-(--background)'>
                                    Off-market, distressed, and under-the-radar properties.
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>

                    <Card className="bg-(--background) border border-neutral-800 text-white rounded-4xl shadow-lg"
                        sx={{
                            borderRadius: '2rem',
                        }}>
                        <Box
                            className="bg-(--foreground)"
                        >
                            <CardContent className="flex flex-col items-center gap-4 py-8">
                                <FaHourglassHalf size={32} className='text-(--background)' />
                                <Typography variant="h6" fontWeight={600} className='text-(--background)'>
                                    Time-Efficient
                                </Typography>
                                <Typography variant="body2" className='text-(--background)'>
                                    You review only vetted, high-potential deals.
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </div>
            </div>
        </SectionWrapper>
    )
}



export default ConciergeRealEstateSection;