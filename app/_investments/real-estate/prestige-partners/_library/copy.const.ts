export type PartnerBenefit = {
    title: string;
    description: string;
    photo: string;
};

export const partnerBenefits: PartnerBenefit[] = [
    {
        title: "Exclusive Investment Opportunities",
        description: "Gain first access to off-market and undervalued properties.",
        photo: "/images/benefits/exclusive-opportunities.jpg",
    },
    {
        title: "Proven Value-Add Strategies",
        description: "Optimize properties through renovations, better management, and strategic repositioning.",
        photo: "/images/benefits/value-add-strategies.jpg",
    },
    {
        title: "High-Touch, Hands-On Approach",
        description: "I personally oversee each investment, ensuring every dollar works efficiently.",
        photo: "/images/benefits/hands-on-approach.jpg",
    },
    {
        title: "Strong Market Insight",
        description: "Metro Detroit and select high-growth regions analyzed for rental demand, appreciation potential, and economic trends.",
        photo: "/images/benefits/market-insight.jpg",
    },
    {
        title: "Customized Partnership Models",
        description: "Tailored investment structures to fit different goals, whether passive income, capital appreciation, or deal structuring.",
        photo: "/images/benefits/partnership-models.jpg",
    },
    {
        title: "Focused on Multifamily Turnarounds",
        description: "I specialize in identifying underperforming multifamily properties with high potential for value appreciation and stable cash flow. My partnerships are built on trust, transparency, and results-driven execution.",
        photo: "/images/benefits/multifamily-focus.jpg",
    },
];

export type InvestmentProcessStep = {
    title: string;
    description: string;
    bulletPoints: string[];
    photo: string;
};

export const investmentProcess: InvestmentProcessStep[] = [
    {
        title: "Finding Undervalued Multifamily Properties",
        description:
            "I start by identifying opportunities others overlook — properties in emerging areas with below-market rents, distress signals, or inefficiencies that create potential for significant upside.",
        bulletPoints: [
            "Targeting below-market rents in up-and-coming neighborhoods",
            "Sourcing off-market and distressed assets with repositioning potential",
            "Focusing on locations with rising rent growth and employment expansion",
        ],
        photo: "https://images.pexels.com/photos/5646762/pexels-photo-5646762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        title: "Executing Value-Add Strategies",
        description:
            "Once acquired, I implement tailored value-add strategies that elevate both the tenant experience and the property's financial performance.",
        bulletPoints: [
            "Renovating interiors and exteriors to improve tenant appeal",
            "Enhancing operations and management to increase occupancy and NOI",
            "Utilizing smart financing structures to boost overall investor ROI",
        ],
        photo: "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        title: "Long-Term Wealth Creation",
        description:
            "After stabilization, my approach shifts to building durable wealth by holding assets, leveraging tax strategies, and using equity to scale into larger opportunities.",
        bulletPoints: [
            "Holding stabilized properties to capture long-term equity growth",
            "Leveraging depreciation and tax strategies to retain more income",
            "Refinancing and scaling into larger deals to expand the portfolio",
        ],
        photo: "https://images.pexels.com/photos/18801039/pexels-photo-18801039/free-photo-of-yachts-in-a-harbor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
];


export type PartnerCategory = {
    title: string;
    description: string;
    photo: string;
    bullets: string[];
};

export const partnerCategories: PartnerCategory[] = [
    {
        title: "💰 Private Investors & Capital Providers",
        description:
            "Seeking above-market returns through direct real estate investments, private equity placements, and joint venture opportunities.",
        photo: "https://images.pexels.com/photos/7414275/pexels-photo-7414275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        bullets: [
            "✔ Passive investment options for steady cash flow",
            "✔ Joint venture deals with structured profit-sharing",
            "✔ Direct equity investments in multifamily properties",
        ],
    },
    {
        title: "📜 Real Estate Attorneys & Tax Professionals",
        description:
            "Specializing in 1031 exchanges, tax strategy, syndication structuring, and asset protection for real estate investors.",
        photo: "https://images.pexels.com/photos/4427814/pexels-photo-4427814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        bullets: [
            "✔ Work alongside investors optimizing deals for legal and tax efficiency",
            "✔ Provide advisory services for deal structuring, asset protection & compliance",
        ],
    },
    {
        title: "🏗️ Contractors & Property Management Teams",
        description:
            "Partnering with reputable renovation, construction, and property management firms to execute value-add projects efficiently.",
        photo: "https://images.pexels.com/photos/7937369/pexels-photo-7937369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        bullets: [
            "✔ Reliable project execution for value-add renovations",
            "✔ Property management expertise to maximize NOI",
            "✔ Ongoing relationships for long-term asset growth",
        ],
    },
];
