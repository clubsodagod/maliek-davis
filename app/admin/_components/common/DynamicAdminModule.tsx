/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import AdminWrapper from '@/components/wrappers/AdminWrapper';
import { useMediaQuery } from '@mui/material';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';
import DynamicAdminCards from './DynamicAdminCards';
import { adminSections } from '@/app/admin/_library/copy.const';

interface AdminModuleProps {
    sectionName: "announcement" | "categories" | "blog-posts" | "case-studies" | "subcategories"
}

const DynamicAdminModule: React.FC<AdminModuleProps> = ({ sectionName }) => {
    const { data } = useSession();
    const currentUser: User | undefined = data?.user;

    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined =
        desktop ? undefined : tabletXL ? 'xl' : tablet ? 'lg' : mobile ? 'md' : undefined;

    const adminRef = React.useRef<HTMLDivElement>(null);
    const id = `admin-dashboard-${sectionName}`;

    // Find the first-level section that has subSections
    const mainContentSection = adminSections.find((s) => s.name === 'contentManagement');
    const selectedSection = mainContentSection?.subSections?.find((ss) => ss.name === sectionName);
    const actions = selectedSection?.subSections ?? [];

    return (
        <AdminWrapper
            id={id}
            adminRef={adminRef}
            className='w-full h-full pt-[12vh] pb-[6vh] flex flex-col space-between px-6'
        >
            <MainHeroHeader
                headerLabel={`${selectedSection?.label ?? 'Admin'} Manager`}
                tagline={'What would you like to do today?'}
                size={headerSize}
            />

            <div className='mt-12'>
                <DynamicAdminCards actions={actions} />
            </div>
        </AdminWrapper>
    );
};

export default DynamicAdminModule;
