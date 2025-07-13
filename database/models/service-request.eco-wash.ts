import mongoose, { Schema, Document } from "mongoose";

export interface IServiceRequestInput {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    notes?: string;
    serviceCategory: string;
    selectedServices: string[];
    photos?: string[]; // URLs or file names if uploaded
}

export interface IServiceRequest extends Document {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    notes?: string;
    serviceCategory: string;
    selectedServices: string[];
    photos?: string[]; // URLs or filenames
    createdAt: Date;
}

const ServiceRequestSchema = new Schema<IServiceRequest>({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    notes: { type: String },
    serviceCategory: { type: String, required: true },
    selectedServices: { type: [String], required: true },
    photos: { type: [String], default: [] }, // Store URLs or filenames of uploaded images
    createdAt: { type: Date, default: Date.now },
});

const ServiceRequestModel = mongoose.models.ServiceRequest ||
    mongoose.model<IServiceRequest>("ServiceRequest", ServiceRequestSchema);

export default ServiceRequestModel
