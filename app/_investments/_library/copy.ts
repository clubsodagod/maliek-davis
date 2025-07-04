import { CaseStudyDocumentType } from "@/app/technology/portfolio/_library/copy.const";
import { IBlogPostClient, NormalizedCategory } from "@/library/types/blog.types";

export type InvestmentFocus = {
    category: string;
    photo: string;
    strategies: {
        title: string;
        description: string;
    }[];
};

export const investmentCategories: InvestmentFocus[] = [
    {
        category: "Real Estate Investments",
        strategies: [
            {
                title: "Multifamily & Commercial",
                description: "Acquiring underperforming assets, increasing value through renovations and operational improvements, and optimizing rental income.",
            },
            {
                title: "Distressed Properties & Fix & Flip",
                description: "Identifying undervalued properties, executing strategic rehabs, and flipping for strong returns.",
            },
            {
                title: "Real Estate Syndications & Joint Ventures",
                description: "Partnering with accredited investors to acquire larger properties that generate passive income.",
            },
        ],
        photo: "https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        category: "Stock Market & Public Equities",
        strategies: [
            {
                title: "Value & Growth Investing",
                description: "Identifying undervalued companies and high-growth industries.",
            },
            {
                title: "Dividend Stocks & Income Portfolios",
                description: "Building cash-flowing portfolios for long-term stability.",
            },
            {
                title: "Options Trading & Hedging Strategies",
                description: "Managing risk while leveraging market inefficiencies.",
            },
        ],
        photo: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        category: "Private Equity & Venture Capital",
        strategies: [
            {
                title: "Investing in Scalable Startups",
                description: "Funding disruptive companies with strong growth potential.",
            },
            {
                title: "Private Business Acquisitions",
                description: "Buying and optimizing businesses for long-term appreciation.",
            },
        ],
        photo: "https://images.pexels.com/photos/763934/pexels-photo-763934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        category: "Cryptocurrency & Blockchain Ventures",
        strategies: [
            {
                title: "Cryptocurrency & Blockchain Ventures",
                description: "Exploring digital assets, DeFi, and Web3 projects.",
            },
        ],
        photo: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        category: "Commodities & Hard Assets",
        strategies: [
            {
                title: "Commodities & Hard Assets",
                description: "Investing in gold, silver, and energy sectors as inflation hedges.",
            },
        ],
        photo: "https://images.pexels.com/photos/47047/gold-ingots-golden-treasure-47047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        category: "Cash Flow Investments",
        strategies: [
            {
                title: "Cash Flow Investments",
                description: "Exploring unique cash-flowing assets like ATMs, royalties, and intellectual property.",
            },
        ],
        photo: "https://images.pexels.com/photos/7841818/pexels-photo-7841818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
];


export const mockCaseStudies: CaseStudyDocumentType[] = [
    {
        title: "24-Unit Multifamily Turnaround",
        type: "Property",
        address: "19241 Westfield St, Detroit, MI",
        featuredImg: {
            mobile: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            tablet: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            desktop: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        featuredVideo: {
            mobile: "/videos/multifamily1_mobile.mp4",
            tablet: "/videos/multifamily1_tablet.mp4",
            desktop: "/videos/multifamily1_desktop.mp4",
        },
        photos: [
            "/images/multifamily1_1.jpg",
            "/images/multifamily1_2.jpg"
        ],
        logo: "/logos/partner1.png",
        summary: "Purchased a distressed 24-unit building in Detroit with high vacancy and outdated infrastructure. Executed full renovation and optimized management.",
        objectives: [
            "Increase occupancy from 50% to 95%",
            "Modernize all units and increase average rent",
            "Stabilize cash flow for refinance"
        ],
        challenges: [
            "High tenant turnover and poor maintenance history",
            "Below-market rents and poor curb appeal",
            "Outdated heating and plumbing systems"
        ],
        solutions: [
            "Full unit-by-unit renovation over 6 months",
            "New marketing strategy and tenant screening process",
            "Replaced HVAC and plumbing, improving energy efficiency"
        ],
        outcomes: {
            description: "Increased net operating income and property value through strategic renovations and leasing.",
            valueGenerated: 480000,
            technicalImpact: "Optimized operating expenses and improved tenant retention by 80%."
        }
    },
    {
        title: "Single-Family Fix & Flip Success",
        type: "Property",
        address: "4112 Auburn Ave, Grand Rapids, MI",
        featuredImg: {
            mobile: "https://images.pexels.com/photos/567186/pexels-photo-567186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            tablet: "https://images.pexels.com/photos/567186/pexels-photo-567186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            desktop: "https://images.pexels.com/photos/567186/pexels-photo-567186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        featuredVideo: {
            mobile: "/videos/fixflip1_mobile.mp4",
            tablet: "/videos/fixflip1_tablet.mp4",
            desktop: "/videos/fixflip1_desktop.mp4",
        },
        photos: [
            "/images/fixflip1_before.jpg",
            "/images/fixflip1_after.jpg"
        ],
        logo: "/logos/partner2.png",
        summary: "A distressed single-family home purchased at 50% below market value and resold within 90 days after cosmetic and functional improvements.",
        objectives: [
            "Acquire under market value",
            "Complete rehab under $35K",
            "Sell within 120 days with 25% ROI"
        ],
        challenges: [
            "Extensive cosmetic damage and code violations",
            "Poor layout and outdated kitchen",
            "Low curb appeal"
        ],
        solutions: [
            "Open-concept redesign and kitchen remodel",
            "Exterior facelift and landscaping",
            "Worked with city to resolve permits quickly"
        ],
        outcomes: {
            description: "Successful flip with a 32% return on investment, well above projection.",
            valueGenerated: 62000,
            technicalImpact: "Accelerated timeline by 3 weeks through vendor coordination and lean project management."
        }
    }
];

let now: Date | string = new Date();

now = now.toISOString();
export const mockInvestmentCategories: NormalizedCategory[] = [
    // ... your existing categories
    {
        id: "10005",
        name: 'Fractional Real Estate',
        slug: 'fractional-real-estate',
        tagline: 'Own Property, One Piece at a Time',
        description: 'Dive into the world of fractional ownership platforms and learn how to invest in real estate without buying entire properties.',
        photo: '/images/categories/fractional-real-estate.jpg',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10006",
        name: 'Real Estate Syndication',
        slug: 'real-estate-syndication',
        tagline: 'Pooling Capital, Scaling Wealth',
        description: 'Understand how syndications work, and how passive investors can earn from large-scale property deals with less effort.',
        photo: '/images/categories/syndication.jpg',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10007",
        name: 'Fintech & Investing Apps',
        slug: 'fintech-apps',
        tagline: 'Your Portfolio in Your Pocket',
        description: 'Explore the world of robo-advisors, investing platforms, budgeting tools, and how tech is reshaping financial habits.',
        photo: '/images/categories/fintech.jpg',
        video: '/videos/categories/fintech.mp4',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10008",
        name: 'Rental Property Cash Flow',
        slug: 'rental-cashflow',
        tagline: 'Income That Never Sleeps',
        description: 'Learn how to find, evaluate, and manage rental properties for maximum monthly income and long-term equity growth.',
        photo: '/images/categories/rental-cashflow.jpg',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10009",
        name: 'Tax Strategies for Investors',
        slug: 'tax-strategies',
        tagline: 'Keep More. Grow Faster.',
        description: 'From depreciation to 1031 exchanges, explore legal ways to reduce tax liability and accelerate your investment returns.',
        photo: '/images/categories/tax-strategies.jpg',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10010",
        name: 'Self-Mastery & Money',
        slug: 'money-mindset',
        tagline: 'Wealth Begins Within',
        description: 'Develop habits, mindsets, and systems that empower consistent growth, resilience, and smart financial behavior.',
        photo: '/images/categories/money-mindset.jpg',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10011",
        name: 'Tech-Enabled Investing',
        slug: 'tech-investing',
        tagline: 'Smarter Investments, Powered by Code',
        description: 'Learn how automation, algorithms, and APIs are unlocking new levels of insight and efficiency in investing.',
        photo: '/images/categories/tech-investing.jpg',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10012",
        name: 'Private Equity & Real Assets',
        slug: 'private-equity-real-assets',
        tagline: 'Beyond Public Markets',
        description: 'Explore private equity, land, and infrastructure investments as part of a sophisticated alternative portfolio.',
        photo: '/images/categories/private-equity.jpg',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10013",
        name: 'Credit & Lending',
        slug: 'credit-and-lending',
        tagline: 'The Power of Leverage',
        description: 'Understand how to strategically use credit, lines of credit, and private lending for investment expansion.',
        photo: '/images/categories/credit-lending.jpg',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10014",
        name: 'Investing for Beginners',
        slug: 'investing-basics',
        tagline: 'Start Small, Dream Big',
        description: 'A clear guide for new investors to build a strong financial foundation and make confident decisions in any market.',
        photo: '/images/categories/investing-basics.jpg',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    }
];


export const ftPostsMockRealEstate: IBlogPostClient[] = [
    {
        id: "r1",
        title: "How AI Is Revolutionizing Property Management",
        slug: "ai-property-management",
        featuredImg: "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "Full blog post content goes here...",
        author: { id: "a1", name: "Maliek Davis", avatar: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10000", name: "Property Tech", slug: "property_tech" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "Explore how artificial intelligence is reshaping tenant experiences, reducing costs, and streamlining real estate operations.",
            keywords: ["AI", "Real Estate", "Automation", "Property Management"],
            og: {
                title: "AI and Property Management",
                description: "The rise of AI in real estate explained.",
                image: "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            twitter: {
                title: "AI in Real Estate",
                description: "Smarter management with artificial intelligence.",
                image: "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
        },
        featured: true,
        readingTime: "5 min",
        language: "en",
        commentsCount: 4,
        status: "published"
    },
    {
        id: "r2",
        title: "Top 5 Real Estate Investment Strategies for 2025",
        slug: "top-investment-strategies-2025",
        featuredImg: "https://images.pexels.com/photos/12955837/pexels-photo-12955837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "Content about investment strategies...",
        author: { id: "a1", name: "Maliek Davis", avatar: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10003", name: "Wealth Building Strategies", slug: "wealth-building" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "Discover profitable strategies for real estate investing in the current market.",
            keywords: ["Investing", "Wealth Building", "2025"],
            og: {
                title: "Investment Tips for 2025",
                description: "The smartest plays for building wealth in real estate.",
                image: "https://images.pexels.com/photos/12955837/pexels-photo-12955837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            twitter: {
                title: "Real Estate in 2025",
                description: "Top strategies to watch.",
                image: "https://images.pexels.com/photos/12955837/pexels-photo-12955837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
        },
        featured: true,
        readingTime: "6 min",
        language: "en",
        commentsCount: 8,
        status: "published"
    },
    {
        id: "r3",
        title: "Understanding Fractional Real Estate Ownership",
        slug: "fractional-real-estate",
        featuredImg: "https://images.pexels.com/photos/7578892/pexels-photo-7578892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "What is fractional ownership and why it matters...",
        author: { id: "a1", name: "Maliek Davis", avatar: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10005", name: "Fractional Real Estate", slug: "fractional-real-estate" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "A breakdown of how fractional ownership works and why it's gaining traction.",
            keywords: ["Fractional Ownership", "Passive Income", "Real Estate Access"],
            og: {
                title: "Fractional Real Estate Ownership Explained",
                description: "Smarter access to property wealth.",
                image: "https://images.pexels.com/photos/7578892/pexels-photo-7578892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            twitter: {
                title: "Fractional Investing",
                description: "Break into real estate without a full down payment.",
                image: "https://images.pexels.com/photos/7578892/pexels-photo-7578892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
        },
        featured: true,
        readingTime: "4 min",
        language: "en",
        commentsCount: 2,
        status: "published"
    }
];

export const allPostsMockRealEstate: IBlogPostClient[] = [
    ...ftPostsMockRealEstate,
    {
        id: "r4",
        title: "How to Analyze a Rental Property Like a Pro",
        slug: "analyze-rental-property",
        featuredImg: "https://images.pexels.com/photos/8962687/pexels-photo-8962687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "Learn how to analyze rental properties for long-term cash flow.",
        author: { id: "a1", name: "Maliek Davis", avatar:"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10008", name: "Rental Property Cash Flow", slug: "rental-cashflow" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "Master the numbers behind successful rental investments.",
            keywords: ["Cash Flow", "Rental Analysis", "Real Estate"],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "7 min",
        language: "en",
        commentsCount: 3,
        status: "published"
    },
    {
        id: "r5",
        title: "REITs vs Direct Ownership: Which Is Better?",
        slug: "reits-vs-ownership",
        featuredImg: "https://images.pexels.com/photos/7027846/pexels-photo-7027846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "A head-to-head comparison between REIT investing and direct ownership.",
        author: { id: "a2", name: "Guest Contributor" },
        category: { id: "10004", name: "Alternative Investments", slug: "alternative-investments" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "Weigh the pros and cons of REITs vs buying your own property.",
            keywords: ["REIT", "Real Estate", "Investment"],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "5 min",
        language: "en",
        commentsCount: 5,
        status: "published"
    },
    {
        id: "r6",
        title: "Beginner’s Guide to Real Estate Syndication",
        slug: "syndication-guide",
        featuredImg: "https://images.pexels.com/photos/10486073/pexels-photo-10486073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "...",
        author: { id: "a1", name: "Maliek Davis", avatar:"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10006", name: "Real Estate Syndication", slug: "real-estate-syndication" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "An overview of real estate syndications for passive investors.",
            keywords: [],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "5 min",
        language: "en",
        commentsCount: 1,
        status: "published"
    },
    {
        id: "r7",
        title: "Smart Homes: Investment and Value Upside",
        slug: "smart-homes-value",
        featuredImg: "https://images.pexels.com/photos/5587962/pexels-photo-5587962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "...",
        author: { id: "a1", name: "Maliek Davis", avatar:"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10001", name: "Smart Homes", slug: "smart-homes" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "Smart homes increase convenience and value. Learn why they’re a trend worth watching.",
            keywords: [],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "6 min",
        language: "en",
        commentsCount: 6,
        status: "published"
    },
    {
        id: "r8",
        title: "Building a Wealth Plan Through Real Estate",
        slug: "wealth-plan-real-estate",
        featuredImg: "https://images.pexels.com/photos/15409440/pexels-photo-15409440/free-photo-of-exterior-of-residential-homes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "...",
        author: { id: "a1", name: "Maliek Davis", avatar:"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10003", name: "Wealth Building Strategies", slug: "wealth-building" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "",
            keywords: [],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "5 min",
        language: "en",
        commentsCount: 3,
        status: "published"
    },
    {
        id: "r9",
        title: "AI Tools That Help You Analyze Deals",
        slug: "ai-deal-analysis",
        featuredImg: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "...",
        author: { id: "a1", name: "Maliek Davis", avatar:"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10002", name: "AI in Real Estate", slug: "ai-real-estate" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "Explore AI tools that streamline investment analysis, underwriting, and prediction.",
            keywords: [],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "4 min",
        language: "en",
        commentsCount: 0,
        status: "published"
    },
    {
        id: "r10",
        title: "5 Mistakes New Investors Make",
        slug: "investor-mistakes",
        featuredImg: "https://images.pexels.com/photos/30781823/pexels-photo-30781823/free-photo-of-modern-luxury-villa-with-pool-exterior-at-twilight.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "...",
        author: { id: "a2", name: "Guest Contributor" },
        category: { id: "10014", name: "Investing for Beginners", slug: "investing-basics" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "Avoid common pitfalls with these expert tips.",
            keywords: [],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "3 min",
        language: "en",
        commentsCount: 4,
        status: "published"
    },
    {
        id: "r11",
        title: "Using Credit Strategically in Real Estate",
        slug: "credit-in-real-estate",
        featuredImg: "https://images.pexels.com/photos/5524165/pexels-photo-5524165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "...",
        author: { id: "a1", name: "Maliek Davis", avatar:"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10013", name: "Credit & Lending", slug: "credit-and-lending" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "",
            keywords: [],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "5 min",
        language: "en",
        commentsCount: 2,
        status: "published"
    },
    {
        id: "r12",
        title: "Tax Advantages of Real Estate You Should Know",
        slug: "tax-advantages-real-estate",
        featuredImg: "https://images.pexels.com/photos/8583893/pexels-photo-8583893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "...",
        author: { id: "a1", name: "Maliek Davis", avatar:"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10009", name: "Tax Strategies for Investors", slug: "tax-strategies" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "From depreciation to capital gains treatment, tax laws can supercharge real estate returns.",
            keywords: [],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "4 min",
        language: "en",
        commentsCount: 1,
        status: "published"
    },
    {
        id: "r13",
        title: "Why Location Still Matters in 2025",
        slug: "location-matters",
        featuredImg: "https://images.pexels.com/photos/5071141/pexels-photo-5071141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "...",
        author: { id: "a1", name: "Maliek Davis", avatar:"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10000", name: "Property Tech", slug: "property_tech" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "",
            keywords: [],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "6 min",
        language: "en",
        commentsCount: 5,
        status: "published"
    },
    {
        id: "r14",
        title: "How to Create Passive Income with Real Estate",
        slug: "passive-income-real-estate",
        featuredImg: "https://images.pexels.com/photos/28272345/pexels-photo-28272345/free-photo-of-a-home-with-brick-walkway-and-red-brick-driveway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "...",
        author: { id: "a1", name: "Maliek Davis", avatar:"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10003", name: "Wealth Building Strategies", slug: "wealth-building" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "",
            keywords: [],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "4 min",
        language: "en",
        commentsCount: 2,
        status: "published"
    },
    {
        id: "r15",
        title: "The Future of Real Estate Investing",
        slug: "future-of-real-estate",
        featuredImg: "https://images.pexels.com/photos/8894802/pexels-photo-8894802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "...",
        author: { id: "a1", name: "Maliek Davis", avatar:"https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742170630/ipobrq2pzy4fvgqynuc6_ohavpv.webp" },
        category: { id: "10011", name: "Tech-Enabled Investing", slug: "tech-investing" },
        createdAt: now,
        updatedAt: now,
        meta: {
            description: "",
            keywords: [],
            og: { title: "", description: "", image: "" },
            twitter: { title: "", description: "", image: "" }
        },
        featured: false,
        readingTime: "5 min",
        language: "en",
        commentsCount: 0,
        status: "published"
    }
];

export type RealEstateStrategy = {
    title: string;
    bulletPoints: string[];
    photo: string;
};

export const realEstateStrategies: RealEstateStrategy[] = [
    {
        title: "Multifamily Value-Add Properties",
        bulletPoints: [
            "Underperforming properties with below-market rents",
            "Located in emerging and high-demand rental markets",
            "Opportunities to increase NOI through renovations & better management",
            "Stabilized returns & long-term appreciation",
        ],
        photo: "https://images.pexels.com/photos/404173/pexels-photo-404173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Replace with actual asset
    },
    {
        title: "Distressed Asset Acquisitions",
        bulletPoints: [
            "REO properties, foreclosures, and off-market deals",
            "Heavy discount purchases with strong upside potential",
            "Strategic renovations to unlock equity & rental income",
            "Resale or refinance strategies to optimize returns",
        ],
        photo: "https://images.pexels.com/photos/5738480/pexels-photo-5738480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        title: "Rental Property Growth Strategy",
        bulletPoints: [
            "Single-family & small multifamily units in high-yield rental zones",
            "Long-term cash flow & passive income generation",
            "Tenant-first approach for stability and market demand",
            "Leveraging financing & tax strategies for investor benefits",
        ],
        photo: "https://images.pexels.com/photos/8962332/pexels-photo-8962332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        title: "Off-Market Deal Sourcing (Strategic Wholesaling)",
        bulletPoints: [
            "Exclusive access to deeply discounted properties",
            "Off-market deals with strong equity potential",
            "Fast-closing properties ideal for fix & flip or buy & hold investors",
            "Tailored deal flow for serious buyers & capital partners",
        ],
        photo: "https://images.pexels.com/photos/463734/pexels-photo-463734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
];

export type SourceEvaluate = {
    title: string;
    description: string;
    photo: string;
};

export const sourceEvaluationMethods: SourceEvaluate[] = [
    {
        title: "Proprietary Deal Flow",
        description: "Strong network of brokers, lenders, & motivated sellers",
        photo: "https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Replace with real image path
    },
    {
        title: "Comprehensive Market Research",
        description: "Rental demand, cap rates, and economic growth indicators",
        photo: "https://images.pexels.com/photos/669621/pexels-photo-669621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        title: "Due Diligence & Financial Analysis",
        description: "Property inspections, financial modeling & risk assessment",
        photo: "https://images.pexels.com/photos/6863184/pexels-photo-6863184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        title: "Creative Financing & Structuring",
        description: "Private equity, seller financing, & joint ventures",
        photo: "https://images.pexels.com/photos/6802048/pexels-photo-6802048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
];



export const mockCategories: NormalizedCategory[] = [
    {
        id: "10000",
        name: 'Property Tech',
        slug: 'property_tech',
        tagline: 'Revolutionizing Real Estate with Technology',
        description: 'Explore innovations in real estate powered by AI, blockchain, IoT, and automation. PropTech transforms how we buy, sell, and manage property.',

        photo: 'https://images.pexels.com/photos/6446681/pexels-photo-6446681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        video: '/videos/categories/proptech-intro.mp4',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10001",
        name: 'Smart Homes',
        slug: 'smart-homes',
        tagline: 'Future Living Starts at Home',
        description: 'Dive into home automation, smart energy systems, and connected living environments. Smart homes make life easier, greener, and safer.',

        photo: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        video: '/videos/categories/smart-homes.mp4',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10002",
        name: 'AI in Real Estate',
        slug: 'ai-real-estate',
        tagline: 'Predict. Optimize. Profit.',
        description: 'From automated valuations to predictive maintenance and tenant behavior analytics, AI is changing how real estate decisions are made.',

        photo: 'https://images.pexels.com/photos/1072851/pexels-photo-1072851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10003",
        name: 'Wealth Building Strategies',
        slug: 'wealth-building',
        tagline: 'Grow Smarter, Live Freer',
        description: 'Learn powerful strategies for long-term wealth creation, from real estate to tech investments. Build a life of financial freedom and impact.',

        photo: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        video: '/videos/categories/wealth-building.mp4',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10004",
        name: 'Alternative Investments',
        slug: 'alternative-investments',
        tagline: 'Think Outside the Stock',
        description: 'Explore REITs, crowdfunding, crypto, and other alternative investment vehicles for portfolio diversification and alpha generation.',

        photo: 'https://images.pexels.com/photos/47047/gold-ingots-golden-treasure-47047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    }
];