import React from 'react'
import PrestigePartnersMainModule from './_components/PrestigePartnersMainModule'
import { Metadata } from 'next'

const PrestigePartnersPage = () => {
    return (
        <>
            <PrestigePartnersMainModule />
        </>
    )
}

export default PrestigePartnersPage

export const metadata: Metadata = {
    title: "Join the Prestige Partners Buyers Network | Maliek Davis",
    description:
        "Apply to join Maliek Davis' Prestige Partners program — an exclusive buyers network for investors seeking off-market deals, consistent deal flow, and high-touch service.",
    keywords: [
        "buyers network",
        "real estate investors",
        "off-market deals",
        "Michigan real estate buyers",
        "Prestige Partners",
        "investment property sourcing",
        "cash buyers list",
        "multifamily deals",
        "Maliek Davis buyers",
        "exclusive property deals",
    ],
    openGraph: {
        title: "Apply to Prestige Partners | Off-Market Deals for Buyers",
        description:
            "Connect with Maliek Davis and gain access to exclusive off-market properties through the Prestige Partners buyers network.",
        url: "https://maliek-davis.com/real-estate/prestige-partners",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Join My Real Estate Buyers Network | Prestige Partners",
        description:
            "Get direct access to high-quality deals and strategic opportunities. Apply to become a Prestige Partner today.",
    },
};
