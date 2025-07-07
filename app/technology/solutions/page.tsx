import React from 'react'
import MainTechnologySolutionsHero from './_components/MainTechnologySolutionsHero'
import SolutionsPreview from './_components/SolutionsPreview'
import SolutionsCTA from './_components/solutions-cta/SolutionsCTA'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tech Solutions That Scale | Maliek Davis",
    description:
        "Explore the systems, tools, and automations Maliek Davis uses to streamline businesses, increase performance, and eliminate busywork. Built for growth, backed by results.",
    keywords: [
        "business automation",
        "ai tools for entrepreneurs",
        "systems for scaling",
        "software solutions",
        "technical automation",
        "no-code tools",
        "custom tech stacks",
        "Maliek Davis technology tools",
        "real estate automations",
        "streamline business processes"
    ],
    metadataBase: new URL("https://maliek-davis.com"),
    alternates: {
        canonical: "/technology/solutions",
    },
    openGraph: {
        title: "Systems & Tools That Work | Technology Solutions by Maliek Davis",
        description:
            "See the exact tools, automations, and frameworks Maliek uses to build and scale businesses with clarity and control.",
        url: "https://maliek-davis.com/technology/solutions",
        siteName: "Maliek Davis",
        images: ["/og-image.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Smart Tech Solutions for Real Growth | Maliek Davis",
        description:
            "Discover the systems behind the strategy. Use the same tools and automations that drive performance and peace of mind.",
    },
};


const TechnologySolutionsPage = () => {
    return (
        <>
            <MainTechnologySolutionsHero />
            <SolutionsPreview />
            <SolutionsCTA />
        </>
    )
}

export default TechnologySolutionsPage