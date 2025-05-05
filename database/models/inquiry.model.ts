import mongoose, { Schema, Document } from 'mongoose';

export type InquiryType = 'technology' | 'investment' | 'employment' | 'home-seller';

export interface ContactInquiryDocument extends Document {
    name: string;
    email: string;
    message: string;
    inquiryType: InquiryType;

    // Technology
    techCategory?: 'web development' | 'AI/ML' | 'software consulting' | 'other';
    projectBudget?: number;
    deadline?: string;

    // Investment
    investmentType?: 'real estate' | 'startups' | 'stocks' | 'crypto';
    investmentAmount?: number;
    riskPreference?: 'low' | 'medium' | 'high';

    // Employment
    companyName?: string;
    jobTitle?: string;
    jobType?: 'full-time' | 'part-time' | 'contract' | 'freelance';
    salaryRange?: string;

    // Home-Seller
    propertyAddress?: string;
    propertyType?: 'single-family' | 'multi-family' | 'condo' | 'land';
    askingPrice?: number;
    urgency?: 'immediate' | 'within 3 months' | 'within 6 months' | 'flexible';
}

const ContactInquirySchema: Schema = new Schema<ContactInquiryDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
        inquiryType: {
            type: String,
            required: true,
            enum: ['technology', 'investment', 'employment', 'home-seller'],
        },

        // Technology
        techCategory: {
            type: String,
            enum: ['web development', 'AI/ML', 'software consulting', 'other'],
        },
        projectBudget: Number,
        deadline: String,

        // Investment
        investmentType: {
            type: String,
            enum: ['real estate', 'startups', 'stocks', 'crypto'],
        },
        investmentAmount: Number,
        riskPreference: {
            type: String,
            enum: ['low', 'medium', 'high'],
        },

        // Employment
        companyName: String,
        jobTitle: String,
        jobType: {
            type: String,
            enum: ['full-time', 'part-time', 'contract', 'freelance'],
        },
        salaryRange: String,

        // Home-Seller
        propertyAddress: String,
        propertyType: {
            type: String,
            enum: ['single-family', 'multi-family', 'condo', 'land'],
        },
        askingPrice: Number,
        urgency: {
            type: String,
            enum: ['immediate', 'within 3 months', 'within 6 months', 'flexible'],
        },
    },
    { timestamps: true }
);

const ContactInquiry =
    mongoose.models.ContactInquiry ||
    mongoose.model<ContactInquiryDocument>('ContactInquiry', ContactInquirySchema);

export default ContactInquiry;
