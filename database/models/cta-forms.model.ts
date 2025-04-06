// models/ContactForm.ts
import mongoose, { Schema, Document, model } from "mongoose";

export type ContactFormType =
    | "consultation"
    | "employer"
    | "project"
    | "networking"
    | "tech_roadmap";

export interface IContactForm extends Document {
    type: ContactFormType;
    name: string;
    email: string;
    phone?: string;
    message?: string;
    submittedAt?: Date;

    // Employer-specific
    companyName?: string;
    roleTitle?: string;
    workType?: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
    employmentModel?: "Remote" | "On-site" | "Hybrid";
    startDate?: string;
    duration?: string;
    compensation?: string;
    benefits?: string;
    equityOrBonuses?: string;
    schedule?: string;
    website?: string;
    companyBackground?: string;
    techStack?: string[];
    projectDescription?: string;
    teamStructure?: string;
    reasonForContact?: string;
    negotiable?: boolean;
    attachedJobPDFUrl?: string;

    // Project
    projectName?: string;
    budgetRange?: string;
    timeline?: string;
    goals?: string;

    // Tech Roadmap
    currentStack?: string;
    companySize?: string;
    priorities?: string[];
}

const ContactFormSchema = new Schema<IContactForm>(
    {
        type: {
            type: String,
            enum: [
                "consultation",
                "employer",
                "project",
                "networking",
                "tech_roadmap",
            ],
            required: true,
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        message: { type: String },
        submittedAt: { type: Date, default: Date.now },

        // Employer-specific
        companyName: { type: String },
        roleTitle: { type: String },
        workType: { type: String, enum: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"] },
        employmentModel: { type: String, enum: ["Remote", "On-site", "Hybrid"] },
        startDate: { type: String },
        duration: { type: String },
        compensation: { type: String },
        benefits: { type: String },
        equityOrBonuses: { type: String },
        schedule: { type: String },
        website: { type: String },
        companyBackground: { type: String },
        techStack: [{ type: String }],
        projectDescription: { type: String },
        teamStructure: { type: String },
        reasonForContact: { type: String },
        negotiable: { type: Boolean },
        attachedJobPDFUrl: { type: String },

        // Project
        projectName: { type: String },
        budgetRange: { type: String },
        timeline: { type: String },
        goals: { type: String },

        // Tech Roadmap
        currentStack: { type: String },
        companySize: { type: String },
        priorities: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.ContactForm ||
    model<IContactForm>("ContactForm", ContactFormSchema);
