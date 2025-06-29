/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import connectToDB from "@/database/connect-to-db.database";
import BlogPostModel, { IBlogPost } from "@/database/models/blog-posts.model";
import CategoryModel, { ICategory } from "@/database/models/category.model";

function toStr(value: any) {
    return value?.toString?.() ?? null;
}

function serializeUser(user: any): any {
    const toStr = (v: any) => v?.toString?.();

    return {
        _id: toStr(user._id),
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
        avatar: user.avatar,
        role: user.role,

        verificationToken: user.verificationToken,
        verificationTokenExpiration: toStr(user.verificationTokenExpiration),

        lastLogin: toStr(user.lastLogin),
        loginCount: user.loginCount,
        preferredCategories: Array.isArray(user.preferredCategories) ? user.preferredCategories : [],
        searchHistory: Array.isArray(user.searchHistory) ? user.searchHistory : [],
        viewedProducts: user.viewedProducts?.map(toStr),
        purchaseHistory: user.purchaseHistory?.map(toStr),
        abandonedCarts: user.abandonedCarts?.map(toStr),
        wishlist: user.wishlist?.map(toStr),
        favorites: user.favorites?.map(toStr),
        reviewsGiven: user.reviewsGiven?.map(toStr),

        communicationPreferences: {
            emailMarketing: user.communicationPreferences?.emailMarketing ?? true,
            smsMarketing: user.communicationPreferences?.smsMarketing ?? false,
            pushNotifications: user.communicationPreferences?.pushNotifications ?? true,
        },

        rewardPoints: user.rewardPoints,
        membershipTier: user.membershipTier,

        defaultShippingAddress: toStr(user.defaultShippingAddress),
        savedAddresses: user.savedAddresses?.map(toStr),
        savedPaymentMethods: user.savedPaymentMethods?.map(toStr),

        createdAt: toStr(user.createdAt),
        updatedAt: toStr(user.updatedAt),
    };
}


function serializeCategory(category: any): any {
    

    return {
        _id: toStr(category._id),
        name: category.name,
        slug: category.slug,
        tagline: category.tagline,
        description: category.description,
        subcategories: Array.isArray(category.subcategories)
            ? category.subcategories.map(toStr)
            : [],
        photo: category.photo,
        video: category.video,
        createdAt: toStr(category.createdAt),
        updatedAt: toStr(category.updatedAt),
    };
}
function safeMap(input: any, mapFn: (item: any) => any): any[] {
    return Array.isArray(input) ? input.map(mapFn) : [];
}



export async function getCategoryBySlug(categorySlug: string): Promise<ICategory | null> {
    try {
        await connectToDB();

        const category = await CategoryModel.findOne({ slug: categorySlug }).lean<ICategory>().exec();

        return category || null;
    } catch (error) {
        console.error(`getCategoryBySlug error [${categorySlug}]:`, error);
        return null;
    }
}



// Helper function to make all ObjectIds and Dates serializable



function serializeBlogPost(post: any): any {
    const serializeItem = (item: any) =>
        typeof item === "object" ? { ...item, _id: toStr(item._id) } : toStr(item);

    return {
        _id: toStr(post._id),
        title: post.title,
        slug: post.slug,
        content: post.content,
        metaDescription: post.metaDescription,
        featuredImg: post.featuredImg,
        seoKeywords: post.seoKeywords,
        tags: post.tags,
        views: post.views,
        status: post.status,
        excerpt: post.excerpt,

        author: serializeUser(post.author),
        category: serializeCategory(post.category),

        subcategories: safeMap(post.subcategories, serializeItem),
        relatedPosts: safeMap(post.relatedPosts, serializeItem),
        comments: safeMap(post.comments, serializeItem),
        favorites: safeMap(post.favorites, serializeItem),
        upVotes: safeMap(post.upVotes, serializeItem),
        downVotes: safeMap(post.downVotes, serializeItem),
        reactions: safeMap(post.reactions, serializeItem),

        reports: Array.isArray(post.reports) ? post.reports : [],

        createdAt: toStr(post.createdAt),
        updatedAt: toStr(post.updatedAt),
        expireDate: toStr(post.expireDate),
    };
}



export async function serverGetBlogPostBySlug(blogSlug: string): Promise<IBlogPost | null> {
    try {
        await connectToDB();

        const rawPost = await BlogPostModel.findOne({ slug: blogSlug })
            .populate("author")
            .populate("category")
            .populate("subcategories")
            .populate("relatedPosts")
            .populate("favorites")
            .populate("upVotes")
            .populate("downVotes")
            .lean()
            .exec();

        if (!rawPost) return null;

        return serializeBlogPost(rawPost);
    } catch (error: unknown) {
        console.error(`There was an unexpected error: ${error instanceof Error ? error.message : String(error)}`);
        return null;
    }
}



export async function paginatedServerBlogFetcher(skip: number, limit: number) {
    try {
        await connectToDB();

        const rawPosts = await BlogPostModel.find({})
            .populate("author")
            .populate("category")
            .populate("subcategories")
            .populate("relatedPosts")
            .populate("favorites")
            .populate("upVotes")
            .populate("downVotes")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();
        
            const data = rawPosts.map(serializeBlogPost)
        return data
    } catch (error: unknown) {
        return {
            error: true,
            message: `Error fetching blog posts: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}

