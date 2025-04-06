import React from "react";



export type NavigationPath = {
    label: string;
    path: string;
    icon: React.ReactNode;
    children?: NavigationPath[];
}


export const navigationPaths: NavigationPath[] = [
    {
        label: "Home",
        path: "/",
        icon: undefined,
    },
    {
        label: "Technology",
        path: "/technology",
        icon: undefined,
        children: [
            { label: "Approach", path: "/technology/approach", icon: undefined },
            { label: "Solutions", path: "/technology/solutions", icon: undefined },
            { label: "Portfolio", path: "/technology/portfolio", icon: undefined },
        ],
    },
    {
        label: "Investments",
        path: "/investments",
        icon: undefined,
        children: [
            { label: "Real Estate Approach", path: "/investments/real-estate/approach", icon: undefined },
            { label: "Prestige Partners", path: "/investments/real-estate/prestige-partners", icon: undefined },
            { label: "Investment Criteria", path: "/investments/real-estate/criteria", icon: undefined },
        ],
    },
    {
        label: "Blog",
        path: "/blog",
        icon: undefined,
        children: [
            { label: "Categories", path: "/blog/categories", icon: undefined },
            { label: "Category", path: "/blog/:category", icon: undefined },
            { label: "Posts", path: "/blog/posts", icon: undefined },
            { label: "Post", path: "/blog/:post", icon: undefined },
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
