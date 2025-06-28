import { FormSection } from "@/library/types/forms.types";


export const blogPostFormSections: FormSection[] = [
    {
        title: "Category",
        fields: [
            {
                name: "category",
                label: "Category",
                type: "select",
                options: [
                    { value: "technology", label: "Technology" },
                    { value: "finance", label: "Finance" },
                    { value: "health", label: "Health" },
                    { value: "678c0562ef993fd95d3aa6f1", label: "Real Estate" },
                ],
                validation: {
                    required: "Category is required",
                },
            },
        ],
    },
    {
        title: "Subcategories",
        fields: [
            {
                name: "subcategories",
                label: "Subcategories",
                type: "multi-select",
                options: [
                    { value: "ai", label: "Artificial Intelligence" },
                    { value: "ml", label: "Machine Learning" },
                    { value: "economy", label: "Economy" },
                    { value: "mental_health", label: "Mental Health" },
                    { value: "property_management", label: "Property Management" },
                    // Add more subcategory options as needed
                ],
                validation: {
                    required: "At least one subcategory is required",
                },
            },
        ],
    },
    {
        title: "Title & Description",
        fields: [
            {
                name: "title",
                label: "Title",
                type: "input",
                validation: {
                    required: "Title is required",
                },
            },
            {
                name: "metaDescription",
                label: "Meta Description",
                type: "input",
                validation: {
                    required: "Meta description is required",
                },
            },
        ],
    },
    {
        title: "Featured Image",
        fields: [
            {
                name: "featuredImg",
                label: "Featured Image URL",
                type: "input",
                validation: {
                    required: "Image URL is required",
                    pattern: {
                        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                        message: "Must be a valid image URL (jpg, png, gif, etc.)",
                    },
                },
            },
        ],
    },
    {
        title: "Content",
        fields: [
            {
                name: "content",
                label: "Content",
                type: "tinyMCE",
                rows: 4,
                validation: {
                    required: "Content is required",
                },
            },
        ],
    },
    {
        title: "Tags",
        fields: [
            {
                name: "tags",
                label: "Tags",
                type: "tag",
                placeholder: "Add tag",
                validation: {
                    required: "At least one tag is required",
                },
            },
        ],
    },
];

