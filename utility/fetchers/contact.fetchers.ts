/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"
import { ContactInquiry as ContactInquiryType } from "@/components/contact-forms/GeneralDynamicContactForm";
import connectToDB from "@/database/connect-to-db.database";
import ContactForm, { IContactFormClient } from "@/database/models/cta-forms.model";
import ContactInquiry from "@/database/models/inquiry.model";
import Buyer, { IBuyer } from "@/database/models/prestige-partner-buyer.model";
import { UploadResponse, uploadToCloudinary } from "../image-optimizer.cloudinary";
import ThanksForContactingMe from "@/app/emails/ThanksForContactingMe";
import PrestigePartnerBuyer from "@/app/emails/PrestigePartnerBuyer";
import { Resend } from "resend";
import dotenv from 'dotenv';
import { getBaseApiUrl } from "../get-base-api-url";
import { appConfig } from "@/config/app.config";
import { FileProcessingService } from "@/library/classes/services/file-processing.service";
import ContactDetails from "@/app/emails/ContactDetails";
import BusinessLeadCaptureForm, { IBusinessLeadCaptureFormClient } from "@/database/models/business-cta-forms.model";
import AdminNotificationEmail from "@/app/emails/AdminBusinessLeadNotifiation";
import ClientConfirmationEmail from "@/app/emails/BusinessLeads";
import SellerLeadConfirmation from "@/app/emails/SellerLeadConfirmation";
import MotivatedSellerModel from "@/database/models/property-lead.model";
import MotivatedSellerNotificationEmail from "@/app/emails/MotivatedSellerNotification";

// load env file
dotenv.config()


export async function submitCTAForm(form: IContactFormClient) {
    try {
        await connectToDB();

        const newForm = new ContactForm(form);


        if (newForm.name !== "") {
            newForm.save();
            return { error: false, message: "Contact form sent. I'll be in touch soon, looking forward to connecting with you!" }
        } else {
            throw new Error("There was an erro submitting your contact form please try again.")
        }

    } catch (error) {
        return { error: true, message: `Error: ${error}` }
    }
}

export async function submitInquiryForm(form: ContactInquiryType) {
    try {
        await connectToDB();

        const newForm = new ContactInquiry(form);


        if (newForm.name !== "") {
            newForm.save();
            return { error: false, message: "Contact form sent. I'll be in touch soon, looking forward to connecting with you!" }
        } else {
            throw new Error("There was an error submitting your contact form please try again.")
        }

    } catch (error) {
        return { error: true, message: `Error: ${error}` }
    }
}

export async function submitBusinessLeadForm(form: IBusinessLeadCaptureFormClient) {
    try {
        await connectToDB();

        const newForm = new BusinessLeadCaptureForm(form);

        if (!newForm.name || !newForm.email) {
            throw new Error("Missing required fields: name or email.");
        }

        await newForm.save();

        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

        await Promise.all([
            // Email to client/inquirer
            resend.emails.send({
                from: 'self@maliek-davis.com',
                to: [newForm.email],
                subject: `Thanks for reaching out, ${newForm.name.split(" ")[0]}!`,
                react: ClientConfirmationEmail({ name: newForm.name }) as React.ReactElement,
            }),

            // Email to you with full form details
            resend.emails.send({
                from: 'self@maliek-davis.com',
                to: ['continuous-innovation@maliek-davis.com', 'maliekjdavis24@gmail.com'],
                subject: `${newForm.name} submitted a business inquiry (${newForm.type})`,
                react: AdminNotificationEmail({ data: newForm }) as React.ReactElement,
            })
        ]);

        return {
            error: false,
            message: "Your message has been received. I’ll be in touch shortly!"
        };
    } catch (error) {
        console.error("Submit Business Lead Error:", error);
        return {
            error: true,
            message: `There was an error submitting the form. Please try again later.`
        };
    }
}

export async function submitPrestigePartnerBuyer(form: {
    fullName: string,
    email: string,
    phone: string,
    companyName: string,
    marketAreas: string[],
    propertyTypes: string[],
    priceRange: { min: number, max: number },
    preferredCloseTime: string,
    fundingSource: string,
    volumeGoalPerMonth: number,
    notes: string,
    proofOfFundsFile: File | null,
}) {
    try {
        let transformedImageUrl: string | null = null;

        // Step 1: Process Proof of Funds file if exists
        if (form.proofOfFundsFile) {
            const file = form.proofOfFundsFile;

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const mimeType = file.type;
            const originalFilename = file.name;

            const processor = new FileProcessingService();
            const result = await processor.handle(buffer, mimeType, originalFilename);

            if (!result?.url) {
                return {
                    error: true,
                    message: `Failed to process Proof of Funds file.`,
                };
            }

            transformedImageUrl = result.url;
        }

        // Step 2: Save the form data to DB
        const { proofOfFundsFile, ...formValues } = form;
        const formDataToSave = {
            ...formValues,
            proofOfFundsUrl: transformedImageUrl,
        };

        await connectToDB();
        const newBuyer: IBuyer = new Buyer(formDataToSave);

        if (!newBuyer.fullName) {
            throw new Error("Name is required.");
        }

        await newBuyer.save();

        // Step 3: Send emails
        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

        await Promise.all([
            resend.emails.send({
                from: 'self@maliek-davis.com',
                to: [newBuyer.email],
                subject: `${newBuyer.fullName}, We'll chat soon!`,
                react: PrestigePartnerBuyer({ firstName: newBuyer.fullName }) as React.ReactElement,
            }),
            resend.emails.send({
                from: 'self@maliek-davis.com',
                to: ['continuous-innovation@maliek-davis.com', 'maliekjdavis24@gmail.com'],
                subject: `${newBuyer.fullName} just contacted you to join the buyer's list!`,
                react: ContactDetails({ form: newBuyer }) as React.ReactElement,
            })
        ]);

        return {
            error: false,
            message: `Contact form sent. I'll be in touch soon, looking forward to connecting with you!`,
        };
    } catch (error: unknown) {
        console.error('[Form Submission Error]', error);
        return {
            error: true,
            message: `Error submitting form: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}

export interface MotivatedSellerFormInput {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    contactMethod: string;
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
    disclosures?: File | null;
    photos?: File[] | null;
    otherDocs?: File | null;
}

export async function submitMotivatedSeller(form: MotivatedSellerFormInput) {
    try {
        await connectToDB();

        const processor = new FileProcessingService();

        // Step 1: Process file uploads
        const fileUrls: {
            disclosures?: string;
            otherDocs?: string;
            photos?: string[];
        } = {};

        if (form.disclosures) {
            const buffer = Buffer.from(await form.disclosures.arrayBuffer());
            const result = await processor.handle(buffer, form.disclosures.type, form.disclosures.name);
            if (result?.url) fileUrls.disclosures = result.url;
        }

        if (form.otherDocs) {
            const buffer = Buffer.from(await form.otherDocs.arrayBuffer());
            const result = await processor.handle(buffer, form.otherDocs.type, form.otherDocs.name);
            if (result?.url) fileUrls.otherDocs = result.url;
        }

        if (form.photos && form.photos.length > 0) {
            fileUrls.photos = [];
            for (const photo of form.photos) {
                const buffer = Buffer.from(await photo.arrayBuffer());
                const result = await processor.handle(buffer, photo.type, photo.name);
                if (result?.url) fileUrls.photos.push(result.url);
            }
        }

        // Step 2: Save to DB
        const { disclosures, otherDocs, photos, ...formValues } = form;

        const newLead = new MotivatedSellerModel({
            ...formValues,
            ...fileUrls,
        });

        await newLead.save();

        // Step 3: Send Emails
        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

        await Promise.all([
            resend.emails.send({
                from: "self@maliek-davis.com",
                to: [newLead.email],
                subject: "We Received Your Property Submission",
                react: SellerLeadConfirmation({ firstName: newLead.firstName }) as React.ReactElement,
            }),
            resend.emails.send({
                from: "self@maliek-davis.com",
                to: ["continuous-innovation@maliek-davis.com", "maliekjdavis24@gmail.com"],
                subject: `New Seller Lead: ${newLead.firstName} ${newLead.lastName}`,
                react: MotivatedSellerNotificationEmail({ form: newLead }) as React.ReactElement,
            }),
        ]);

        return {
            error: false,
            message: "Form submitted successfully. We’ll reach out shortly.",
        };
    } catch (error: unknown) {
        console.error("[Motivated Seller Submission Error]", error);
        return {
            error: true,
            message: `Error submitting form: ${error instanceof Error ? error.message : String(error)
                }`,
        };
    }
}