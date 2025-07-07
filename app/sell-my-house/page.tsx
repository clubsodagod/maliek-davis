import React from 'react'
import SellMyHouseModule from './_components/SellMyHouseModule'
import { Metadata } from 'next'

const SellMyHousePage = () => {
    return (
        <SellMyHouseModule />
    )
}

export default SellMyHousePage

export const metadata: Metadata = {
    title: "Sell Your House Fast in Michigan | Maliek Davis",
    description:
        "Need to sell your home fast in Metro Detroit, Grand Rapids, or anywhere in Michigan? Get a fair, data-backed cash offer from a trusted local buyer — no fees, no repairs, no agents.",
    keywords: [
        "sell my house fast",
        "cash home buyer Michigan",
        "Detroit house buyer",
        "Grand Rapids home investor",
        "no agent home sale",
        "as-is property sale",
        "real estate investor Michigan",
        "off-market sale",
        "motivated seller help",
        "fair cash offer house",
    ],
        alternates: {
            canonical: "/sell-my-house",
        },
    openGraph: {
        title: "Sell Your House Fast | Trusted Michigan Buyer | Maliek Davis",
        description:
            "Skip the agent, skip the stress. Sell your house fast with a fair cash offer from Maliek Davis — Metro Detroit & Grand Rapids specialist.",
        url: "https://maliek-davis.com/sell-my-house",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sell Your House Fast in Michigan",
        description:
            "Get a fast, fair offer for your Michigan property. Sell as-is. No fees. No pressure. Just results.",
    },
};
