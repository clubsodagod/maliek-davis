import React from 'react'
import type { Metadata } from "next";
import BusinessModule from '../_components/BusinessModule';


export const metadata: Metadata = {
    title: "Marketing & Growth Systems | Maliek Davis",
    description:
        "No more guesswork or burnout. Maliek Davis helps entrepreneurs build automated, results-driven marketing systems that generate leads and grow revenue — consistently.",
    keywords: [
        "marketing systems",
        "growth strategy",
        "lead generation funnels",
        "automated marketing",
        "maliek davis marketing",
        "small business growth",
        "email funnels",
        "customer acquisition systems",
        "entrepreneur marketing tools",
        "scalable growth systems",
    ],
    openGraph: {
        title: "Marketing & Growth Systems That Scale | Maliek Davis",
        description:
            "Grow without the grind. Automate your marketing and scale your revenue with proven systems.",
        url: "https://maliek-davis.com/business/marketing-and-growth-systems",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Marketing That Grows With You | Maliek Davis",
        description:
            "Set up systems that attract leads, nurture buyers, and grow your business — on autopilot.",
    },
};


const BusinessMarketingAndGrowthSystemsPage = () => {
    return (
        <BusinessModule s={4} />
    )
}

export default BusinessMarketingAndGrowthSystemsPage