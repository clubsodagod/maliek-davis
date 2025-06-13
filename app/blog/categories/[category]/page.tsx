import React from 'react'
import CategoryModule from './_components/CategoryModule';
import { ICategory } from '@/database/models/category.model';
import { getAllBlogPostCategories, paginatedBlogFetcher } from '@/utility/fetchers/blog.fetcher';
import { IBlogPost } from '@/database/models/blog-posts.model';
import { Metadata } from 'next';
import { getCategoryBySlug } from '@/utility/fetchers/blog.server-fetcher';

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
    const categories: ICategory[] = await getAllBlogPostCategories() as unknown as ICategory[];
    console.log(categories)

    return categories.map((category) => ({
        category: category.slug,
    }))
}


export default async function CategorySlugPage({

    params,
}: {
    params: Promise<{ category: string }>
}) {
    const { category: slug } = await params


    const categories = await getAllBlogPostCategories() as unknown as ICategory[];
    const category: ICategory = categories.filter((c) => c.slug === slug)[0];
    const posts = await paginatedBlogFetcher(0, 0) as unknown as IBlogPost[];


    return (
        <>
            <CategoryModule
                category={category}
                posts={posts}
            />
        </>

    )
}


export async function generateMetadata({
    params,
}: {
    params: Promise<{ category: string }>;
}): Promise<Metadata> {
    const category = await getCategoryBySlug((await params).category);

    if (!category) {
        return {
            title: "Category Not Found | Maliek Davis Blog",
            description: "This category doesn't exist. Please browse other blog topics.",
        };
    }

    return {
        title: `${category.name} Articles | Maliek Davis`,
        description: category.description || `Read all blog posts about ${category.name}.`,
        keywords: [
            category.slug,
            `${category.name} blog`,
            `maliek davis ${category.slug}`,
            `${category.name} insights`,
        ],
        openGraph: {
            title: `${category.name} Blog Posts | Maliek Davis`,
            description:
                category.description ||
                `Explore expert articles by Maliek Davis focused on ${category.name}.`,
            url: `https://maliek-davis.com/categories/${category.slug}`,
            siteName: "Maliek Davis",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${category.name} | Maliek Davis`,
            description:
                category.description || `Real-world insights on ${category.name}, straight from the blog.`,
        },
    };
}