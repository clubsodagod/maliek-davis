import React from 'react'
import AllPostsMainModule from './_components/AllPostsMainModule'
import { IBlogPost } from '@/database/models/blog-posts.model';
import { paginatedBlogFetcher } from '@/utility/fetchers/blog.fetcher';
import { Metadata } from 'next';

export default async function AllPostsPage() {

    const posts = await paginatedBlogFetcher(0, 0) as unknown as IBlogPost[];

    return (
        <AllPostsMainModule posts={posts} />
    )
}

export const metadata: Metadata = {
    title: "Maliek Davis Blog | Real Estate, Business & Tech Insights",
    description:
        "Explore blog articles by Maliek Davis on real estate investing, business automation, and emerging technology. Learn how to grow, scale, and stay ahead.",
    keywords: [
        "maliek davis blog",
        "real estate insights",
        "business growth blog",
        "ai and automation tips",
        "entrepreneur blog",
        "real estate investing tips",
        "tech for small business",
        "scaling with systems",
        "blog for founders",
        "startup technology blog",
    ],
    alternates: {
        canonical: "/blog/posts",
    },
    openGraph: {
        title: "Insights on Real Estate, Business, and Tech | Maliek Davis Blog",
        description:
            "Learn how to level up your business, build smarter systems, and navigate real estate with confidence. Weekly insights from Maliek Davis.",
        url: "https://maliek-davis.com/blog/posts",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Read the Latest from Maliek Davis",
        description:
            "Insights, strategies, and guides at the intersection of real estate, entrepreneurship, and technology.",
    },
};
