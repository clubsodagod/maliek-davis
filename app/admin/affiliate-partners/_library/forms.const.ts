import { FormSection } from "@/library/types/forms.types";




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
        title: "Performance Metrics",
        fields: [
            {
                name: "performanceMetrics.clicks",
                label: "Clicks",
                type: "input",
                inputType: "number",
            },
            {
                name: "performanceMetrics.signups",
                label: "Signups",
                type: "input",
                inputType: "number",
            },
            {
                name: "performanceMetrics.conversions",
                label: "Conversions",
                type: "input",
                inputType: "number",
            },
            {
                name: "performanceMetrics.revenueGenerated",
                label: "Revenue Generated",
                type: "input",
                inputType: "number",
            },
        ],
    },
    {
        title: "Custom Links & Notes",
        fields: [
            {
                name: "customLinks",
                label: "Custom Links",
                type: "repeater", // You’ll implement this in the form logic
            },
            {
                name: "notes",
                label: "Internal Notes",
                type: "textarea",
            },
        ],
    },
];
