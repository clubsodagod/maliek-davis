import React from 'react'
import TechnologyApproachMainHero from './_components/TechnologyApproachMainHero'
import CoreGuidingPrinciples from './_components/core-guiding-principles/CoreGuidingPrinciples'
import DesignPatternsArchitecture from './_components/design-patterns-and-architecture/DesignPatternsArchitecture'
import HolisticTechnology from "./_components/holistic-technology/HolisticTechnology"
import ChoosingProjects from './_components/choosing-right-project/ChoosingProjects'
import RealResults from './_components/real-results/RealResults'
import ChooseYourPathCTA from '@/components/contact-forms/ChooseYourPathCTA'
import type { Metadata } from "next";


import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Approach to Technology & Systems Design | Maliek Davis",
    description:
        "Maliek Davis shares his philosophy on building scalable, maintainable software systems — grounded in clean architecture, systems thinking, and user-centered design.",
    keywords: [
        "software engineering principles",
        "clean architecture",
        "systems design",
        "sustainable tech development",
        "agile thinking",
        "developer philosophy",
        "tech approach",
        "Maliek Davis programming",
        "thinking in systems",
        "how to build better software"
    ],
    metadataBase: new URL("https://maliek-davis.com"),
    alternates: {
        canonical: "/technology/approach",
    },
    openGraph: {
        title: "My Tech Philosophy | Building with Purpose and Precision",
        description:
            "Go inside the mind of a systems builder. Learn how Maliek Davis approaches software, automation, and solving hard problems through clean, scalable architecture.",
        url: "https://maliek-davis.com/technology/approach",
        siteName: "Maliek Davis",
        images: ["/og-image.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "How I Build Systems That Work | Maliek Davis",
        description:
            "Understand the mindset behind the method. Maliek shares how he designs software and automation for impact and longevity.",
    },
};



const TechnologyApproachPage = () => {
    return (
        <>
            <TechnologyApproachMainHero />
            <CoreGuidingPrinciples />
            <DesignPatternsArchitecture />
            <HolisticTechnology />
            <ChoosingProjects />
            <RealResults />
            <ChooseYourPathCTA />
        </>
    )
}

export default TechnologyApproachPage