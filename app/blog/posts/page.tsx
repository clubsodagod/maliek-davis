import React from 'react'
import AllPostsMainModule from './_components/AllPostsMainModule'
import { IBlogPost } from '@/database/models/blog-posts.model';
import { paginatedBlogFetcher } from '@/utility/fetchers/blog.fetcher';

export default async function AllPostsPage () {
    
        const posts = await paginatedBlogFetcher(0, 0) as unknown as IBlogPost[];

    return (
        <AllPostsMainModule posts={posts} />
    )
}
