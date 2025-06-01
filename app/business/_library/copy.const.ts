export type PlanningItem = {
    title: string;
    bullets: string[];
    photo: string; // URL or relative path to image
}

export type ValueItem = {
    icon: string; // optional emoji or icon name
    title: string;
    bullets: string[];
    photo: string; // URL or relative path to image
}



export const whatIHelpYouWith: PlanningItem[] = [
    {
        "title": "Vision & Goals That Guide Every Move",
        "bullets": [
            "Long-term business vision",
            "Strategic goal-setting",
            "Reverse-engineered plans that create focus"
        ],
        "photo": "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1748725616/ChatGPT_Image_May_31_2025_05_06_08_PM_ulcvjw.webp"
    },
    {
        "title": "Revenue Strategy & Offers That Scale",
        "bullets": [
            "How to price for profit",
            "Offers that align with your audience & energy",
            "Revenue streams that build long-term freedom"
        ],
        "photo": "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1748726591/ChatGPT_Image_May_31_2025_05_11_01_PM_ih8dhf.webp"
    },
    {
        "title": "Quarterly Planning That Keeps You on Track",
        "bullets": [
            "Clear 90-day roadmaps",
            "KPIs & metrics that matter",
            "Systems for accountability"
        ],
        "photo": "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1748726591/ChatGPT_Image_May_31_2025_05_11_04_PM_beizrl.webp"
    },
    {
        "title": "Foundations for Funding, Scaling, or Hiring",
        "bullets": [
            "Business model clarity",
            "SOPs for growth",
            "Investor- or team-ready documentation"
        ],
        "photo": "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1748726591/ChatGPT_Image_May_31_2025_05_21_29_PM_wfquuh.webp"
    }
]

export const valueTheyGet: ValueItem[] = [
    {
        "icon": "🔍",
        "title": "Absolute Clarity",
        "bullets": [
            "Know exactly what to do next—and why",
            "Confidence in your direction, backed by strategy",
            "A full breakdown of your brand, offers, and goals"
        ],
        "photo": "/images/value-clarity.jpg"
    },
    {
        "icon": "💼",
        "title": "A CEO-Worthy Business Blueprint",
        "bullets": [
            "Custom, actionable business roadmap tailored to your goals",
            "Systems that replace guesswork with structure",
            "Quarterly plans that actually move the needle"
        ],
        "photo": "/images/value-blueprint.jpg"
    },
    {
        "icon": "💰",
        "title": "Revenue-Focused Strategy",
        "bullets": [
            "Offers that align with your audience and maximize profit",
            "Realistic pricing strategy and market fit",
            "A plan to scale sustainably without burnout"
        ],
        "photo": "/images/value-revenue.jpg"
    },
    {
        "icon": "🔗",
        "title": "Aligned Operations & Offers",
        "bullets": [
            "Your brand, marketing, and operations connected under one strategy",
            "No more spinning your wheels—just focused, intentional moves",
            "SOPs that let you delegate and grow"
        ],
        "photo": "/images/value-ops.jpg"
    },
    {
        "icon": "📈",
        "title": "Prep for Growth, Funding, or Hiring",
        "bullets": [
            "Documentation and systems to attract investors or loans",
            "Clarity that helps you lead a team with vision",
            "Strategic alignment for scaling on your terms"
        ],
        "photo": "/images/value-scale.jpg"
    }
]

export type BrandBuildingStep = {
    title: string;
    description: string;
    icon: string;      // Name of the icon or path (for use in frontend libraries like Lucide or FontAwesome)
    photo: string;     // URL or path to an image representing the concept visually
    label: string;     // Short keyword or theme label
};


export const brandBuildingProcess: BrandBuildingStep[] = [
    {
        title: "Clarify Your Brand Message",
        description: "Define what you stand for, who you serve, and what makes you different.",
        icon: "message-square", // Example: Lucide or HeroIcons name
        photo: "https://images.pexels.com/photos/7267582/pexels-photo-7267582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        label: "Message Clarity"
    },
    {
        title: "Design a Visual Identity That Matches Your Value",
        description: "Logos, colors, fonts, and design that reflect your power and purpose.",
        icon: "palette",
        photo: "https://images.pexels.com/photos/7661627/pexels-photo-7661627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        label: "Visual Identity"
    },
    {
        title: "Create Consistency Across All Touchpoints",
        description: "From your website to your packaging, social media to sales emails — your brand should feel cohesive and unmistakable.",
        icon: "link",
        photo: "https://images.pexels.com/photos/7598022/pexels-photo-7598022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        label: "Consistency"
    },
    {
        title: "Position to Compete With Giants",
        description: "We don’t play small. We help you own your niche, speak to your audience’s desires, and look like the category leader.",
        icon: "trending-up",
        photo: "https://images.pexels.com/photos/4427815/pexels-photo-4427815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        label: "Positioning"
    }
];

export type StrategySection = {
    id: number;
    label: string; // e.g., "Website Strategy That Converts"
    photo: string; // URL or local path to image
    headline: string;
    highlights: string[]; // Bullet points under each headline
};

export const strategies: StrategySection[] = [
    {
        id: 1,
        label: "Website Strategy",
        photo: "https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        headline: "Website Strategy That Converts",
        highlights: [
            "Not just pretty — strategic",
            "Clear messaging, modern design, trust elements",
            "Optimized for speed, SEO, and user experience"
        ]
    },
    {
        id: 2,
        label: "Search Engine Visibility",
        photo: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        headline: "Search Engine Visibility",
        highlights: [
            "Local SEO setup and optimization",
            "Keyword research + structure that ranks",
            "Technical SEO + content strategy done right"
        ]
    },
    {
        id: 3,
        label: "Social & Content Authority",
        photo: "https://images.pexels.com/photos/7970815/pexels-photo-7970815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        headline: "Social & Content Presence That Builds Authority",
        highlights: [
            "Cohesive brand voice across channels",
            "Content that educates, attracts, and sells",
            "Visibility strategies that don’t rely on paid ads"
        ]
    },
    {
        id: 4,
        label: "Digital Transformation",
        photo: "https://images.pexels.com/photos/9783812/pexels-photo-9783812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        headline: "Digital Transformation for Entrepreneurs",
        highlights: [
            "Modern tools to streamline operations",
            "Email, CRM, and lead-gen infrastructure",
            "Tech stack built for scale, not stress"
        ]
    }
];

export type BusinessCapabilityModule = {
    label: string;
    photo: string; // This could be a file path, URL, or imported asset
    features: string[];
};

export const businessCapabilityModules: BusinessCapabilityModule[] = [
    {
        label: "Small Business Automation Tools",
        photo: "https://images.pexels.com/photos/3785935/pexels-photo-3785935.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load", // replace with real path
        features: [
            "CRM + lead nurturing",
            "Email sequences that convert",
            "Task automation across platforms",
            "No-code tools that save hours a day",
        ],
    },
    {
        label: "AI for Entrepreneurs",
        photo: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        features: [
            "Content creation & planning with AI",
            "AI chatbots for support and sales",
            "Internal AI tools for decision-making, data insights, and daily workflows",
        ],
    },
    {
        label: "Revenue Multipliers",
        photo: "https://images.pexels.com/photos/5466796/pexels-photo-5466796.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: [
            "From quote to invoice — streamlined",
            "Automated appointment scheduling",
            "Customer journey mapping (with tech that handles the handoff)",
        ],
    },
    {
        label: "Profit-First Productivity",
        photo: "https://images.pexels.com/photos/7172858/pexels-photo-7172858.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: [
            "Eliminate repetitive tasks",
            "Delegate intelligently",
            "Free up your time for high-leverage moves",
        ],
    },
];

export type GrowthStrategyModule = {
    label: string;
    photo: string;
    features: string[];
};


export const growthStrategies: GrowthStrategyModule[] = [
    {
        label: "A Growth Strategy That Makes Sense for Small Business",
        photo: "https://dv-website.s3.amazonaws.com/uploads/2020/02/pg_datastrvsbizstr_201220.jpg",
        features: [
            "Clear, targeted marketing plans",
            "Lead-gen strategies that bring in consistent traffic",
            "Brand messaging that connects and converts",
        ],
    },
    {
        label: "Funnels That Follow Up & Close Sales",
        photo: "https://www.elegantthemes.com/blog/wp-content/uploads/2021/02/lead-magnet-featured-image-1.jpg",
        features: [
            "Lead magnets, landing pages, email sequences",
            "Customer journeys mapped for maximum conversions",
            "Evergreen content that builds trust over time",
        ],
    },
    {
        label: "Data-Driven Growth Infrastructure",
        photo: "https://images.ctfassets.net/f7c5cf3am3tw/4w05YFCfv8uv33O5JkRzbx/98baab7f961e374a40a44bd2b6d998bf/02_5key_points_data-driven_application_infrastructure.webp",
        features: [
            "Track what works, cut what doesn’t",
            "Tools that show ROI in real numbers",
            "Feedback loops to continuously improve",
        ],
    },
    {
        label: "Time-Freeing Campaigns & Automations",
        photo: "https://www.imbrace.co/wp-content/uploads/2023/10/What-is-Business-Process-Automation-Graphic-1-1-1024x683.png",
        features: [
            "Pre-built campaigns that can run with a click",
            "Automated follow-ups and retargeting",
            "Evergreen strategies that don’t expire after a post",
        ],
    },
];
