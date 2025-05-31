// models/ContactForm.ts
import mongoose, { Schema, Document, model } from "mongoose";

export type BusinessLeadCaptureType =
    | "business_planning"
    | "ai_automation"
    | "marketing_growth"
    | "digital_presence"
    | "branding";

export interface IBusinessLeadCaptureFormClient {
    type: BusinessLeadCaptureType;
    name: string;
    email: string;
    phone?: string;
    message?: string;
    submittedAt?: Date;

    // Shared business-specific fields
    businessName?: string;
    website?: string;
    industry?: string;

    // Business Planning
    businessStage?: "Idea" | "Startup" | "Growth" | "Established";
    fundingStatus?: "Bootstrapped" | "Seeking Funding" | "Funded";
    businessGoals?: string;

    // AI & Automation
    currentTools?: string;
    workflowPainPoints?: string;
    automationGoals?: string;

    // Marketing & Growth
    targetAudience?: string;
    marketingChannels?: string[];
    monthlyMarketingBudget?: string;
    growthGoals?: string;

    // Digital Presence
    existingPlatforms?: string[];
    desiredFeatures?: string;
    contentNeeds?: string;
    seoGoals?: string;

    // Branding
    brandingGoals?: string;
    brandChallenges?: string;
    brandBudget?: string;
    currentBrandAssets?: string;
    desiredTimeline?: string;
}

export interface IBusinessLeadCaptureForm extends Document, IBusinessLeadCaptureFormClient {}

const BusinessLeadCaptureFormSchema = new Schema<IBusinessLeadCaptureForm>(
    {
        type: {
            type: String,
            enum: [
                "business_planning",
                "ai_automation",
                "marketing_growth",
                "digital_presence",
                "branding",
            ],
            required: true,
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        message: { type: String },
        submittedAt: { type: Date, default: Date.now },

        // Shared fields
        businessName: { type: String },
        website: { type: String },
        industry: { type: String },

        // Business Planning
        businessStage: { type: String, enum: ["Idea", "Startup", "Growth", "Established"] },
        fundingStatus: { type: String, enum: ["Bootstrapped", "Seeking Funding", "Funded"] },
        businessGoals: { type: String },

        // AI & Automation
        currentTools: { type: String },
        workflowPainPoints: { type: String },
        automationGoals: { type: String },

        // Marketing & Growth
        targetAudience: { type: String },
        marketingChannels: [{ type: String }],
        monthlyMarketingBudget: { type: String },
        growthGoals: { type: String },

        // Digital Presence
        existingPlatforms: [{ type: String }],
        desiredFeatures: { type: String },
        contentNeeds: { type: String },
        seoGoals: { type: String },

        // Branding
        brandingGoals: { type: String },
        brandChallenges: { type: String },
        brandBudget: { type: String },
        currentBrandAssets: { type: String },
        desiredTimeline: { type: String },
    },
    {
        timestamps: true,
    }
);

const BusinessLeadCaptureForm = mongoose.models.BusinessLeadCaptureForm || model<IBusinessLeadCaptureForm>("BusinessLeadCaptureForm", BusinessLeadCaptureFormSchema);

export default BusinessLeadCaptureForm;
