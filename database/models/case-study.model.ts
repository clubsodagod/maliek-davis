import mongoose, { Schema, Document } from 'mongoose';

export interface CaseStudyDocument extends Document {
    title: string;
    type: 'TechnicalApplication' | 'Property' | '';
    featuredImg: { url: string; alt: string };
    featuredVideo: { url: string; alt: string };
    photos: string[];
    logo: string;
    summary: string;
    objectives: string[];
    challenges: string[];
    solutions: string[];
    outcomes: {
        description: string;
        valueGenerated: number;
        technicalImpact: string;
    };
    address?: string;
}

const MediaSetSchema: Schema = new Schema({
    url: { type: String, required: true },
    alt: { type: String, required: true },
});

const CaseStudySchema: Schema = new Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['TechnicalApplication', 'Property', ''], required: true },
    featuredImg: { type: MediaSetSchema, required: true },
    featuredVideo: { type: MediaSetSchema, required: true },
    photos: [{ type: String, required: true }],
    logo: { type: String, required: true },
    summary: { type: String, required: true },
    objectives: [{ type: String, required: true }],
    challenges: [{ type: String, required: true }],
    solutions: [{ type: String, required: true }],
    outcomes: {
        description: { type: String, required: true },
        valueGenerated: { type: Number, required: true },
        technicalImpact: { type: String, required: true },
    },
    address: { type: String }, // Optional, shown only for Property
});

const CaseStudy = mongoose.models.CaseStudy || mongoose.model<CaseStudyDocument>('CaseStudy', CaseStudySchema);

export default CaseStudy;
