import React from 'react'
import { IBlogPost } from '@/database/models/blog-posts.model';
import { getBlogPostBySlug, paginatedBlogFetcher } from '@/utility/fetchers/blog.fetcher';
import SlugPostModule from './_components/SlugPostModule';

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
    const posts =  await paginatedBlogFetcher(0, 0) as unknown as IBlogPost[];

    return posts.map((post) => ({
        slug: post.slug, 
    }))
}



export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug:postSlug } = await params

    const post:IBlogPost|undefined =  await getBlogPostBySlug(postSlug) as IBlogPost | undefined;
    
    return (
        <>
            <SlugPostModule 
                post={post}
            />
        </>
    )
}