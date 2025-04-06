/* eslint-disable @typescript-eslint/no-explicit-any */


// types/forms.ts
export type ContactFormType =
    | "consultation"
    | "employer"
    | "project"
    | "networking"
    | "tech_roadmap";

export interface IBaseContactForm {
    type: ContactFormType;
    name: string;
    email: string;
    phone?: string;
    message?: string;
    submittedAt?: Date;
}

// Additional fields for employer
export interface IEmployerForm extends IBaseContactForm {
    companyName: string;
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
}


// Project-based work
export interface IProjectForm extends IBaseContactForm {
    projectName?: string;
    budgetRange?: string;
    timeline?: string;
    goals?: string;
}

// Tech roadmap
export interface ITechRoadmapForm extends IBaseContactForm {
    currentStack?: string;
    companySize?: string;
    priorities?: string[];
}

export type IContactForm =
    | IBaseContactForm
    | IEmployerForm
    | IProjectForm
    | ITechRoadmapForm



export enum FormType {
    Consultation = 0,
    Employer = 1,
    Project = 2,
    TechRoadmap = 3,
    Networking = 4,
}


export const solutionsCTAForms = {
    0: {
        title: "",
        description: "",
        additionalSections: [
            {

            },
        ]
    }
}


export interface IBaseCTAFormClient {
    name: string;
    email: string;
    phone?: string;
    message?: string;
}

// types/forms-config.types.ts

export type SolutionsCTAFormsMap = Record<number, ISolutionsCTAFormConfig>;


export interface IFormValidation {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    message?: string; // Message to show when validation fails
}

export interface IFormField {
    name: string;
    label: string;
    type: "text" | "email" | "number" | "date" | "textarea" | "select" | "tel";
    required?: boolean;
    options?: string[]; // only for select fields
    multiline?: boolean;
    rows?: number;
    validation?: IFormValidation;
}


export interface IFormSection {
    title: string;
    fields: IFormField[];
}

export interface ISolutionsCTAFormConfig {
    title: string;
    description: string;
    additionalSections: IFormSection[];
}
