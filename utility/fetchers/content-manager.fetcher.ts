'use server'

import AnnouncementEmail from "@/app/emails/NewAnnouncementsEmail";
import connectToDB from "@/database/connect-to-db.database";
import AnnouncementModel, { IAnnouncementForm } from "@/database/models/announcement.model";
import { Resend } from "resend";
import slugify from "slugify";




export async function submitAnnouncement(form: IAnnouncementForm) {
    try {
        await connectToDB();

        const newAnnouncement = new AnnouncementModel(form);
        newAnnouncement.slug = slugify(form.title.toLowerCase());

        if (!newAnnouncement.title || !newAnnouncement.description) {
            throw new Error("Missing required fields: title or description.");
        }

        await newAnnouncement.save();

        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

        await Promise.all([
            // Email to subscribers or target audience
            resend.emails.send({
                from: 'assistant@maliek-davis.com',
                to: 'self@maliek-davis.com', // Optional fallback
                subject: newAnnouncement.title,
                react: AnnouncementEmail({
                    title:newAnnouncement.title,
                    description:newAnnouncement.description,
                    image:newAnnouncement.image,
                    type:newAnnouncement.type,
                    investmentOpportunity:newAnnouncement.investmentOpportunity,
                    completedClientProject:newAnnouncement.completedClientProject,
                    newSocialContent:newAnnouncement.newSocialContent
                }) as React.ReactElement,
            }),


        ]);

        return {
            error: false,
            message: "Your announcement has been submitted and shared!"
        };
    } catch (error) {
        console.error("Submit Announcement Error:", error);
        return {
            error: true,
            message: "There was an error submitting the announcement. Please try again later."
        };
    }
}
