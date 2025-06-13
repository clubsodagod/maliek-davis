import React from 'react'
import ContactModule from './_components/ContactModule'
import { Metadata } from 'next';

export default function ContactPage() {


    return (
        <>
            <ContactModule />
        </>
    )
}

export const metadata: Metadata = {
    title: "Contact Maliek Davis | Real Estate, Business & Tech Strategy",
    description:
        "Let’s connect. Reach out to Maliek Davis to discuss real estate investment opportunities, business strategy, automation systems, or technology consulting. Your next move starts here.",
    keywords: [
        "contact Maliek Davis",
        "real estate investor contact",
        "business automation consultant",
        "real estate deals Michigan",
        "real estate partner form",
        "AI automation strategy",
        "startup tech advisor",
        "digital systems for business",
        "entrepreneur contact form",
        "connect with real estate investor",
        "contact software engineer",
        "technology strategy contact",
    ],
    openGraph: {
        title: "Let’s Talk Real Estate, Business & Tech | Contact Maliek Davis",
        description:
            "Use this form to reach out about real estate deals, strategic business growth, or tech-based solutions. I look forward to building something powerful together.",
        url: "https://maliek-davis.com/contact",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Connect With Maliek Davis | Real Estate | Business | Tech",
        description:
            "Whether you’re an investor, founder, or innovator — let’s connect and create something meaningful.",
    },
};
