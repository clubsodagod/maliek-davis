import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface IBuyer extends Document {
    fullName: string;
    email: string;
    phone: string;
    companyName?: string;
    marketAreas: string[];
    propertyTypes: string[];
    priceRange: {
        min: number;
        max: number;
    };
    preferredCloseTime: number;
    fundingSource: "cash" | "hard_money" | "private_lender" | "other";
    proofOfFundsUrl?: string; // Legacy or optional
    proofOfFundsProperty?: {
        fileUrl: string;       // Cloud storage path or CDN URL
        fileType: "image" | "pdf";
        fileName: string;
    };
    volumeGoalPerMonth?: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BuyerSchema: Schema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        companyName: { type: String },
        marketAreas: [{ type: String }],
        propertyTypes: [{ type: String }],
        priceRange: {
            min: { type: Number, required: true },
            max: { type: Number, required: true },
        },
        preferredCloseTime: { type: Number, required: true },
        fundingSource: {
            type: String,
            enum: ["cash", "hard_money", "private_lender", "other"],
            required: true,
        },
        proofOfFundsUrl: { type: String },
        proofOfFundsProperty: {
            fileUrl: { type: String },
            fileType: { type: String, enum: ["image", "pdf"] },
            fileName: { type: String },
        },
        volumeGoalPerMonth: { type: Number },
        notes: { type: String },
    },
    { timestamps: true }
);

const Buyer = mongoose.models.Buyer ||
    mongoose.model<IBuyer>("Buyer", BuyerSchema);

export default Buyer;