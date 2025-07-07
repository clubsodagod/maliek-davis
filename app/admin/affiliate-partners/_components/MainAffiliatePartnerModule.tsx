"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import AdminWrapper from '@/components/wrappers/AdminWrapper';
import { useMediaQuery } from '@mui/material';
import React from 'react'
import AffiliatePartnerCards from './AffiliatePartnerCards';


const MainAffiliatePartnerModule = ({ }) => {
    const adminRef = React.useRef<HTMLDivElement>(null);
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined =
        desktop ? "xl" : tabletXL ? "xl" : tablet ? "lg" : mobile ? "md" : undefined;

    return (
        <AdminWrapper
            adminRef={adminRef}
            id='admin-dashboard-affiliate-partners'
            className='w-full min-h-screen pt-[12vh] pb-[6vh] flex flex-col space-between px-6'
        >
            <MainHeroHeader
                headerLabel='Affiliate Partners Manager'
                tagline='Manage your affiliate partners, track performance, and optimize your affiliate marketing strategy.'
                size={headerSize}
            />
            <AffiliatePartnerCards
            />
        </AdminWrapper>
    )
}



export default MainAffiliatePartnerModule;