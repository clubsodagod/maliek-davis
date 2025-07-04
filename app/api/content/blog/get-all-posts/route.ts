/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverAPIBlogFetcher } from "@/utility/fetchers/blog.server-fetcher";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route to fetch all blog posts.
 * 
 * @returns {NextResponse} JSON response with status and posts or error message.
 */

export async function GET(req: NextRequest) {
    try {
        if (req.method !== 'GET') {
            return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
        }
        const posts = await serverAPIBlogFetcher() as any[];

        if (!posts || posts.length === 0) {
            return new Response(JSON.stringify({ message: 'No posts found' }), { status: 404 });
        }
        return NextResponse.json({ status: 200, posts });
    } catch (error) {
        console.error('[Get All Posts Error]', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
        
    }
}