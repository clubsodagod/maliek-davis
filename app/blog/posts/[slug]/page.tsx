import React from 'react'
import { IBlogPost } from '@/database/models/blog-posts.model';
import { getBlogPostBySlug, paginatedBlogFetcher } from '@/utility/fetchers/blog.fetcher';
import SlugPostModule from './_components/SlugPostModule';
import { Metadata } from 'next';

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
    const posts = await paginatedBlogFetcher(0, 0) as unknown as IBlogPost[];

    return posts.map((post) => ({
        slug: post.slug,
    }))
}



export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug: postSlug } = await params

    const post: IBlogPost | undefined = await getBlogPostBySlug(postSlug) as IBlogPost | undefined;

    return (
        <>
            <SlugPostModule
                post={post}
            />
        </>
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {

    const slug = (await params).slug;
    const post:IBlogPost|null = await getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found | Maliek Davis Blog",
            description: "Sorry, we couldn't find the post you're looking for.",
        };
    }

    return {
        title: `${post.title} | Maliek Davis`,
        description: post.metaDescription || post.metaDescription || post.content?.slice(0, 160),
        keywords: post.seoKeywords || ["blog", "real estate", "technology", "business growth"],
        openGraph: {
            title: post.title,
            description: post.metaDescription || post.metaDescription || "",
            url: `https://maliek-davis.com/blog/${post.slug}`,
            type: "article",
            images: post.featuredImg
                ? [{ url: post.featuredImg, alt: post.title }]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.metaDescription || "",
            images: post.featuredImg ? [post.featuredImg] : [],
        },
    };
}