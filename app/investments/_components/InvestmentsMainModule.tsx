"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import React from 'react'
import InvestorSilhouette from './building-blocks/main-hero/InvestorSilhouette';
import { Button, useMediaQuery } from '@mui/material';


const InvestmentsMainModule = ({ }) => {
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? "lg" : tabletXL ? "xl" : tablet ? "lg" : mobile ? "md" : undefined;

    return (
        <>
            <SectionWrapper>

                <InvestorSilhouette />
                <div className='absolute top-0 w-full h-full flex flex-col justify-between pt-[12vh]  px-6 pb-[6vh] md:pb-[12vh]'>
                    <MainHeroHeader

                        headerLabel={'Investments: Building, Scaling and Sustaining Wealth'} tagline={''}
                        size={headerSize}
                    />

                    <div
                        className='w-full flex gap-6'
                    >
                        <Button
                            variant="contained"
                        >
                            Investment Vehicles
                        </Button>
                        <Button
                            variant="outlined"
                        >
                            Criteria
                        </Button>
                    </div>
                </div>

            </SectionWrapper>
        </>

    )
}



export default InvestmentsMainModule;