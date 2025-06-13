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


type PageProps = {
    params: Promise<{
        category: string;
    }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const category = await getCategoryBySlug((await params).category);

    if (!category) {
        return {
            title: "Category Not Found | Maliek Davis Blog",
            description: "This category doesn't exist. Please browse other blog topics.",
        };
    }

    const name = category.name;
    const description =
        category.description || `Read the latest blog posts and insights on ${name}.`;

    const url = `https://maliek-davis.com/categories/${category.slug}`;

    return {
        title: `${name} Articles | Maliek Davis`,
        description,
        keywords: [
            category.slug,
            `${name.toLowerCase()} blog`,
            `maliek davis ${category.slug}`,
            `${name.toLowerCase()} insights`,
        ],
        openGraph: {
            title: `${name} Blog Posts | Maliek Davis`,
            description,
            url,
            siteName: "Maliek Davis",
            type: "website",
            images: category.photo
                ? [
                    {
                        url: category.photo,
                        width: 1200,
                        height: 630,
                        alt: `${name} category`,
                    },
                ]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title: `${name} | Maliek Davis`,
            description,
            images: category.photo ? [category.photo] : [],
        },
    };
}