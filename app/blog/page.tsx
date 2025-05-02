import React from 'react'
import BlogPageMainModule from './_components/BlogPageMainModule'
import { IBlogPost } from '@/database/models/blog-posts.model';
import { ICategory } from '@/database/models/category.model';
import { getAllBlogPostCategories, paginatedBlogFetcher } from '@/utility/fetchers/blog.fetcher';

export default async function BlogPage () {

    const categories = await getAllBlogPostCategories() as unknown as ICategory[];

    const posts = await paginatedBlogFetcher(0, 0) as unknown as IBlogPost[];

    return (
        <BlogPageMainModule posts={posts} categories={categories} />
    )
}
