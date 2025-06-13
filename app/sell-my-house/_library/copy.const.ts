export type FormFieldType =
    | 'text'
    | 'email'
    | 'tel'
    | 'number'
    | 'select'
    | 'textarea'
    | 'file'
    | 'multi-file'
    | 'checkbox'
    | 'radio';

export interface FormField {
    name: string;
    label: string;
    type: FormFieldType;
    placeholder?: string;
    options?: { label: string; value: string }[]; // For select/radio types
    validation?: {
        required?: string;
        pattern?: { value: RegExp; message: string };
        minLength?: { value: number; message: string };
        maxLength?: { value: number; message: string };
    };
    multiline?: boolean;
    rows?: number;
    accept?: string; // For file inputs
    multiple?: boolean; // For multi-file
}

export interface FormSection {
    title: string;
    description?: string;
    fields: FormField[];
}

export const leadFormSections: FormSection[] = [
    {
        title: 'Contact Information',
        fields: [
            {
                name: 'firstName',
                label: 'First Name',
                type: 'text',
                validation: { required: 'First name is required' },
            },
            {
                name: 'lastName',
                label: 'Last Name',
                type: 'text',
                validation: { required: 'Last name is required' },
            },
            {
                name: 'email',
                label: 'Email',
                type: 'email',
                validation: {
                    required: 'Email is required',
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Enter a valid email address',
                    },
                },
            },
            {
                name: 'phone',
                label: 'Phone Number',
                type: 'tel',
                validation: {
                    required: 'Phone number is required',
                    pattern: {
                        value: /^\(?([0-9]{3})\)?[-.●\s]?([0-9]{3})[-.●\s]?([0-9]{4})$/,
                        message: 'Invalid phone number format',
                    },
                },
            },
            {
                name: 'contactMethod',
                label: 'Preferred Contact Method',
                type: 'select',
                options: [
                    { value: 'phone', label: 'Phone Call' },
                    { value: 'text', label: 'Text Message' },
                    { value: 'email', label: 'Email' },
                ],
                validation: { required: 'Please select a contact method' },
            },
        ],
    },
    {
        title: 'Property Location',
        fields: [
            {
                name: 'address',
                label: 'Street Address',
                type: 'text',
                validation: { required: 'Address is required' },
            },
            {
                name: 'city',
                label: 'City',
                type: 'text',
                validation: { required: 'City is required' },
            },
            {
                name: 'state',
                label: 'State',
                type: 'select',
                options: [
                    { value: 'MI', label: 'Michigan' },
                    { value: 'OH', label: 'Ohio' },
                    { value: 'IN', label: 'Indiana' },
                    { value: 'Other', label: 'Other' },
                ],
                validation: { required: 'State is required' },
            },
            {
                name: 'zip',
                label: 'Zip Code',
                type: 'text',
                validation: {
                    required: 'Zip code is required',
                    pattern: {
                        value: /^\d{5}$/,
                        message: 'Enter a valid 5-digit zip code',
                    },
                },
            },
        ],
    },
    {
        title: 'Property Details',
        fields: [
            {
                name: 'propertyType',
                label: 'Property Type',
                type: 'select',
                options: [
                    { value: 'single_family', label: 'Single Family' },
                    { value: 'duplex', label: 'Duplex' },
                    { value: 'triplex', label: 'Triplex' },
                    { value: 'fourplex', label: 'Fourplex' },
                    { value: 'multifamily', label: 'Multifamily (5+ Units)' },
                ],
                validation: { required: 'Select a property type' },
            },
            {
                name: 'bedrooms',
                label: 'Number of Bedrooms',
                type: 'number',
                validation: { required: 'Enter number of bedrooms' },
            },
            {
                name: 'bathrooms',
                label: 'Number of Bathrooms',
                type: 'number',
                validation: { required: 'Enter number of bathrooms' },
            },
            {
                name: 'condition',
                label: 'Property Condition',
                type: 'select',
                options: [
                    { value: 'move_in_ready', label: 'Move-in Ready' },
                    { value: 'minor_repairs', label: 'Needs Minor Repairs' },
                    { value: 'full_rehab', label: 'Needs Full Rehab' },
                ],
                validation: { required: 'Select property condition' },
            },
            {
                name: 'occupancy',
                label: 'Occupancy Status',
                type: 'select',
                options: [
                    { value: 'owner_occupied', label: 'Owner Occupied' },
                    { value: 'tenant_occupied', label: 'Tenant Occupied' },
                    { value: 'vacant', label: 'Vacant' },
                ],
                validation: { required: 'Select occupancy status' },
            },
            {
                name: 'timeline',
                label: 'How Soon Do You Want to Sell?',
                type: 'select',
                options: [
                    { value: 'asap', label: 'ASAP' },
                    { value: '30_days', label: 'Within 30 Days' },
                    { value: 'flexible', label: 'Flexible' },
                ],
                validation: { required: 'Please choose a timeline' },
            },
            {
                name: 'askingPrice',
                label: 'Asking Price (if any)',
                type: 'number',
            },
            {
                name: 'notes',
                label: 'Tell me more about the property or your situation',
                type: 'textarea',
                multiline: true,
                rows: 4,
            },
        ],
    },
    {
        title: 'Upload Documents & Photos',
        fields: [
            {
                name: 'disclosures',
                label: 'Upload Seller Disclosures',
                type: 'file',
                accept: '.pdf,.doc,.docx',
            },
            {
                name: 'photos',
                label: 'Upload Property Photos',
                type: 'multi-file',
                accept: 'image/*',
                multiple: true,
            },
            {
                name: 'otherDocs',
                label: 'Other Supporting Documents',
                type: 'file',
                accept: '.pdf,.doc,.docx,.zip',
            },
        ],
    },
];
