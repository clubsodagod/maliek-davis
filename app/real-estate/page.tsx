import React from 'react'
import RealEstateMainModule from './_components/RealEstateMainModule'
import { IBlogPost } from '@/database/models/blog-posts.model';
import { Metadata } from 'next';
import { clientBlogFetcherNonstatic } from '@/utility/fetchers/blog.server-fetcher';




const RealEstatePage = async () => {


    const posts = await clientBlogFetcherNonstatic() as unknown as IBlogPost[];

    return (
        <>
            <RealEstateMainModule posts={posts} />
        </>
    )
}

export default RealEstatePage

export const metadata: Metadata = {
    title: "Real Estate Strategy & Investment | Maliek Davis",
    description:
        "Discover how Maliek Davis applies data-driven strategy and tech innovation to real estate investing. Learn about acquisitions, property marketing, and community impact across Michigan and beyond.",
    keywords: [
        "real estate strategy",
        "real estate investing",
        "multifamily investing",
        "Maliek Davis real estate",
        "value-add properties",
        "real estate tech",
        "Detroit real estate",
        "Grand Rapids investment properties",
        "property acquisition",
        "real estate entrepreneur",
    ],
    alternates: {
        canonical: "/real-estate",
    },
    openGraph: {
        title: "Real Estate by Maliek Davis",
        description:
            "Explore Maliek Davis' approach to strategic real estate investing — from sourcing deals to improving communities.",
        url: "https://maliek-davis.com/real-estate",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Strategic Real Estate Investing | Maliek Davis",
        description:
            "Explore my approach to real estate deals, tech integrations, and building equity in communities.",
    },
};
