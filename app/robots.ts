import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/admin/', '/emails/'],
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        disallow: ['/admin/', '/emails/'],
      },
    ],
    sitemap: [
      'https://maliek-davis.com/sitemap.xml',
      'https://maliek-davis.com/blog/posts/sitemap/0.xml',
    ],
  }
}
