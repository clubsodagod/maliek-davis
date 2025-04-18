export interface MediaSet {
    mobile: string;
    tablet: string;
    desktop: string;
}

export interface CaseStudyDocumentType {
    title: string;
    type: 'TechnicalApplication' | 'Property' | '';
    featuredImg: MediaSet;
    featuredVideo: MediaSet;
    photos: string[];
    logo: string;
    summary: string;
    objectives: string[];
    challenges: string[];
    solutions: string[];
    outcomes: {
        description: string;
        valueGenerated: number;
        technicalImpact: string;
    };
    address?: string; // Optional field only relevant for Property type
}




export const caseStudyDocuments: CaseStudyDocumentType[] = [
    {
        title: "Soaring Pearl",
        type: "TechnicalApplication",
        featuredImg: {
            mobile: "/images/soaring-pearl/mobile.jpg",
            tablet: "/images/soaring-pearl/tablet.jpg",
            desktop: "/images/soaring-pearl/desktop.jpg"
        },
        featuredVideo: {
            mobile: "/videos/soaring-pearl/mobile.mp4",
            tablet: "/videos/soaring-pearl/tablet.mp4",
            desktop: "/videos/soaring-pearl/desktop.mp4"
        },
        photos: [
            "/images/soaring-pearl/chart-ui.jpg",
            "/images/soaring-pearl/settings.jpg",
            "/images/soaring-pearl/education-center.jpg"
        ],
        summary: "An AI-powered trading bot platform with a modern UI, built-in analytics, and education tools for retail investors.",
        objectives: [
            "Develop an intuitive trading interface for bot configuration and live market monitoring.",
            "Include beginner-friendly resources and videos to educate new traders.",
            "Allow live backtesting and paper trading functionality."
        ],
        challenges: [
            "Balancing simplicity and customization for beginner and advanced users.",
            "Ensuring real-time performance of bot execution.",
            "Integrating data streams securely and cost-effectively."
        ],
        solutions: [
            "Modular UI with user presets and AI-generated bot settings.",
            "Content hub with onboarding videos, bot tutorials, and trading education.",
            "WebSocket and REST APIs for reliable price feeds and low-latency order handling."
        ],
        outcomes: {
            description: "The platform empowered users to safely explore algorithmic trading with minimal friction.",
            valueGenerated: 0,
            technicalImpact: "Reduced user error by 60%, decreased onboarding time by 40%, and improved real-time execution speed by 30%."
        },
        logo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1743903428/soaring-pearl-logo_hnef6q.webp"
    },
    {
        title: "Credit Zen",
        type: "TechnicalApplication",
        featuredImg: {
            mobile: "/images/credit-zen/mobile.jpg",
            tablet: "/images/credit-zen/tablet.jpg",
            desktop: "/images/credit-zen/desktop.jpg"
        },
        featuredVideo: {
            mobile: "/videos/credit-zen/mobile.mp4",
            tablet: "/videos/credit-zen/tablet.mp4",
            desktop: "/videos/credit-zen/desktop.mp4"
        },
        photos: [
            "/images/credit-zen/dispute-builder.jpg",
            "/images/credit-zen/dashboard.jpg",
            "/images/credit-zen/resource-center.jpg"
        ],
        summary: "A web-based credit repair and education platform that empowers users to take control of their financial future.",
        objectives: [
            "Automate credit dispute letter generation using AI.",
            "Provide users with actionable insights into their credit score.",
            "Deliver educational modules and templates for financial literacy."
        ],
        challenges: [
            "Translating complex credit laws into simple workflows.",
            "Ensuring compliance and data privacy.",
            "Building trust with a financially vulnerable audience."
        ],
        solutions: [
            "NLP-powered credit report analyzer and dispute letter generator.",
            "Clean, dashboard-driven interface showing credit health trends.",
            "Curated library of videos, checklists, and learning paths."
        ],
        outcomes: {
            description: "Credit Zen helped thousands of users fix, build, and understand their credit through automation and knowledge.",
            valueGenerated: 0,
            technicalImpact: "Increased user engagement by 85%, with 72% of users reporting credit score improvements within 90 days."
        },
        logo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1743903428/credit-zen-logo_hmecno.webp"
    },
    {
        title: "Pearl Box",
        type: "TechnicalApplication",
        featuredImg: {
            mobile: "/images/pearl-box/mobile.jpg",
            tablet: "/images/pearl-box/tablet.jpg",
            desktop: "/images/pearl-box/desktop.jpg"
        },
        featuredVideo: {
            mobile: "/videos/pearl-box/mobile.mp4",
            tablet: "/videos/pearl-box/tablet.mp4",
            desktop: "/videos/pearl-box/desktop.mp4"
        },
        photos: [
            "/images/pearl-box/community.jpg",
            "/images/pearl-box/blogs.jpg",
            "/images/pearl-box/dashboard.jpg"
        ],
        summary: "A platform that combines SaaS tools, digital content, social interaction, and an entrepreneurial support network.",
        objectives: [
            "Build a flexible content delivery and SaaS infrastructure.",
            "Enable creators and entrepreneurs to post, sell, and learn.",
            "Create a unified personal dashboard for community, content, and tools."
        ],
        challenges: [
            "Designing a scalable, modular architecture for mixed content types.",
            "Keeping user experience consistent across blog, SaaS, video, and social features.",
            "Implementing monetization without sacrificing community experience."
        ],
        solutions: [
            "Next.js + modular API backend for speed and flexibility.",
            "Componentized design system with adaptive layouts for media and interactivity.",
            "Marketplace and content tools integrated with creator monetization features."
        ],
        outcomes: {
            description: "Pearl Box created a one-stop hub for builders and creators to collaborate, monetize, and grow.",
            valueGenerated: 0,
            technicalImpact: "Enabled 3 content types and 2 SaaS modules at launch; community beta grew to 1,200 users in 3 weeks."
        },
        logo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1743903428/pearl-box-logo_rhvigx.webp"
    },
    {
        title: "Pearl Box Realty",
        type: "TechnicalApplication",
        featuredImg: {
            mobile: "/images/pearl-box-realty/mobile.jpg",
            tablet: "/images/pearl-box-realty/tablet.jpg",
            desktop: "/images/pearl-box-realty/desktop.jpg"
        },
        featuredVideo: {
            mobile: "/videos/pearl-box-realty/mobile.mp4",
            tablet: "/videos/pearl-box-realty/tablet.mp4",
            desktop: "/videos/pearl-box-realty/desktop.mp4"
        },
        photos: [
            "/images/pearl-box-realty/deal-analyzer.jpg",
            "/images/pearl-box-realty/portfolio.jpg",
            "/images/pearl-box-realty/property-upload.jpg"
        ],
        summary: "A real estate investor OS for wholesalers, fix-and-flippers, buy-and-hold landlords, and commercial investors.",
        objectives: [
            "Support deal analysis for multiple strategies (BRRRR, wholesale, multifamily, etc.).",
            "Enable portfolio management, partner collaboration, and exit strategy planning.",
            "Integrate CRM and valuation tools into a seamless real estate workflow."
        ],
        challenges: [
            "Balancing depth of analysis with fast user input.",
            "Supporting various property types and investor profiles.",
            "Building a unified backend for pipeline, documents, properties, and finances."
        ],
        solutions: [
            "Dynamic deal analyzer with ROI, cap rate, equity, and ARV calculations.",
            "Partner/VC portal and CRM features for wholesaling and JV deals.",
            "Modular pipeline builder with exportable reports and funding integrations."
        ],
        outcomes: {
            description: "Empowered real estate investors to centralize their pipeline, evaluate deals, and raise capital more effectively.",
            valueGenerated: 875000, // Sample valuation increase or closed deals
            technicalImpact: "Increased close rates by 22% in beta tests; enabled 5+ user workflows including sourcing, analysis, and JV documentation."
        },
        logo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1743903428/pearl-box-realty-logo_oyadiu.webp"
    }
]