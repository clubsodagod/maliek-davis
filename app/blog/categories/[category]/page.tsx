import React from 'react'
import CategoryModule from './_components/CategoryModule';
import { ICategory } from '@/database/models/category.model';
import { getAllBlogPostCategories, paginatedBlogFetcher } from '@/utility/fetchers/blog.fetcher';
import { IBlogPost } from '@/database/models/blog-posts.model';

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

