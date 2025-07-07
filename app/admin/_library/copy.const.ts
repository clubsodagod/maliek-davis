import { IFormField } from "@/library/types/cta-form.types";

export interface AdminSection {
    name: string;
    label: string;
    path: string;
    description: string;
    image: string;
    subSections?: AdminSection[];
}

export const adminSections: AdminSection[] = [
    {
        name: "contentManagement",
        label: "Content Management",
        path: "/admin/content-manager",
        description: "Create, edit, and manage all website content including articles, media, and SEO data.",
        image: "/images/admin/content-management.png",
        subSections: [
            {
                name: "announcement",
                label: "Announcements",
                path: "/admin/content-manager/announcements",
                description: "Create and manage public announcements to keep users informed of updates and promotions.",
                image: "/images/admin/announcements.jpg",
                subSections: [
                    {
                        name: "announcement-create",
                        label: "Create Announcement",
                        path: "/admin/content-manager/announcements/create",
                        description: "Add a new announcement to keep your audience updated.",
                        image: "/images/admin/announcements.jpg",
                    },
                    {
                        name: "announcement-update",
                        label: "Update Announcement",
                        path: "/admin/content-manager/announcements/update",
                        description: "Edit existing announcements to keep them relevant.",
                        image: "/images/admin/announcements.jpg",
                    }
                ]
            },
            {
                name: "blog-posts",
                label: "Blog Posts",
                path: "/admin/content-manager/blog-posts",
                description: "Write, edit, and publish blog articles to educate, inform, or entertain your audience.",
                image: "/images/admin/blog-posts.jpg",
                subSections: [
                    {
                        name: "blog-posts-create",
                        label: "Create Blog Post",
                        path: "/admin/content-manager/blog-posts/create",
                        description: "Compose a new blog article for your readers.",
                        image: "/images/admin/blog-posts.jpg",
                    },
                    {
                        name: "blog-posts-update",
                        label: "Update Blog Post",
                        path: "/admin/content-manager/blog-posts/update",
                        description: "Revise or update published blog posts.",
                        image: "/images/admin/blog-posts.jpg",
                    }
                ]
            },
            {
                name: "case-studies",
                label: "Case Studies",
                path: "/admin/content-manager/case-studies",
                description: "Showcase success stories and in-depth examples of how your solutions deliver results.",
                image: "/images/admin/case-studies.jpg",
                subSections: [
                    {
                        name: "case-studies-create",
                        label: "Create Case Study",
                        path: "/admin/content-manager/case-studies/create",
                        description: "Document and share a new success story.",
                        image: "/images/admin/case-studies.jpg",
                    },
                    {
                        name: "case-studies-update",
                        label: "Update Case Study",
                        path: "/admin/content-manager/case-studies/update",
                        description: "Update case studies with new insights or results.",
                        image: "/images/admin/case-studies.jpg",
                    }
                ]
            },
            {
                name: "categories",
                label: "Categories",
                path: "/admin/content-manager/categories",
                description: "Organize content and products into meaningful categories to improve navigation and discovery.",
                image: "/images/admin/categories.jpg",
                subSections: [
                    {
                        name: "categories-create",
                        label: "Create Category",
                        path: "/admin/content-manager/categories/create",
                        description: "Add a new category to better structure your content.",
                        image: "/images/admin/categories.jpg",
                    },
                    {
                        name: "categories-update",
                        label: "Update Category",
                        path: "/admin/content-manager/categories/update",
                        description: "Edit or remove existing categories.",
                        image: "/images/admin/categories.jpg",
                    }
                ]
            },
            {
                name: "subcategories",
                label: "Subcategories",
                path: "/admin/content-manager/subcategories",
                description: "Organize content and products into more specific subcategories to enhance navigation and filtering.",
                image: "/images/admin/subcategories.jpg",
                subSections: [
                    {
                        name: "subcategories-create",
                        label: "Create Subcategory",
                        path: "/admin/content-manager/subcategories/create",
                        description: "Add a new subcategory to refine your content structure.",
                        image: "/images/admin/subcategories.jpg",
                    },
                    {
                        name: "subcategories-update",
                        label: "Update Subcategory",
                        path: "/admin/content-manager/subcategories/update",
                        description: "Edit or remove existing subcategories.",
                        image: "/images/admin/subcategories.jpg",
                    }
                ]
            }
        ]
    },
    // {
    //     name: "sessions",
    //     label: "Sessions",
    //     path: "/admin/sessions",
    //     description: "Track active user sessions, monitor behavior, and view login history.",
    //     image: "/images/admin/sessions.png",
    // },
    {
        name: "messages",
        label: "Messages",
        path: "/admin/messages",
        description: "View and manage user inquiries, contact form submissions, and support requests.",
        image: "/images/admin/messages.png",
    },
    {
        name: "prestigePartnerApplications",
        label: "Prestige Partner Applications",
        path: "/admin/prestige-partners",
        description: "Review applications and onboard potential prestige partners.",
        image: "/images/admin/prestige-partners.png",
    },
    {
        name: "ctaForms",
        label: "CTA Forms",
        path: "/admin/call-to-action-forms",
        description: "Manage call-to-action forms submitted by users across the platform.",
        image: "/images/admin/forms.png",
    },
    {
        name: "affiliatePartners",
        label: "Affiliate Partners",
        path: "/admin/affiliate-partners",
        description: "Manage affiliate relationships, track performance, and approve applications.",
        image: "/images/admin/affiliates.png",
        subSections: [
            {
                name: "affiliatePartnersCreate",
                label: "Create Affiliate Partner",
                path: "/admin/affiliate-partners/create",
                description: "Add a new affiliate partner to expand your network and grow your reach.",
                image: "/images/admin/affiliate-partner.jpg",
            },
            {
                name: "affiliatePartnersUpdate",
                label: "Update Affiliate Partners",
                path: "/admin/affiliate-partners/update",
                description: "Edit existing affiliate partners to keep information accurate and up to date.",
                image: "/images/admin/affiliate-partner.jpg",
            }
        ]
    },
];

export const baseAnnouncementFields: IFormField[] = [
    {
        name: "title",
        label: "Title",
        type: "text",
        required: true,
        validation: { minLength: 3 }
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
        multiline: true,
        rows: 5
    },
    {
        name: "image",
        label: "Image URL",
        type: "text"
    },
    {
        name: "type",
        label: "Announcement Type",
        type: "select",
        required: true,
        options: ["investmentOpportunity", "completedClientProject", "newSocialContent"]
    }
];


export const investmentOpportunityFields: IFormField[] = [
    {
        name: "investmentOpportunity.category",
        label: "Category",
        type: "select",
        required: true,
        options: ["real_estate", "technical_project"]
    },
    {
        name: "investmentOpportunity.dealSummary",
        label: "Deal Summary",
        type: "textarea",
        required: true,
        multiline: true,
        rows: 4
    },
    {
        name: "investmentOpportunity.location",
        label: "Location",
        type: "text"
    },
    {
        name: "investmentOpportunity.minInvestment",
        label: "Minimum Investment ($)",
        type: "number"
    },
    {
        name: "investmentOpportunity.projectedReturns",
        label: "Projected Returns",
        type: "text"
    },
    {
        name: "investmentOpportunity.deadline",
        label: "Investment Deadline",
        type: "date"
    },
    {
        name: "investmentOpportunity.linkToMoreInfo",
        label: "More Info URL",
        type: "text"
    }
];

export const completedClientProjectFields: IFormField[] = [
    {
        name: "completedClientProject.clientName",
        label: "Client Name",
        type: "text",
        required: true
    },
    {
        name: "completedClientProject.projectName",
        label: "Project Name",
        type: "text",
        required: true
    },
    {
        name: "completedClientProject.technologiesUsed",
        label: "Technologies Used (comma-separated)",
        type: "text"
    },
    {
        name: "completedClientProject.summary",
        label: "Project Summary",
        type: "textarea",
        required: true,
        multiline: true,
        rows: 4
    },
    {
        name: "completedClientProject.caseStudyLink",
        label: "Case Study URL",
        type: "text"
    }
];

export const newSocialContentFields: IFormField[] = [
    {
        name: "newSocialContent.platform",
        label: "Platform",
        type: "select",
        required: true,
        options: ["YouTube", "TikTok", "Instagram", "X (Twitter)", "LinkedIn"]
    },
    {
        name: "newSocialContent.postTitle",
        label: "Post Title",
        type: "text",
        required: true
    },
    {
        name: "newSocialContent.postUrl",
        label: "Post URL",
        type: "text",
        required: true
    },
    {
        name: "newSocialContent.tags",
        label: "Tags (comma-separated)",
        type: "text"
    }
];

