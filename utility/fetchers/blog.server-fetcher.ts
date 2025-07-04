/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import getConfig from 'next/config';
import connectToDB from "@/database/connect-to-db.database";
import BlogPostModel, { IBlogPost } from "@/database/models/blog-posts.model";
import CategoryModel, { ICategory } from "@/database/models/category.model";
import SubcategoryModel from "@/database/models/subcategory.model";
import UserModel from "@/database/models/user.model";

function toStr(value: any) {
    return value?.toString?.() ?? null;
}

export async function serializeUser(user: any): Promise<any> {
    const toStr = (v: any) => v?.toString?.();
    const serializeObjectId = (id: any) => {
        if (!id || typeof id !== 'object' || !id.id) return undefined;
        return Array.from(id.id as Uint8Array)
            .map((byte: number) => byte.toString(16).padStart(2, '0'))
            .join('');
    };
    return {
        _id: serializeObjectId(user._id),
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

function serializeUserNoEx(user: any): any {
    const toStr = (v: any) => v?.toString?.();
    const serializeObjectId = (id: any) => {
        if (!id || typeof id !== 'object' || !id.id) return undefined;
        return Array.from(id.id as Uint8Array)
            .map((byte: number) => byte.toString(16).padStart(2, '0'))
            .join('');
    };
    return {
        _id: serializeObjectId(user._id),
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

        author: serializeUserNoEx(post.author),
        category: serializeCategory(post.category),

        subcategories: safeMap(post.subcategories, serializeCategory),
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
        console.log(blogSlug);
        await SubcategoryModel.find({})
        await UserModel.find({})
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

        console.log(rawPost);


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
        await UserModel.find()
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
export async function serverBlogFetcher() {
    try {
        await connectToDB();
        await UserModel.find()
        const rawPosts = await BlogPostModel.find({})
            .populate("author")
            .populate("category")
            .populate("subcategories")
            .populate("relatedPosts")
            .populate("favorites")
            .populate("upVotes")
            .populate("downVotes")
            .sort({ createdAt: -1 });
        console.log(rawPosts);

        return rawPosts.map(serializeBlogPost)
    } catch (error: unknown) {
        return {
            error: true,
            message: `Error fetching blog posts: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}

export async function serverAPIBlogFetcher() {
    try {
        await connectToDB();
        await UserModel.find()
        const rawPosts = await BlogPostModel.find({})
            // .sort({ createdAt: -1 })
            .populate("author")
            .populate("category")
            .populate("subcategories")
            .populate("relatedPosts")
            .populate("favorites")
            .populate("upVotes")
            .populate("downVotes");
        console.log(rawPosts);

        return rawPosts.map(serializeBlogPost)
    } catch (error: unknown) {
        return {
            error: true,
            message: `Error fetching blog posts: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}


export async function clientBlogFetcher() {
    try {
        const { publicRuntimeConfig } = getConfig();
        const isProd = publicRuntimeConfig.PRODUCTION;
        const baseUrl = isProd
            ? publicRuntimeConfig.DOMAIN_PRODUCTION
            : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

        const res = await fetch(`https://maliek-davis.com/api/content/blog/get-all-posts`, {
            method: 'GET',
            next: { revalidate: 60 }, // ISR
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch blog posts: ${res.statusText}`);
        }

        const data = await res.json();

        if (!data || data.length === 0) {
            return {
                error: true,
                message: 'No blog posts found',
            };
        }

        if (data.error) {
            return {
                error: true,
                message: data.message || 'An error occurred while fetching blog posts',
            };
        }

        return data.posts.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


    } catch (error: unknown) {
        return {
            error: true,
            message: `Error fetching blog posts: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}


