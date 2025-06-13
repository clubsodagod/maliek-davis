/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import connectToDB from "@/database/connect-to-db.database";
import AnnouncementModel, { IAnnouncement, IAnnouncementForm } from "@/database/models/announcement.model";
import BlogPostModel, { IBlogPostClient } from "@/database/models/blog-posts.model";
import CaseStudyModel from "@/database/models/case-study.model";
import CategoryModel from "@/database/models/category.model";

import { Resend } from "resend";
import slugify from "slugify";
import AnnouncementEmail from "@/app/emails/NewAnnouncementsEmail";
import mongoose from "mongoose";
import { ResponseStatus } from "@/context/_library/classes-types-interaces";

//
// ANNOUNCEMENTS
//
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

        await resend.emails.send({
            from: 'assistant@maliek-davis.com',
            to: 'self@maliek-davis.com',
            subject: newAnnouncement.title,
            react: AnnouncementEmail({
                title: newAnnouncement.title,
                description: newAnnouncement.description,
                image: newAnnouncement.image,
                type: newAnnouncement.type,
                investmentOpportunity: newAnnouncement.investmentOpportunity,
                completedClientProject: newAnnouncement.completedClientProject,
                newSocialContent: newAnnouncement.newSocialContent
            }) as React.ReactElement,
        });

        return { error: false, message: "Announcement submitted and shared!" };
    } catch (error) {
        console.error("Submit Announcement Error:", error);
        return { error: true, message: "Error submitting announcement." };
    }
}


export async function getAnnouncements() {
    await connectToDB();

    const rawAnnouncements = await AnnouncementModel.find({})
        .sort({ createdAt: -1 })
        .lean();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const announcements: IAnnouncement[] = rawAnnouncements.map((doc: any) => ({
        ...doc,
        _id: doc._id.toString(),
        createdAt: doc.createdAt.toISOString(),
        updatedAt: doc.updatedAt.toISOString(),

        // If you store any nested ObjectIds (e.g. in `investmentOpportunity`), convert them too.
    }));

    return announcements;
}

//
// BLOG POSTS
//



export async function submitBlogPost(form: IBlogPostClient): Promise<ResponseStatus> {
    try {
        await connectToDB();

        // Validate and convert category and subcategories to ObjectId
        const categoryDoc = await CategoryModel.findOne({ slug: form.category });
        if (!categoryDoc) {
            return { error: true, message: 'Invalid category selected.' };
        }

        const subcategoryDocs = await CategoryModel.find({
            _id: { $in: form.subcategories }
        });

        const subcategoryIds = subcategoryDocs.map(doc => doc._id);

        // Create blog post
        const newPost = new BlogPostModel({
            title: form.title,
            slug: slugify(form.title.toLowerCase()),
            metaDescription: form.metaDescription,
            featuredImg: form.featuredImg,
            content: form.content,
            category: categoryDoc._id,
            subcategories: subcategoryIds,
            tags: form.tags,
            author: new mongoose.Types.ObjectId(form.author),
        });

        await newPost.save();

        return {
            error: false,
            message: 'Blog post submitted successfully.',
            data: newPost._id.toString(),
        };
    } catch (err: any) {
        console.error('[submitBlogPost]', err);
        return {
            error: true,
            message: 'Failed to submit blog post. Please try again.',
        };
    }
}

export async function getBlogPosts() {
    await connectToDB();
    return BlogPostModel.find({}).sort({ createdAt: -1 });
}

export async function getBlogPostBySlug(slug: string) {
    await connectToDB();
    return BlogPostModel.findOne({ slug });
}

//
// CASE STUDIES
//
export async function getCaseStudies() {
    await connectToDB();
    return CaseStudyModel.find({}).sort({ createdAt: -1 });
}

export async function getCaseStudyBySlug(slug: string) {
    await connectToDB();
    return CaseStudyModel.findOne({ slug });
}

//
// CATEGORIES
//
export async function getCategories() {
    await connectToDB();
    return CategoryModel.find({});
}
