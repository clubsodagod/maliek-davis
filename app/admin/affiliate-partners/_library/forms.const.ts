import { IAffiliatePartnerForm } from "@/database/models/affiliate-partner.model";

export type FormFieldType = "input" | "textarea" | "select" | "tag" | "tinyMCE" | "multi-select" | "checkbox" ;

export type ValidationRule = {
    required?: boolean | string;
    pattern?: {
        value: RegExp;
        message: string;
    };
};

export type FormField = {
    name: keyof IAffiliatePartnerForm | string; // Allow string for nested fields
    label: string;
    type: FormFieldType;
    rows?: number;
    placeholder?: string;
    options?: { value: string; label: string }[];
    validation?: ValidationRule;
    fields?: FormField[]; // Allow nested fields for custom field types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValue?: any;   // Allow defaultValue for fields like checkbox
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
                name: "companyName",
                label: "Company Name",
                type: "input",
            },
            {
                name: "description",
                label: "Description",
                type: "textarea",
                validation: {
                    required: "Description is required",
                },
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
        ],
    },
    {
        title: "Setup & Status",
        fields: [
            {
                name: "categories",
                label: "Categories",
                type: "multi-select",
                options: [], // populate dynamically
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
            {
                name: "active",
                label: "Is Active?",
                type: "checkbox",
                defaultValue: true,
            },
        ],
    },
    {
        title: "Custom Links & Notes",
        fields: [
            {
                name: "customLinks",
                label: "Custom Links",
                type: "multi-select",
                fields: [
                    {
                        name: "label",
                        label: "Label",
                        type: "input",
                    },
                    {
                        name: "url",
                        label: "URL",
                        type: "input",
                    },
                ],
            },
            {
                name: "notes",
                label: "Internal Notes",
                type: "textarea",
            },
        ],
    },
];

