import { IAffiliatePartnerForm } from "@/database/models/affiliate-partner.model";

export type FormFieldType = "input" | "textarea" | "select" | "tag" | "tinyMCE" | "multi-select";

export type ValidationRule = {
    required?: boolean | string;
    pattern?: {
        value: RegExp;
        message: string;
    };
};

export type FormField = {
    name: keyof IAffiliatePartnerForm;
    label: string;
    type: FormFieldType;
    rows?: number;
    placeholder?: string;
    options?: { value: string; label: string }[];
    validation?: ValidationRule;
};


export type FormSection = {
    title: string;
    fields: FormField[];
};




export const affiliatePartnerFormSections: FormSection[] = [
    {
        title: "Partner Identity",
        fields: [
            {
                name: "name",
                label: "Display Name",
                type: "input",
                validation: {
                    required: "Name is required",
                },
            },
            {
                name: "slug",
                label: "Slug",
                type: "input",
                validation: {
                    required: "Slug is required",
                },
            },
            {
                name: "companyName",
                label: "Company Name",
                type: "input",
            },
            {
                name: "tagline",
                label: "Tagline",
                type: "input",
            },
        ],
    },
    {
        title: "Contact & Branding",
        fields: [
            {
                name: "email",
                label: "Email",
                type: "input",
            },
            {
                name: "contactName",
                label: "Contact Name",
                type: "input",
            },
            {
                name: "websiteUrl",
                label: "Website URL",
                type: "input",
            },
            {
                name: "logoUrl",
                label: "Logo URL",
                type: "input",
            },
            {
                name: "bannerUrl",
                label: "Banner URL",
                type: "input",
            },
        ],
    },
    {
        title: "Categories & Setup",
        fields: [
            {
                name: "categories",
                label: "Categories",
                type: "multi-select",
                options: [], // to be dynamically populated
                validation: {
                    required: "At least one category is required",
                },
            },
            {
                name: "integrationType",
                label: "Integration Type",
                type: "select",
                options: [
                    { value: "manual", label: "Manual" },
                    { value: "api", label: "API" },
                    { value: "cj", label: "CJ Affiliate" },
                    { value: "shareasale", label: "ShareASale" },
                    { value: "custom", label: "Custom" },
                ],
            },
            {
                name: "affiliateCode",
                label: "Affiliate Code",
                type: "input",
            },
        ],
    },
    {
        title: "Custom Links & Notes",
        fields: [
            {
                name: "customLinks",
                label: "Custom Links",
            },
            {
                name: "notes",
                label: "Internal Notes",
                type: "textarea",
            },
        ],
    },
];
