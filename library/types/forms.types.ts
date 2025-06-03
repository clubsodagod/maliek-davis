import { IBlogPostClient } from "@/database/models/blog-posts.model";

export type FormFieldType = "input" | "textarea" | "select" | "tag" | "tinyMCE" | "multi-select";

export type ValidationRule = {
    required?: boolean | string;
    pattern?: {
        value: RegExp;
        message: string;
    };
};

export type FormField = {
    name: keyof IBlogPostClient;
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