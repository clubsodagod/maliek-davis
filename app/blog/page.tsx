import React from 'react'
import BlogPageMainModule from './_components/BlogPageMainModule'
import { IBlogPost } from '@/database/models/blog-posts.model';
import { ICategory } from '@/database/models/category.model';
import { getAllBlogPostCategories  } from '@/utility/fetchers/blog.fetcher';
import { Metadata } from 'next';
import { clientBlogFetcherNonstatic  } from '@/utility/fetchers/blog.server-fetcher';

export default async function BlogPage() {

    const categories = await getAllBlogPostCategories() as unknown as ICategory[];

    const posts = await clientBlogFetcherNonstatic() as unknown as IBlogPost[];
console.log('Fetched posts:', posts, 'categories:', categories.length);

    return (
        <BlogPageMainModule posts={posts} categories={categories} />
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
            canonical: "/blog",
        },
    openGraph: {
        title: "Insights on Real Estate, Business, and Tech | Maliek Davis Blog",
        description:
            "Learn how to level up your business, build smarter systems, and navigate real estate with confidence. Weekly insights from Maliek Davis.",
        url: "https://maliek-davis.com/blog",
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
