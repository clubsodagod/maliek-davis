"use client"

import AdminWrapper from '@/components/wrappers/AdminWrapper';
import React from 'react'
import { useMediaQuery } from '@mui/material';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { User } from 'next-auth';
import AdminEmployeeOnly from '@/components/route-protection/AdminEmployeeOnly';
import { useSession } from 'next-auth/react';
import AdminSectionCards from './AdminSectionCards';


const MainDashboardModule = ({ }) => {

    const { data } = useSession();

    const currentUser: User | undefined = data?.user;

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined = desktop ? undefined : tabletXL ? "xl" : tablet ? "lg" : mobile ? "md" : undefined;

    const adminRef = React.useRef<HTMLDivElement>(null);
    const id = "admin-dashboard";

    return (
        <AdminWrapper
            id={id}
            adminRef={adminRef}
            className='w-full h-full pt-[12vh] pb-[6vh] flex flex-col space-between px-6'
        >

            <MainHeroHeader

                headerLabel={`Hey ${currentUser?.firstName}`} tagline={'What would you like to do today?'}
                size={headerSize}
            />
            <div
                className='mt-12'
            >


                <AdminSectionCards
                />
            </div>

        </AdminWrapper>
    )
}



export default AdminEmployeeOnly(MainDashboardModule);