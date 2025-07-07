import React from 'react'
import type { Metadata } from "next";
import BusinessModule from '../_components/BusinessModule';


export const metadata: Metadata = {
    title: "Business Planning for Founders | Maliek Davis",
    description:
        "Whether you're just getting started or tightening up your foundation, Maliek Davis helps you clarify your offer, pricing, operations, and systems with smart business planning.",
    keywords: [
        "business planning for entrepreneurs",
        "startup strategy",
        "small business foundations",
        "maliek davis planning",
        "business model creation",
        "pricing strategy",
        "offer development",
        "business systems",
        "entrepreneur planning",
        "small business coaching",
    ],
    alternates: {
        canonical: "/business/business-planning",
    },
    openGraph: {
        title: "Plan Like a CEO | Business Planning with Maliek Davis",
        description:
            "Turn ideas into action with clear systems, pricing, and positioning. Build your business like a blueprint — not a guessing game.",
        url: "https://maliek-davis.com/business/business-planning",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Business Planning for Founders | Maliek Davis",
        description:
            "From vision to structure — let’s map out your business so it’s built to grow.",
    },
};


const BusinessPlanningPage = () => {
    return (
        <BusinessModule s={0} />
    )
}

export default BusinessPlanningPage