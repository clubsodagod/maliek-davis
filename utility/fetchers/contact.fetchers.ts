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
        let proofOfFundsResponse = null;
        let transformedImageUrl = null;

        // Step 1: Upload Proof of Funds file if exists
        if (form.proofOfFundsFile) {
            const pof = new FormData();
            pof.append("file", form.proofOfFundsFile);
            pof.append("upload_preset", "new one");
            pof.append("folder", "prestige-partner-buyer");

            proofOfFundsResponse = await fetch(
                `http://localhost:3000/api/file-processing/image-and-pdf-to-webp`,
                {
                    method: 'POST',
                    body: pof,
                }
            ).then((res) => res.json());

            if (!proofOfFundsResponse?.url) {
                return {
                    error: true,
                    message: `Failed to upload Proof of Funds file`,
                };
            }

            
            console.log(proofOfFundsResponse.url);
            // Generate WebP preview of first page
            transformedImageUrl = proofOfFundsResponse.url;

        }


        // Step 2: Save the form
        const { proofOfFundsFile, ...formValues } = form;
        const formDataToSave = {
            ...formValues,
            proofOfFundsUrl: transformedImageUrl
        };

        await connectToDB();
        const newBuyer: IBuyer = new Buyer(formDataToSave);

        if (!newBuyer.fullName) {
            throw new Error("Name is required.");
        }

        await newBuyer.save();

        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

        await Promise.all([
            resend.emails.send({
                from: 'continuous-innovation@maliek-davis.com',
                to: [newBuyer.email],
                subject: `${newBuyer.fullName}, We'll chat soon!`,
                react: ThanksForContactingMe({ firstName: newBuyer.fullName }) as React.ReactElement,
            }),
            resend.emails.send({
                from: 'continuous-innovation@maliek-davis.com',
                to: ['continuous-innovation@maliek-davis.com', 'maliekjdavis24@gmail.com'],
                subject: `${newBuyer.fullName} just contacted you to join the buyer's list!`,
                react: PrestigePartnerBuyer({ firstName: newBuyer.fullName }) as React.ReactElement,
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
