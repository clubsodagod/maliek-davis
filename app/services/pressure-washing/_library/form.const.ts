import { FormSection } from "@/app/sell-my-house/_library/copy.const";

export const powerWashFormSections: FormSection[] = [
    {
        title: "Contact Information",
        fields: [
            {
                name: "fullName",
                label: "Full Name",
                type: "text",
                validation: { required: "Full name is required" },
            },
            {
                name: "phone",
                label: "Phone Number",
                type: "tel",
                validation: {
                    required: "Phone number is required",
                    pattern: {
                        value: /^\(?([0-9]{3})\)?[-.●\s]?([0-9]{3})[-.●\s]?([0-9]{4})$/,
                        message: "Invalid phone number format",
                    },
                },
            },
            {
                name: "email",
                label: "Email Address",
                type: "email",
                validation: {
                    required: "Email is required",
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                    },
                },
            },
        ],
    },
    {
        title: "Service Location",
        fields: [
            {
                name: "address",
                label: "Street Address",
                type: "text",
                validation: { required: "Address is required" },
            },
            {
                name: "city",
                label: "City",
                type: "text",
                validation: { required: "City is required" },
            },
            {
                name: "state",
                label: "State",
                type: "select",
                options: [
                    { value: "MI", label: "Michigan" },
                    { value: "OH", label: "Ohio" },
                    { value: "IN", label: "Indiana" },
                    { value: "Other", label: "Other" },
                ],
                validation: { required: "State is required" },
            },
            {
                name: "zip",
                label: "Zip Code",
                type: "text",
                validation: {
                    required: "Zip code is required",
                    pattern: {
                        value: /^\d{5}$/,
                        message: "Enter a valid 5-digit zip code",
                    },
                },
            },
        ],
    },
    {
        title: "Service Selection",
        fields: [
            {
                name: "serviceCategory",
                label: "Primary Service Type",
                type: "select",
                options: [
                    { value: "🏠 Residential", label: "Residential" },
                    { value: "🏢 Small Business", label: "Small Business" },
                ],
                validation: { required: "Please choose a service type" },
            },
            {
                name: "selectedServices",
                label: "Select All That Apply",
                type: "checkbox", // Custom component to map checkboxes
            },
        ],
    },
    {
        title: "Additional Notes & Media",
        fields: [
            {
                name: "notes",
                label: "Additional Notes or Requests",
                type: "textarea",
                multiline: true,
                rows: 4,
            },
            {
                name: "photos",
                label: "Upload Photos (Optional)",
                type: "multi-file",
                accept: "image/*",
                multiple: true,
            },
        ],
    },
];
