import React from 'react'
import type { Metadata } from "next";
import BusinessModule from '../_components/BusinessModule';


export const metadata: Metadata = {
    title: "Build a Brand That Stands Out | Maliek Davis",
    description:
        "You don’t need a big budget to build a bold brand. Maliek Davis helps entrepreneurs create unforgettable brands that feel high-end, legit, and 100% you.",
    keywords: [
        "small business branding",
        "build a brand",
        "branding for entrepreneurs",
        "visual identity design",
        "brand messaging",
        "maliek davis branding",
        "brand strategy",
        "professional logo design",
        "brand voice",
        "startup branding services",
    ],
    openGraph: {
        title: "Small Business Branding That Hits Different | Maliek Davis",
        description:
            "Create a brand that speaks for you. From identity to voice — get a branding system that turns heads and earns trust.",
        url: "https://maliek-davis.com/business/branding",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Brand Like the Pros | Maliek Davis",
        description:
            "Look like a big deal — even if you're just starting out. Build a brand that elevates your business and your confidence.",
    },
};


const BusinessBrandingPage = () => {
    return (
        <BusinessModule s={1} />
    )
}

export default BusinessBrandingPage