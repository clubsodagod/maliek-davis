import React from 'react'
import LandingPageModule from './_components/LandingPageModule'
import type { Metadata } from "next";

export default function PrestigePartnersLandingPage() {
    return (
        <>
            <LandingPageModule />
        </>
    )
}


export const metadata: Metadata = {
    title: "Prestige Partners Application | Off-Market Real Estate Deals",
    description:
        "Discover how the Prestige Partners network by Maliek Davis connects elite investors with vetted, off-market real estate opportunities. Gain priority access to deals that never hit the public market.",
    keywords: [
        "real estate investment network",
        "exclusive real estate deals",
        "off-market investment properties",
        "multifamily real estate sourcing",
        "join cash buyers list",
        "private real estate opportunities",
        "Prestige Partners landing page",
        "Maliek Davis investments",
        "real estate buyer qualification",
        "high-touch investor experience"
    ],
    metadataBase: new URL("https://maliek-davis.com"),
    alternates: {
        canonical: "/real-estate/prestige-partners/landing-page",
    },
    openGraph: {
        title: "Prestige Partners | Get Access to Off-Market Investment Deals",
        description:
            "Join an elite community of real estate investors and gain access to exclusive, high-quality deals through the Prestige Partners landing experience.",
        url: "https://maliek-davis.com/real-estate/prestige-partners/landing",
        siteName: "Maliek Davis",
        images: ["/og-image.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Join the Prestige Partners Network | Off-Market Deal Flow",
        description:
            "Partner with Maliek Davis and get direct access to curated real estate investments. Exclusive. Vetted. Investor-ready.",
    },
};
