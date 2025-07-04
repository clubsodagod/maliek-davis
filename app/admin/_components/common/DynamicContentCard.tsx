/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Image from "next/image";
import { Typography, Button } from "@mui/material";
import ComponentTransition from "@/components/layout/ComponentTransition";
import { MotionDiv } from "@/components/motion/MotionDiv";

// ----------------------
// Card Content TypeDefs
// ----------------------

type AnnouncementCard = {
    type: "announcement";
    content: {
        title: string;
        description: string;
        image?: string;
        announcementType?: string;
    };
};

type CaseStudyCard = {
    type: "case-study";
    content: {
        title: string;
        summary: string;
        featuredImg?: { url: string; alt: string };
    };
};

type BlogPostCard = {
    type: "blog-post";
    content: {
        title: string;
        metaDescription: string;
        featuredImg?: string;
        category?: string;
    };
};

type CategoryCard = {
    type: "category";
    content: {
        name: string;
        tagline: string;
        description: string;
        photo: string;
    };
};

type CardTypes = AnnouncementCard | CaseStudyCard | BlogPostCard | CategoryCard;

type DynamicContentCardProps<T extends CardTypes = CardTypes> = T & {
    open?: boolean;
};

// ----------------------
// Component
// ----------------------

export const DynamicContentCard = <T extends CardTypes>({
    type,
    content,
    open = true,
}: DynamicContentCardProps<T>) => {
    let title = "";
    let description = "";
    let image = "";
    let label = "";

    switch (type) {
        case "announcement":
            title = content.title;
            description = content.description;
            image = content.image || "";
            label = content.announcementType || "Announcement";
            break;
        case "case-study":
            title = content.title;
            description = content.summary;
            image = content.featuredImg?.url || "";
            label = "Case Study";
            break;
        case "blog-post":
            title = content.title;
            description = content.metaDescription;
            image = content.featuredImg || "";
            label = content.category || "Blog Post";
            break;
        case "category":
            title = content.name;
            description = content.description;
            image = content.photo;
            label = content.tagline || "Category";
            break;
    }

    return (
        <ComponentTransition id={`${title}-dynamic-card`}>
            <MotionDiv
                className="overflow-hidden rounded-4xl md:rounded-[100px] p-4 w-full h-full max-h-[158vh] bg-(--foreground) text-(--background)"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: open ? 1 : 1, y: open ? 20 : 20, scaleX: open ? 1 : 1.03 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "anticipate" }}
                style={{
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow: "1px -6px 8px #17171747",
                }}
            >
                {/* <Typography variant="subtitle1" fontWeight="bold" className="pt-2 pl-3 text-center">
                    {label}
                </Typography> */}

                {open && (
                    <MotionDiv
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="gap-6"
                    >
                        <MotionDiv className="flex justify-center my-4">
                            <div className="w-[30vh] h-[30vh] md:w-[300px] md:h-[300px]">
                                {image && (
                                    <Image
                                        alt={`${title} preview image`}
                                        src={image}
                                        sizes="100vw"
                                        width={9}
                                        height={16}
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "25%",
                                        }}
                                        className="w-full h-full"
                                    />
                                )}
                            </div>
                        </MotionDiv>

                        <div className="flex flex-col justify-start text-center p-4">
                            <Typography variant="h6" fontWeight="bold" className="pb-2">
                                {title}
                            </Typography>
                            <Typography variant="body1" className="line-clamp-6">{description}</Typography>

                            <MotionDiv
                                className="flex gap-3 justify-center mt-4"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <Button variant="contained">Learn More</Button>
                                <Button variant="outlined">Share</Button>
                            </MotionDiv>
                        </div>
                    </MotionDiv>
                )}
            </MotionDiv>
        </ComponentTransition>
    );
};

