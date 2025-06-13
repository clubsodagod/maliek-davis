import React from 'react'
import type { Metadata } from "next";
import BusinessModule from './_components/BusinessModule';


export const metadata: Metadata = {
    title: "Maliek Davis | Compete With Giants. Run Your Business Like a Boss.",
    description:
        "Discover how to brand, automate, and scale your small business like the pros. We help entrepreneurs build a powerful online presence, master AI tools, and market with systems — not stress.",
    keywords: [
        "small business systems",
        "entrepreneur automation",
        "branding for startups",
        "ai tools for business",
        "maliek davis business strategy",
        "scaling a small business",
        "automated marketing funnels",
        "digital presence strategy",
        "small business branding",
        "run your business like a boss",
    ],
    openGraph: {
        title: "Build & Scale Your Business | Maliek Davis",
        description:
            "Learn how to scale your business, automate your workflows, and look like a pro online — even if you're a one-person team.",
        url: "https://maliek-davis.com/business",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Compete With Giants. Run Your Business Like a Boss.",
        description:
            "Brand smart. Automate early. Scale with systems. Learn how to build like the pros with Maliek Davis.",
    },
};


const BusinessPage = () => {
    return (
        <BusinessModule s={0} />
    )
}

export default BusinessPage