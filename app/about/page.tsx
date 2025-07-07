import React from 'react'
import AboutPageMainModule from './_components/AboutPageMainModule'
import type { Metadata } from "next";


const AboutPage = () => {
    return (
        <>
            <AboutPageMainModule />
        </>
    )
}

export default AboutPage


export const metadata: Metadata = {
    title: "About Maliek Davis | Innovator, Technologist, Real Estate Strategist",
    description:
        "Get to know Maliek Davis — a software engineer, real estate investor, and systems thinker driven by the mission to elevate quality of life through technology. Explore his journey, values, and vision.",

    alternates: {
        canonical: "/about",
    },
    keywords: [
        "about Maliek Davis",
        "who is Maliek Davis",
        "real estate investor and engineer",
        "software entrepreneur",
        "about the founder",
        "real estate and tech innovator",
        "personal brand story",
        "mission-driven entrepreneur",
        "tech meets real estate",
        "lifelong learner and builder",
    ],
    openGraph: {
        title: "Meet Maliek Davis | Real Estate & Tech Visionary",
        description:
            "Learn how Maliek Davis is blending engineering and real estate to solve problems, build wealth, and empower people through smarter systems.",
        url: "https://maliek-davis.com/about",
        siteName: "Maliek Davis",
        type: "profile",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Maliek Davis | Systems Thinker. Builder. Investor.",
        description:
            "Discover how Maliek blends tech and real estate to build value-driven ventures that empower and scale.",
    },
};
