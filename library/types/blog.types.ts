


export type IBlogPostClient = {
    id: string;
    title: string;
    slug: string;
    featuredImg: string;
    content: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    category: {
        id: string;
        name: string;
        slug: string;
    };
    createdAt: string; // ISO string format
    updatedAt: string; // ISO string format

    // SEO Metadata
    meta: {
        description: string;
        keywords: string[];
        og: {
            title: string;
            description: string;
            image: string;
        };
        twitter: {
            title: string;
            description: string;
            image: string;
        };
    };

    // Content prioritization
    expireDate?: string;
    featured: boolean;

    // Miscellaneous
    readingTime: string;
    language: string;
    commentsCount: number;

    // Publishing status
    status: 'draft' | 'published' | 'archived';
}

export interface NormalizedCategory {
    id: string; // use string instead of ObjectId for client-side handling
    name: string;
    slug: string;
    tagline: string;
    description: string;
    subcategoryIds: string[]; // normalized reference to subcategories
    photo: string;
    video?: string;
    createdAt: Date; // ISO string for serialization
    updatedAt: Date;
}
