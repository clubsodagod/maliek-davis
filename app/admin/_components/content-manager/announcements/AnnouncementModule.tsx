"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import AdminWrapper from '@/components/wrappers/AdminWrapper';
import { useMediaQuery } from '@mui/material';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react'
import AnnouncementCards from './AnnouncementCards';


const AnnouncementModule = ({ }) => {


    const { data } = useSession();
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const currentUser: User|undefined = data?.user;
    
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

                headerLabel={`Announcements Manager`} tagline={'What would you like to do today?'}
                size={headerSize}
            />

            <div
                className='mt-12'
            >


                <AnnouncementCards
                />
            </div>
        </AdminWrapper>
    )
}



export default AnnouncementModule;