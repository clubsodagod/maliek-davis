import mongoose, { Schema, Document } from 'mongoose';

export interface IMotivatedSeller extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    contactMethod: 'phone' | 'text' | 'email';

    address: string;
    city: string;
    state: string;
    zip: string;

    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    condition: string;
    occupancy: string;
    timeline: string;
    askingPrice?: number;
    notes?: string;

    disclosures?: string;     // File path or URL
    photos?: string[];        // Array of file paths or URLs
    otherDocs?: string;       // File path or URL

    createdAt: Date;
    updatedAt: Date;
}

const MotivatedSellerSchema = new Schema<IMotivatedSeller>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        contactMethod: {
            type: String,
            enum: ['phone', 'text', 'email'],
            required: true,
        },

        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },

        propertyType: { type: String, required: true },
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        condition: { type: String, required: true },
        occupancy: { type: String, required: true },
        timeline: { type: String, required: true },
        askingPrice: { type: Number },
        notes: { type: String },

        disclosures: { type: String },
        photos: [{ type: String }],
        otherDocs: { type: String },
    },
    { timestamps: true }
);

const MotivatedSellerModel = mongoose.models.MotivatedSeller ||
    mongoose.model<IMotivatedSeller>('MotivatedSeller', MotivatedSellerSchema);

export default MotivatedSellerModel;