/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import connectToDB from "@/database/connect-to-db.database";
import BlogPostModel, { IBlogPost } from "@/database/models/blog-posts.model";
import CategoryModel, { ICategory } from "@/database/models/category.model";

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
    return {
        ...post,
        _id: post._id?.toString?.(),
        author: post.author && {
            ...post.author,
            _id: post.author._id?.toString?.(),
        },
        category: post.category && {
            ...post.category,
            _id: post.category._id?.toString?.(),
        },
        subcategories: post.subcategories?.map((item: any) =>
            typeof item === "object" ? { ...item, _id: item._id?.toString?.() } : item?.toString?.()
        ),
        relatedPosts: post.relatedPosts?.map((item: any) =>
            typeof item === "object" ? { ...item, _id: item._id?.toString?.() } : item?.toString?.()
        ),
        comments: post.comments?.map((item: any) =>
            typeof item === "object" ? { ...item, _id: item._id?.toString?.() } : item?.toString?.()
        ),
        favorites: post.favorites?.map((item: any) =>
            typeof item === "object" ? { ...item, _id: item._id?.toString?.() } : item?.toString?.()
        ),
        upVotes: post.upVotes?.map((item: any) =>
            typeof item === "object" ? { ...item, _id: item._id?.toString?.() } : item?.toString?.()
        ),
        downVotes: post.downVotes?.map((item: any) =>
            typeof item === "object" ? { ...item, _id: item._id?.toString?.() } : item?.toString?.()
        ),
        reactions: post.reactions?.map((item: any) =>
            typeof item === "object" ? { ...item, _id: item._id?.toString?.() } : item?.toString?.()
        ),
        reports: post.reports ?? [],
        createdAt: post.createdAt?.toString?.(),
        updatedAt: post.updatedAt?.toString?.(),
        expireDate: post.expireDate?.toString?.(),
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
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        console.log(rawPosts);


        return rawPosts
    } catch (error: unknown) {
        return {
            error: true,
            message: `Error fetching blog posts: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}
