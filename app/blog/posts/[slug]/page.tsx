import React from 'react'
import { IBlogPost } from '@/database/models/blog-posts.model';
import SlugPostModule from './_components/SlugPostModule';
import { Metadata } from 'next';
import { serverBlogFetcher, serverGetBlogPostBySlug } from '@/utility/fetchers/blog.server-fetcher';
import { revalidatePath } from 'next/cache'


export const dynamic = "force-static";
// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams() {
revalidatePath('/blog/posts/[slug]', 'page')
    const posts = await serverBlogFetcher() as unknown as IBlogPost[];

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

    const post: IBlogPost | null = await serverGetBlogPostBySlug(postSlug);

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
    const post:IBlogPost|null = await serverGetBlogPostBySlug(slug);

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