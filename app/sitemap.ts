import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

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
            url: 'https://maliek-davis.com/business',
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
    ];
}
