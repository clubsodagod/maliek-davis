/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import connectToDB from "@/database/connect-to-db.database";
import AnnouncementModel, { IAnnouncement, IAnnouncementForm } from "@/database/models/announcement.model";
import BlogPostModel, { IBlogPostClient } from "@/database/models/blog-posts.model";
import CaseStudyModel, { ICaseStudyForm } from "@/database/models/case-study.model";
import CategoryModel, { ICategoryForm } from "@/database/models/category.model";

import { Resend } from "resend";
import slugify from "slugify";
import AnnouncementEmail from "@/app/emails/NewAnnouncementsEmail";
import mongoose from "mongoose";
import { ResponseStatus } from "@/context/_library/classes-types-interaces";
import SubcategoryModel, { ISubcategoryForm } from "@/database/models/subcategory.model";

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

export async function updateAnnouncement(form: IAnnouncementForm & { _id: string }) {
    try {
        await connectToDB();

        const existing = await AnnouncementModel.findById(form._id);
        if (!existing) {
            throw new Error("Announcement not found.");
        }

        // Update core fields
        existing.title = form.title;
        existing.slug = slugify(form.title.toLowerCase());
        existing.description = form.description;
        existing.image = form.image;
        existing.type = form.type;

        // Reset all optional subtype objects
        existing.speakingEngagement = undefined;
        existing.investmentOpportunity = undefined;
        existing.completedClientProject = undefined;
        existing.newSocialContent = undefined;
        existing.communityServiceEvent = undefined;
        existing.fundraising = undefined;
        existing.realEstateSyndication = undefined;
        existing.inhouseApp = undefined;

        // Apply only the active type data
        switch (form.type) {
            case "speaking_engagement":
                existing.speakingEngagement = form.speakingEngagement;
                break;
            case "investment_opportunity":
                existing.investmentOpportunity = form.investmentOpportunity;
                break;
            case "completed_client_project":
                existing.completedClientProject = form.completedClientProject;
                break;
            case "new_social_content":
                existing.newSocialContent = form.newSocialContent;
                break;
            case "community_service_event":
                existing.communityServiceEvent = form.communityServiceEvent;
                break;
            case "fundraising":
                existing.fundraising = form.fundraising;
                break;
            case "real_estate_syndication":
                existing.realEstateSyndication = form.realEstateSyndication;
                break;
            case "inhouse_app":
                existing.inhouseApp = form.inhouseApp;
                break;
        }

        await existing.save();

        return { success: true };
    } catch (error) {
        console.error("Update Announcement Error:", error);
        return { success: false, message: "Error updating announcement." };
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
        const categoryDoc = await CategoryModel.findOne({ _id: form.category });
        if (!categoryDoc) {
            return { success: false, error: true, message: 'Invalid category selected.' };
        }

        const subcategoryDocs = await CategoryModel.find({
            _id: { $in: form.subcategories }
        });

        const subcategoryIds = subcategoryDocs.map(doc => doc._id);
        console.log(form.author, 'author');

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
            author: form.author,
        });

        await newPost.save();

        return {
            success: true,
            error: false,
            message: 'Blog post submitted successfully.',
            data: newPost._id.toString(),
        };
    } catch (err: any) {
        console.error('[submitBlogPost]', err);
        return {
            success: false,
            error: true,
            message: 'Failed to submit blog post. Please try again.',
        };
    }
}

export async function getBlogPosts() {
    try {
        await connectToDB();

        const posts = await BlogPostModel.find({})
            .sort({ createdAt: -1 })
            .populate('category')
            .populate('subcategories')
            .populate('author')
            .lean();

        return posts.map((post) => ({
            _id: post._id?.toString(),
            title: post.title,
            slug: post.slug,
            metaDescription: post.metaDescription,
            featuredImg: post.featuredImg,
            content: post.content,
            category: post.category?._id?.toString?.() || post.category,
            subcategories: Array.isArray(post.subcategories)
                ? post.subcategories.map((sub) =>
                    typeof sub === 'object' && sub?._id ? sub._id.toString() : sub
                )
                : [],
            tags: post.tags || [],
            author: typeof post.author === 'object' && post.author?._id
                ? post.author._id.toString()
                : post.author,
            createdAt: post.createdAt?.toISOString?.(),
            updatedAt: post.updatedAt?.toISOString?.(),
        }));
    } catch (err) {
        console.error('[getBlogPosts] Failed to fetch blog posts:', err);
        return [];
    }
}


export async function getBlogPostBySlug(slug: string) {
    await connectToDB();
    return BlogPostModel.findOne({ slug });
}

export async function updateBlogPost(form: IBlogPostClient & { _id: string }): Promise<ResponseStatus> {
    try {
        await connectToDB();

        const existing = await BlogPostModel.findById(form._id);
        if (!existing) {
            return { success: false, error: true, message: 'Blog post not found.' };
        }

        // Validate and map category
        const categoryDoc = await CategoryModel.findById(form.category);
        if (!categoryDoc) {
            return { success: false, error: true, message: 'Invalid category selected.' };
        }

        // Validate subcategories
        const subcategoryDocs = await CategoryModel.find({
            _id: { $in: form.subcategories },
        });

        const subcategoryIds = subcategoryDocs.map(doc => doc._id);

        // Update fields
        existing.title = form.title;
        existing.slug = slugify(form.title.toLowerCase());
        existing.metaDescription = form.metaDescription;
        existing.featuredImg = form.featuredImg;
        existing.content = form.content;
        existing.category = categoryDoc._id;
        existing.subcategories = subcategoryIds;
        existing.tags = form.tags;
        existing.author = form.author;

        await existing.save();

        return {
            success: true,
            error: false,
            message: 'Blog post updated successfully.',
            data: existing._id.toString(),
        };
    } catch (err: any) {
        console.error('[updateBlogPost]', err);
        return {
            success: false,
            error: true,
            message: 'Failed to update blog post. Please try again.',
        };
    }
}

//
// CASE STUDIES
//


export async function submitCaseStudy(form: ICaseStudyForm): Promise<ResponseStatus> {
    try {
        await connectToDB();

        const newCaseStudy = new CaseStudyModel({
            ...form,
        });

        await newCaseStudy.save();

        return {
            success: true,
            error: false,
            message: 'Case study submitted successfully.',
            data: newCaseStudy._id.toString(),
        };
    } catch (err: any) {
        console.error('[submitCaseStudy]', err);
        return {
            success: false,
            error: true,
            message: 'Failed to submit case study. Please try again.',
        };
    }
}

export async function updateCaseStudy(form: ICaseStudyForm & { _id: string }): Promise<ResponseStatus> {
    try {
        await connectToDB();

        const result = await CaseStudyModel.findByIdAndUpdate(
            form._id,
            {
                ...form,
                updatedAt: new Date(),
            },
            { new: true }
        );

        if (!result) {
            return {
                success: false,
                error: true,
                message: 'Case study not found.',
            };
        }

        return {
            success: true,
            error: false,
            message: 'Case study updated successfully.',
            data: result._id.toString(),
        };
    } catch (err: any) {
        console.error('[updateCaseStudy]', err);
        return {
            success: false,
            error: true,
            message: 'Failed to update case study.',
        };
    }
}

export async function getCaseStudies() {
    try {
        await connectToDB();

        const docs = await CaseStudyModel.find({}).sort({ updatedAt: -1 }).lean();

        return docs.map((doc) => ({
            ...doc,
            _id: `${doc._id}`,
            createdAt: doc.createdAt?.toISOString?.(),
            updatedAt: doc.updatedAt?.toISOString?.(),
        }));
    } catch (err) {
        console.error('[getAllCaseStudies] Error fetching:', err);
        return [];
    }
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
    return CategoryModel.find({}).sort({ createdAt: -1 }).lean();
}
export async function getAllCategories() {
    await connectToDB();

    const categories = await CategoryModel.find({}).sort({ updatedAt: -1 }).lean();

    return categories.map((cat) => ({
        _id: cat._id.toString(),
        name: cat.name,
        slug: cat.slug,
        tagline: cat.tagline,
        description: cat.description,
        subcategories: Array.isArray(cat.subcategories)
            ? cat.subcategories.map((id) => id.toString())
            : [],
        photo: cat.photo,
        video: cat.video,
        createdAt: cat.createdAt?.toISOString?.(),
        updatedAt: cat.updatedAt?.toISOString?.(),
    }));
}


export async function submitCategory(form: ICategoryForm): Promise<ResponseStatus> {
    try {
        await connectToDB();

        // Validate and convert subcategory IDs
        const validSubcategories = await mongoose.model("Subcategory").find({
            _id: { $in: form.subcategories }
        });

        const subcategoryIds = validSubcategories.map((doc: any) => doc._id);

        // Create new category
        const newCategory = new CategoryModel({
            name: form.name,
            slug: slugify(form.name.toLowerCase()),
            tagline: form.tagline,
            description: form.description,
            subcategories: subcategoryIds,
            photo: form.photo,
            video: form.video,
            createdAt: form.createdAt || new Date(),
            updatedAt: new Date(),
        });

        await newCategory.save();

        return {
            success: true,
            error: false,
            message: "Category created successfully.",
            data: newCategory._id.toString(),
        };
    } catch (err: any) {
        console.error("[submitCategory]", err);
        return {
            success: false,
            error: true,
            message: "Failed to submit category. Please try again.",
        };
    }
}

export async function submitSubcategory(form: ISubcategoryForm): Promise<ResponseStatus> {
    try {
        await connectToDB();

        // Optional: Validate nested subcategories
        const nestedDocs = await SubcategoryModel.find({
            _id: { $in: form.subcategories }
        });

        const nestedIds = nestedDocs.map(doc => doc._id);

        // Create new subcategory
        const newSubcategory = new SubcategoryModel({
            name: form.name,
            slug: slugify(form.name.toLowerCase()),
            tagline: form.tagline,
            description: form.description,
            subcategories: nestedIds,
            photo: form.photo,
            video: form.video,
            createdAt: form.createdAt || new Date(),
            updatedAt: new Date(),
        });

        await newSubcategory.save();

        return {
            success: true,
            error: false,
            message: "Subcategory created successfully.",
            data: newSubcategory._id,
        };
    } catch (err: any) {
        console.error("[submitSubcategory]", err);
        return {
            success: false,
            error: true,
            message: "Failed to submit subcategory. Please try again.",
        };
    }
}


export async function getSubcategoryOptions() {
    await connectToDB();
    const subcategories = await SubcategoryModel.find({}).select('name _id').lean();

    return subcategories.map(sub => ({
        label: sub.name,
        value: sub._id.toString(),
    }));
}

export async function getCategoryOptions() {
    await connectToDB();
    const categories = await CategoryModel.find({}).select('name _id').lean();

    return categories.map(sub => ({
        label: sub.name,
        value: sub._id.toString(),
    }));
}



export async function updateSubcategory(data: ISubcategoryForm): Promise<{ success: boolean; message: string }> {
    try {
        await connectToDB();

        if (!data._id) {
            return { success: false, message: "Missing subcategory ID." };
        }

        await SubcategoryModel.findByIdAndUpdate(data._id, {
            ...data,
            updatedAt: new Date(),
        });

        return { success: true, message: "Subcategory updated successfully." };
    } catch (error) {
        console.error("Subcategory update error:", error);
        return { success: false, message: "Error updating subcategory." };
    }
}


export async function getAllSubcategories(): Promise<ISubcategoryForm[]> {
    try {
        await connectToDB();

        const subcategories = await SubcategoryModel.find({}).sort({ updatedAt: -1 }).lean();

        return subcategories.map((sub) => ({
            _id: sub._id,
            name: sub.name,
            slug: sub.slug,
            tagline: sub.tagline,
            description: sub.description,
            subcategories: sub.subcategories, // Optional: could be nested sub-subcategories
            photo: sub.photo,
            videoS: sub.video,
            createdAt: sub.createdAt,
            updatedAt: sub.updatedAt,
        }));
    } catch (error) {
        console.error('Failed to fetch subcategories:', error);
        return [];
    }
}



export async function updateCategory(data: ICategoryForm): Promise<{ success: boolean; message: string }> {
    try {
        await connectToDB();

        if (!data._id) return { success: false, message: "Missing category ID" };

        await CategoryModel.findByIdAndUpdate(data._id, {
            ...data,
            updatedAt: new Date(),
        });

        return { success: true, message: "Category updated successfully" };
    } catch (error) {
        console.error("Failed to update category:", error);
        return { success: false, message: "Server error" };
    }
}