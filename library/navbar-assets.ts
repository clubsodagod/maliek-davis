import React from "react";



export type NavigationPath = {
    label: string;
    path: string;
    icon: React.ReactNode;
    children?: NavigationPath[];
}


export const navigationPaths: NavigationPath[] = [
    // {
    //     label: "Home",
    //     path: "/",
    //     icon: undefined,
    // },
    {
        label: "Technology",
        path: "/technology",
        icon: undefined,
        children: [
            // {
            //     label: "Apps", path: "/technology/apps", icon: undefined,
            //     children: [
            //         { label: "Email Pearl", path: "/technology/apps/email-pearl", icon: undefined },
            //     ]
            // },
            { label: "Approach", path: "/technology/approach", icon: undefined },
            { label: "Solutions", path: "/technology/solutions", icon: undefined },
            { label: "Portfolio", path: "/technology/portfolio", icon: undefined },
        ],
    },
    {
        label: "Business",
        path: "/business",
        icon: undefined,
        children: [
            {
                label: "AI & Automation",
                path: "/business/ai-and-automation",
                icon: undefined
            },
            {
                label: "Branding",
                path: "/business/branding",
                icon: undefined
            },
            {
                label: "Business Planning",
                path: "/business/business-planning",
                icon: undefined
            },
            {
                label: "Digital Presence",
                path: "/business/digital-presence",
                icon: undefined
            },
            {
                label: "Marketing & Growth Systems",
                path: "/business/marketing-and-growth-systems",
                icon: undefined
            },
        ],
    },
    // {
    //     label: "Investments",
    //     path: "/investments",
    //     icon: undefined,
    //     children: [
    //         { label: "Real Estate Approach", path: "/investments/real-estate/approach", icon: undefined },
    //         { label: "Prestige Partners", path: "/investments/real-estate/prestige-partners", icon: undefined },
    //         { label: "Investment Criteria", path: "/investments/real-estate/criteria", icon: undefined },
    //     ],
    // },
    {
        label: "Real Estate",
        path: "/real-estate",
        icon: undefined,
        children: [
            {
                label: "Case Studies",
                path: "/real-estate/case-studies",
                icon: undefined
            },
            {
                label: "Prestige Partners",
                path: "/real-estate/prestige-partners",
                icon: undefined,
                children: [
                    {
                        label: "Become a Prestige Partner",
                        path: "/real-estate/prestige-partners/landing-page",
                        icon: undefined,
                    },
                ]
            },
        ],
    },
    {
        label: "Blog",
        path: "/blog",
        icon: undefined,
        children: [
            { label: "Categories", path: "/blog/categories", icon: undefined },
            { label: "Posts", path: "/blog/posts", icon: undefined },
        ],
    },
    {
        label: "About",
        path: "/about",
        icon: undefined,
    },
    {
        label: "Contact",
        path: "/contact",
        icon: undefined,
    },
];
