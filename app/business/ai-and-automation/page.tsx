import React from 'react'
import type { Metadata } from "next";
import BusinessModule from '../_components/BusinessModule';


export const metadata: Metadata = {
    title: "AI & Automation for Small Businesses | Maliek Davis",
    description:
        "Streamline your operations, save time, and scale faster with AI tools and smart automation. Maliek Davis helps small business owners create systems that run 24/7 — so you don't have to.",
    keywords: [
        "business automation",
        "ai tools for entrepreneurs",
        "automate your business",
        "workflow automation",
        "maliek davis ai systems",
        "small business efficiency",
        "crm automation",
        "email automation",
        "ai-powered business tools",
        "ai for small business owners",
    ],
    openGraph: {
        title: "Automate Like a Boss | AI & Automation with Maliek Davis",
        description:
            "Create systems that work while you sleep. Learn how to use AI and automation to reduce effort and increase output.",
        url: "https://maliek-davis.com/business/ai-and-automation",
        siteName: "Maliek Davis",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Use AI to Scale Smarter | Maliek Davis",
        description:
            "Don't burn out — automate. Learn how to build workflows, AI assistants, and hands-free systems for your business.",
    },
};


const BusinessAIAndAutomationPage = () => {
    return (
        <BusinessModule s={3} />
    )
}

export default BusinessAIAndAutomationPage