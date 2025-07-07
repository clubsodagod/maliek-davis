import React from 'react'
import MainTechnologyHero from './_components/MainTechnologyHero'
import WhyChooseMe from './_components/WhyChooseMe'
import TechnologySolutions from './_components/TechnologySolutions'
import SocialProof from './_components/SocialProof'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Technology Insights & Systems Thinking | Maliek Davis",
    description:
        "Explore how Maliek Davis uses technology, automation, and systems thinking to solve real-world problems, streamline business, and drive innovation across industries.",
    keywords: [
        "technology blog",
        "systems thinking",
        "automation tools",
        "ai for small business",
        "software engineering",
        "technical strategy",
        "tech innovation",
        "Maliek Davis technology",
        "business automation",
        "process improvement with tech"
    ],
    metadataBase: new URL("https://maliek-davis.com"),
    alternates: {
        canonical: "/technology",
    },
    openGraph: {
        title: "Build Smarter with Technology | Maliek Davis",
        description:
            "From AI to automation, discover how Maliek Davis uses technology to build scalable solutions that empower people and streamline systems.",
        url: "https://maliek-davis.com/technology",
        siteName: "Maliek Davis",
        images: ["/og-image.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Technology That Scales | Maliek Davis",
        description:
            "Learn how to think like a systems builder. Follow Maliek Davis for tech insights that create impact and momentum.",
    },
};


const TechnologyPage = () => {
    return (
        <>
            <MainTechnologyHero />
            <WhyChooseMe />
            <TechnologySolutions />
            <SocialProof />
        </>
    )
}

export default TechnologyPage