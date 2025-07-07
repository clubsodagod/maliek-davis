import React from 'react'
import type { Metadata } from "next";
import BusinessModule from '../_components/BusinessModule';


export const metadata: Metadata = {
    title: "Digital Presence Design | Maliek Davis",
    description:
        "Your website is your storefront. Let’s make it count. Maliek Davis helps entrepreneurs design stunning, user-friendly websites and online systems that attract, engage, and convert.",
    keywords: [
        "digital presence",
        "small business website design",
        "build online presence",
        "maliek davis digital presence",
        "seo and ux design",
        "landing pages for small businesses",
        "online brand visibility",
        "responsive website",
        "professional web design",
        "entrepreneur web presence",
    ],
    alternates: {
        canonical: "/business/digital-presence",
    },
    openGraph: {
        title: "Build Your Digital Presence | Maliek Davis",
        description:
            "Don’t just show up online — stand out. Get a site and system that makes people trust, click, and buy.",
        url: "https://maliek-davis.com/business/digital-presence",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Digital Presence Design That Performs | Maliek Davis",
        description:
            "Make your website work as hard as you do. Beautiful, functional, and fast — built for conversion.",
    },
};


const BusinessDigitalPresencePage = () => {
    return (
        <BusinessModule s={2} />
    )
}

export default BusinessDigitalPresencePage