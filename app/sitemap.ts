import connectToDB from '@/database/connect-to-db.database';
import BlogPostModel from '@/database/models/blog-posts.model';
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const lastModified = new Date();

    await connectToDB();

    const blogPosts = await BlogPostModel.find({})
        .sort({ updatedAt: -1 })
        .skip(0)
        .limit(50000 - 0);

    const sitemap: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `https://maliek-davis.com/blog/posts/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.6,
    }));
    return [
        {
            url: 'https://maliek-davis.com',
            lastModified,
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://maliek-davis.com/technology',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/technology/approach',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/technology/solutions',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/business',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/business/branding',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/business/business-planning',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/business/ai-and-automation',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/business/marketing-and-growth-systems',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/business/digital-presence',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/real-estate',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/real-estate/prestige-partners',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/real-estate/prestige-partners/landing-page',
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maliek-davis.com/about',
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: 'https://maliek-davis.com/contact',
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: 'https://maliek-davis.com/sell-my-house',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://maliek-davis.com/blog',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        ...sitemap,
    ];
}
