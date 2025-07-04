import { IBlogPost } from "@/database/models/blog-posts.model";
import { serverGetBlogPostBySlug } from "@/utility/fetchers/blog.server-fetcher";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route to fetch a single blog post by slug.
 *
 * @param {string} slug - The blog post slug.
 * @returns {NextResponse} JSON response with status and post or error message.
 */
export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        if (req.method !== "GET") {
            return new Response(
                JSON.stringify({ message: "Method Not Allowed" }),
                { status: 405 }
            );
        }

        const post = (await serverGetBlogPostBySlug(params.slug)) as unknown as IBlogPost;
        console.log(post);
        
        if (!post) {
            return new Response(JSON.stringify({ message: "Post not found" }), {
                status: 404,
            });
        }

        return NextResponse.json({ status: 200, post });
    } catch (error) {
        console.error("[Get Post By Slug Error]", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
