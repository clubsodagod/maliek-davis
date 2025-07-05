"use client";

import { AnnouncementForm } from '@/app/admin/_components/forms/AnnouncementForm';
import { CategoryForm } from '@/app/admin/_components/forms/CategoryForm'; // ensure this is created
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import AdminWrapper from '@/components/wrappers/AdminWrapper';
import { useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { BlogPostForm } from '../forms/BlogPostForm';
import { CaseStudyForm } from '../forms/CaseStudyForm';
import { SubcategoryForm } from '../forms/SubcategoryForm';
import { getSubcategoryOptions } from '@/utility/fetchers/content-manager.fetcher';

// Extend this type with other form keys as needed
type FormType = "announcement" | "category" | "subcategory" | "blog-post" | "case-studies";

interface DynamicCreateModuleProps {
    formType: FormType;
}

const DynamicCreateModule: React.FC<DynamicCreateModuleProps> = ({ formType }) => {
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const [subcategoryOptions, setSubcategoryOptions] = React.useState<{ label: string; value: string }[]>([]);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined =
        desktop ? "xl" : tabletXL ? "xl" : tablet ? "lg" : mobile ? "md" : undefined;

    const adminRef = React.useRef<HTMLDivElement>(null);
    const id = "admin-dashboard";

    const renderForm = (type: FormType) => {
        switch (type) {
            case "announcement":
                return <AnnouncementForm />;
            case "category":
                return <CategoryForm options={subcategoryOptions} />;
            case "subcategory":
                return <SubcategoryForm />;
            case "blog-post":
                return <BlogPostForm />;
            case "case-studies":
                return <CaseStudyForm />;
            default:
                return <div className="text-red-600">Invalid form type</div>;
        }
    };

    useEffect(() => {
        const handleOptions = async () => {
            const res = await getSubcategoryOptions();
            setSubcategoryOptions(res);
        };


        handleOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AdminWrapper
            id={id}
            adminRef={adminRef}
            className='w-full min-h-screen pt-[12vh] pb-[6vh] flex flex-col space-between px-6'
        >
            <MainHeroHeader
                headerLabel={`Create a ${formType.charAt(0).toUpperCase() + formType.slice(1)}`}
                tagline={''}
                size={headerSize}
            />
            <div className='w-full h-grow min-h-full my-auto'>
                {renderForm(formType)}
            </div>
        </AdminWrapper>
    );
};

export default DynamicCreateModule;
