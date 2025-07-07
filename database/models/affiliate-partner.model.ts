import mongoose, { Schema, model, models } from "mongoose";
import { ICategory } from "./category.model";

export interface IAffiliatePartner {
    _id?: mongoose.Types.ObjectId;

    name: string;
    slug: string;
    companyName?: string;
    description: string;
    tagline?: string;
    websiteUrl?: string;
    logoUrl?: string;
    bannerUrl?: string;

    email?: string;
    contactName?: string;

    categories: ICategory[];
    active: boolean;

    performanceMetrics?: {
        clicks: number;
        signups: number;
        conversions: number;
        conversionRate?: number;
        revenueGenerated?: number;
        lastClickAt?: Date;
        lastConversionAt?: Date;
    };

    customLinks?: {
        label: string;
        url: string;
    }[];

    affiliateCode?: string;
    integrationType?: "api" | "manual" | "cj" | "shareasale" | "custom";

    notes?: string;

    createdAt: Date;
    updatedAt: Date;
}

const PerformanceMetricsSchema = new Schema(
    {
        clicks: { type: Number, default: 0 },
        signups: { type: Number, default: 0 },
        conversions: { type: Number, default: 0 },
        conversionRate: { type: Number },
        revenueGenerated: { type: Number },
        lastClickAt: { type: Date },
        lastConversionAt: { type: Date },
    },
    { _id: false }
);

const CustomLinkSchema = new Schema(
    {
        label: { type: String, required: true },
        url: { type: String, required: true },
    },
    { _id: false }
);

const AffiliatePartnerSchema = new Schema<IAffiliatePartner>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        companyName: String,
        description: { type: String, required: true },
        tagline: String,
        websiteUrl: String,
        logoUrl: String,

        email: String,
        contactName: String,

        categories: [{ type: Schema.Types.ObjectId, ref: "Category", default: [] }],
        active: { type: Boolean, default: true },

        performanceMetrics: { type: PerformanceMetricsSchema },
        customLinks: [CustomLinkSchema],

        affiliateCode: String,
        integrationType: {
            type: String,
            enum: ["api", "manual", "cj", "shareasale", "custom"],
        },

        notes: String,
    },
    { timestamps: true }
);


export interface IAffiliatePartnerForm {
    name: string;
    companyName?: string;
    description: string;
    tagline?: string;
    websiteUrl?: string;
    logoUrl?: string;

    email?: string;
    contactName?: string;

    categories: string[]; // Use ObjectId strings for selected categories

    active: boolean;

    customLinks?: {
        label: string;
        url: string;
    }[];

    affiliateCode?: string;
    integrationType?: "api" | "manual" | "cj" | "shareasale" | "custom";

    notes?: string;

}


export const AffiliatePartnerModel =
    models.AffiliatePartner || model<IAffiliatePartner>("AffiliatePartner", AffiliatePartnerSchema);
