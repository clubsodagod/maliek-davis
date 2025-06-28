/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery, Typography } from "@mui/material";
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import AdminWrapper from '@/components/wrappers/AdminWrapper';
import { getAllCategories, getAllSubcategories, getAnnouncements, getBlogPosts, getCaseStudies, getSubcategoryOptions } from '@/utility/fetchers/content-manager.fetcher';
import AnnouncementUpdateForm from '../forms/update/AnnouncementUpdateForm';
import BlogPostUpdateForm from '../forms/update/BlogPostUpdateForm';
import CaseStudyUpdateForm from '../forms/update/CaseStudyUpdateForm';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { DynamicContentCard } from "./DynamicContentCard";
// import { SubcategoryUpdateForm } from "../forms/update/SubcategoryUpdateForm";

import { CategoryUpdateForm } from "../forms/update/CategoryUpdateForm";
import { ContentItem, FormType } from "../../_library/admin.types";
import { AnimatePresence } from "motion/react";



interface DynamicUpdateModuleProps {
    formType: FormType;
}

const DynamicUpdateModule: React.FC<DynamicUpdateModuleProps> = ({ formType }) => {
    const mobile = useMediaQuery(`(max-width:768px)`);
    const tablet = useMediaQuery(`(min-width:769px)`);
    const tabletXL = useMediaQuery(`(min-width:900px)`);
    const desktop = useMediaQuery(`(min-width:1100px)`);

    const headerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined =
        desktop ? "xl" : tabletXL ? "xl" : tablet ? "lg" : mobile ? "md" : undefined;

    const adminRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const id = "admin-dashboard";

    const [subcategoryOptions, setSubcategoryOptions] = useState<{ label: string; value: string }[]>([]);
    const [contentList, setContentList] = useState<ContentItem[]>([]);
    const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch subcategories once
    useEffect(() => {
        getSubcategoryOptions().then(setSubcategoryOptions);
    }, []);

    const reloadContent = async () => {
        const contentFetchers: Record<FormType, () => Promise<any[]>> = {
            "announcement": getAnnouncements,
            "category": getAllCategories,
            "subcategory": getAllSubcategories,
            "blog-post": getBlogPosts,
            "case-study": getCaseStudies,
        };

        setLoading(true);
        try {
            const data = await contentFetchers[formType]();
            console.log(data);

            const typedData = data.map(item => ({
                payload: item,
                type: formType,
            }));
            setContentList(typedData);
        } catch (error) {
            console.error(`Failed to fetch content for ${formType}:`, error);
            setContentList([]);
        } finally {
            setSelectedContent(null); // ✅ Clear selected document
            setLoading(false);
        }
    };

    useEffect(() => {
        reloadContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formType]);

    const handleCardClick = (item: ContentItem) => {
        setSelectedContent(item);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    };

    const renderForm = (type: FormType) => {
        if (!selectedContent) return null;



        switch (type) {
            case "announcement":
                if (selectedContent.type === "announcement") {
                    return <AnnouncementUpdateForm content={selectedContent.payload} onSuccess={reloadContent} />;
                }
                break;

            case "category":
                if (selectedContent.type === "category") {
                    return <CategoryUpdateForm content={selectedContent.payload} onSuccess={reloadContent} options={subcategoryOptions} />;
                }
                break;

            case "subcategory":
                // if (selectedContent.type === "subcategory") {
                //     return <SubcategoryUpdateForm {...commonProps} />;
                // }
                break;

            case "blog-post":
                if (selectedContent.type === "blog-post") {
                    return <BlogPostUpdateForm content={selectedContent.payload} onSuccess={reloadContent} />;
                }
                break;

            case "case-study":
                if (selectedContent.type === "case-study") {
                    return <CaseStudyUpdateForm content={selectedContent.payload} onSuccess={reloadContent} />;
                }
                break;

            default:
                return <div className="text-red-600">Invalid form type</div>;
        }

        return <div className="text-red-600">Type mismatch for selected content.</div>;
    };

    const renderDynamicCard = (item: ContentItem) => {
        console.log(item.payload);

        switch (item.type) {
            case "announcement":
                return (
                    <DynamicContentCard
                        type="announcement"
                        content={{
                            title: item.payload.title,
                            description: item.payload.description,
                            image: item.payload.image,
                            announcementType: item.payload.type,
                        }}
                    />
                );

            case "blog-post":
                return (
                    <DynamicContentCard
                        type="blog-post"
                        content={{
                            title: item.payload.title,
                            metaDescription: item.payload.ogDescription ?? item.payload.metaDescription ?? "",
                            featuredImg: item.payload.featuredImg,
                            category:
                                typeof item.payload.category === "object"
                                    ? item.payload.category?.name
                                    : item.payload.category,
                        }}
                    />
                );

            case "case-study":
                return (
                    <DynamicContentCard
                        type="case-study"
                        content={{
                            title: item.payload.title,
                            summary: item.payload.summary,
                            featuredImg: item.payload.featuredImg,
                        }}
                    />
                );

            case "category":
                console.log(item.payload.name);

                return (
                    <DynamicContentCard
                        type="category"
                        content={{
                            name: item.payload.name,
                            tagline: item.payload.tagline,
                            description: item.payload.description,
                            photo: item.payload.photo,
                        }}
                    />
                );

            case "subcategory":
                return null;

            default:
                return null;
        }
    };



    useEffect(() => {
        reloadContent()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            selectedContent && console.log(selectedContent);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedContent])
    return (
        <AdminWrapper
            id={id}
            adminRef={adminRef}
            className="w-full min-h-screen pt-[12vh] pb-[6vh] flex flex-col space-between px-6"
        >
            <MainHeroHeader
                headerLabel={`Update a ${formType.charAt(0).toUpperCase() + formType.slice(1)}`}
                tagline=""
                size={headerSize}
            />

            <div className="w-full h-grow min-h-full my-auto">
                <div className="flex flex-col gap-10">


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-auto gap-10 w-full lg:px-50">
                        {/* ✅ Render the selected form only once here */}
                        <MotionDiv className="w-full max-w-4xl mx-auto" ref={formRef}>
                            {selectedContent ? (
                                renderForm(formType)
                            ) : (
                                <Typography variant="body1" className="text-center text-gray-500 pt-10">
                                    Select a card to edit its details
                                </Typography>
                            )}
                        </MotionDiv>
                        {loading ? (
                            Array.from({ length: 6 }).map((_, idx) => (
                                <div key={idx} className="bg-gray-100 rounded-xl h-[220px] animate-pulse" />
                            ))
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {[...(selectedContent ? [selectedContent] : []), ...contentList.filter(item => item !== selectedContent)]?.map((item, index) => {
                                    console.log(item);
                                    
                                    return(<MotionDiv
                                        key={`${item.type}-${item.payload._id ?? index}`}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        onClick={() => handleCardClick(item)}
                                        className="cursor-pointer hover:scale-[1.01] transition-all"
                                    >
                                        {renderDynamicCard(item)}
                                    </MotionDiv>)
                                }
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>
        </AdminWrapper>

    );
};

export default DynamicUpdateModule;



// Placeholder fetchers — replace with real imports