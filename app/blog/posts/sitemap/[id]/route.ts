import connectToDB from '@/database/connect-to-db.database';
import BlogPostModel from '@/database/models/blog-posts.model';
import { type MetadataRoute } from 'next';
import { type NextRequest } from 'next/server';
// Define Params type locally since it's not exported by Next.js
type Params = { [key: string]: string };

export async function GET(
    _req: NextRequest,
    { params }: { params: Params }
): Promise<Response> {
    const page = parseInt(params.id);

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
