import React from 'react'
import CategoriesMainModule from './_components/CategoriesMainModule'
import { ICategory } from '@/database/models/category.model';
import { getAllBlogPostCategories } from '@/utility/fetchers/blog.fetcher';
import { Metadata } from 'next';

export default async function AllCategoriesPage() {

    const categories = await getAllBlogPostCategories() as unknown as ICategory[];

    return (
        <>
            <CategoriesMainModule
                categories={categories}
            />
        </>
    )
}


export const metadata: Metadata = {
    title: "Explore Blog Categories | Maliek Davis",
    description:
        "Filter blog content by category — from real estate and finance to technology and automation. Quickly find insights that matter most to you.",
    keywords: [
        "blog categories",
        "real estate category",
        "business strategy category",
        "automation blog topics",
        "entrepreneur blog filter",
        "maliek davis categories",
    ],
    openGraph: {
        title: "Categories | Maliek Davis Blog",
        description:
            "Choose your interest — browse categories for targeted insights in real estate, automation, growth, and more.",
        url: "https://maliek-davis.com/categories",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Browse by Category | Maliek Davis",
        description:
            "Cut through the noise. Find focused content by category on real estate, automation, and more.",
    },
};
