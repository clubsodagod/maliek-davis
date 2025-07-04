// /app/blog/posts/sitemap/[id]/route.ts

import connectToDB from '@/database/connect-to-db.database';
import BlogPostModel from '@/database/models/blog-posts.model';
import { type NextRequest } from 'next/server';
import { type MetadataRoute } from 'next';

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
): Promise<Response> {
    const { id } = await context.params;
    const page = parseInt(id);

    const start = page * 50000;
    const end = start + 50000;

    await connectToDB();

    const blogPosts = await BlogPostModel.find({})
        .sort({ updatedAt: -1 })
        .skip(start)
        .limit(end - start);

    const sitemap: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `https://maliek-davis.com/blog/posts/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return Response.json(sitemap);
}

