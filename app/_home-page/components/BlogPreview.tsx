"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import BlogPreviewWrapper from '@/components/wrappers/BlogPreviewWrapper';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React from 'react'
import BlogPreviewCard from './BlogPreviewCard';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { IBlogPostClient, NormalizedCategory } from '@/library/types/blog.types';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlogRelatedPostCard from './BlogRelatedPostCard';
import BlogCategoryCard from './BlogCategoryCard';

export const mockBlogPosts: IBlogPostClient[] = [
    {
        id: "1",
        title: "The Future of AI in Real Estate",
        slug: "future-of-ai-in-real-estate",
        featuredImg: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1738511708/DALL_E_2025-02-02_10.52.02_-_A_majestic_digital_phoenix_rising_from_a_sea_of_glowing_binary_code_symbolizing_transformation_and_adaptation._The_phoenix_is_composed_of_neon-like_e_dm7sfx.webp",
        content: "Artificial Intelligence is transforming the real estate industry by improving valuations, optimizing property management, and enhancing customer experience...",
        author: {
            id: "101",
            name: "John Doe",
            avatar: "/avatars/john-doe.jpg"
        },
        category: {
            id: "201",
            name: "Technology",
            slug: "technology"
        },
        createdAt: "2025-03-18T10:00:00.000Z",
        updatedAt: "2025-03-18T12:00:00.000Z",
        meta: {
            description: "Explore how AI is reshaping real estate through automation and data-driven insights.",
            keywords: ["AI", "Real Estate", "PropTech"],
            og: {
                title: "The Future of AI in Real Estate",
                description: "Discover how artificial intelligence is revolutionizing the real estate industry.",
                image: "/images/ai-real-estate.jpg"
            },
            twitter: {
                title: "The Future of AI in Real Estate",
                description: "Learn how AI-driven innovations are reshaping property investment and management.",
                image: "/images/ai-real-estate.jpg"
            }
        },
        expireDate: "2026-03-18T00:00:00.000Z",
        featured: true,
        readingTime: "7 min",
        language: "en",
        commentsCount: 12,
        status: "published"
    },
    {
        id: "2",
        title: "Top 10 Investment Strategies for 2025",
        slug: "top-10-investment-strategies-2025",
        featuredImg: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1695513673/cld-sample-5.jpg",
        content: "As the market evolves, investors need to adapt. Here are the top 10 strategies to maximize returns in 2025...",
        author: {
            id: "102",
            name: "Sarah Smith",
            avatar: "/avatars/sarah-smith.jpg"
        },
        category: {
            id: "202",
            name: "Finance",
            slug: "finance"
        },
        createdAt: "2025-03-10T09:30:00.000Z",
        updatedAt: "2025-03-15T14:00:00.000Z",
        meta: {
            description: "Maximize your investments with these top strategies for 2025.",
            keywords: ["Investing", "Finance", "Wealth Building"],
            og: {
                title: "Top 10 Investment Strategies for 2025",
                description: "A deep dive into the best investment techniques for the coming year.",
                image: "/images/investment-strategies.jpg"
            },
            twitter: {
                title: "Best Investment Strategies for 2025",
                description: "Stay ahead in finance with these investment strategies.",
                image: "/images/investment-strategies.jpg"
            }
        },
        expireDate: "2026-03-10T00:00:00.000Z",
        featured: true,
        readingTime: "6 min",
        language: "en",
        commentsCount: 8,
        status: "published"
    },
    {
        id: "3",
        title: "Web3 and Its Impact on Digital Assets",
        slug: "web3-impact-digital-assets",
        featuredImg: "/images/web3-digital-assets.jpg",
        content: "Web3 is creating a decentralized internet that is changing the way digital assets are owned and traded...",
        author: {
            id: "103",
            name: "Alex Johnson",
            avatar: "/avatars/alex-johnson.jpg"
        },
        category: {
            id: "203",
            name: "Blockchain",
            slug: "blockchain"
        },
        createdAt: "2025-02-25T13:00:00.000Z",
        updatedAt: "2025-02-28T16:00:00.000Z",
        meta: {
            description: "Understanding the role of Web3 in reshaping digital ownership and transactions.",
            keywords: ["Web3", "Blockchain", "NFT"],
            og: {
                title: "Web3 and Its Impact on Digital Assets",
                description: "Explore how Web3 is changing digital ownership and finance.",
                image: "/images/web3-digital-assets.jpg"
            },
            twitter: {
                title: "The Rise of Web3 in Digital Asset Management",
                description: "Learn about the future of decentralized internet and asset ownership.",
                image: "/images/web3-digital-assets.jpg"
            }
        },
        expireDate: "2026-02-25T00:00:00.000Z",
        featured: false,
        readingTime: "8 min",
        language: "en",
        commentsCount: 5,
        status: "published"
    },
    {
        id: "4",
        title: "How to Build Scalable Web Applications",
        slug: "build-scalable-web-apps",
        featuredImg: "/images/scalable-web-apps.jpg",
        content: "Scalability is a key factor in web development. Learn the best practices for building scalable applications...",
        author: {
            id: "104",
            name: "Emily Brown",
            avatar: "/avatars/emily-brown.jpg"
        },
        category: {
            id: "204",
            name: "Software Development",
            slug: "software-development"
        },
        createdAt: "2025-03-05T11:20:00.000Z",
        updatedAt: "2025-03-07T18:30:00.000Z",
        meta: {
            description: "Best practices for building high-performance and scalable web applications.",
            keywords: ["Web Development", "Scalability", "Software Engineering"],
            og: {
                title: "How to Build Scalable Web Applications",
                description: "A guide to designing scalable software architectures.",
                image: "/images/scalable-web-apps.jpg"
            },
            twitter: {
                title: "Scalability in Web Development",
                description: "Learn how to design and develop scalable web applications.",
                image: "/images/scalable-web-apps.jpg"
            }
        },
        expireDate: "2026-03-05T00:00:00.000Z",
        featured: false,
        readingTime: "9 min",
        language: "en",
        commentsCount: 15,
        status: "published"
    },
    {
        id: "5",
        title: "The Psychology of High-Performing Entrepreneurs",
        slug: "psychology-high-performing-entrepreneurs",
        featuredImg: "/images/entrepreneur-psychology.jpg",
        content: "Success in business often comes down to mindset. Learn the key psychological traits of high-performing entrepreneurs...",
        author: {
            id: "105",
            name: "Michael Carter",
            avatar: "/avatars/michael-carter.jpg"
        },
        category: {
            id: "205",
            name: "Entrepreneurship",
            slug: "entrepreneurship"
        },
        createdAt: "2025-01-20T14:45:00.000Z",
        updatedAt: "2025-01-22T10:15:00.000Z",
        meta: {
            description: "Explore the mindset and habits that drive successful entrepreneurs.",
            keywords: ["Entrepreneurship", "Mindset", "Success"],
            og: {
                title: "The Psychology of High-Performing Entrepreneurs",
                description: "Understanding the mental strategies of top business leaders.",
                image: "/images/entrepreneur-psychology.jpg"
            },
            twitter: {
                title: "Entrepreneurial Mindset and Success",
                description: "Discover the psychological traits of highly successful entrepreneurs.",
                image: "/images/entrepreneur-psychology.jpg"
            }
        },
        expireDate: "2026-01-20T00:00:00.000Z",
        featured: true,
        readingTime: "10 min",
        language: "en",
        commentsCount: 20,
        status: "published"
    }
];


const now = new Date();

export const mockCategories: NormalizedCategory[] = [
    {
        id: "10000",
        name: 'Property Tech',
        slug: 'property_tech',
        tagline: 'Revolutionizing Real Estate with Technology',
        description: 'Explore innovations in real estate powered by AI, blockchain, IoT, and automation. PropTech transforms how we buy, sell, and manage property.',

        photo: '/images/categories/proptech.jpg',
        video: '/videos/categories/proptech-intro.mp4',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10001",
        name: 'Smart Homes',
        slug: 'smart-homes',
        tagline: 'Future Living Starts at Home',
        description: 'Dive into home automation, smart energy systems, and connected living environments. Smart homes make life easier, greener, and safer.',

        photo: '/images/categories/smart-homes.jpg',
        video: '/videos/categories/smart-homes.mp4',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10002",
        name: 'AI in Real Estate',
        slug: 'ai-real-estate',
        tagline: 'Predict. Optimize. Profit.',
        description: 'From automated valuations to predictive maintenance and tenant behavior analytics, AI is changing how real estate decisions are made.',

        photo: '/images/categories/ai-real-estate.jpg',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10003",
        name: 'Wealth Building Strategies',
        slug: 'wealth-building',
        tagline: 'Grow Smarter, Live Freer',
        description: 'Learn powerful strategies for long-term wealth creation, from real estate to tech investments. Build a life of financial freedom and impact.',

        photo: '/images/categories/wealth-building.jpg',
        video: '/videos/categories/wealth-building.mp4',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    },
    {
        id: "10004",
        name: 'Alternative Investments',
        slug: 'alternative-investments',
        tagline: 'Think Outside the Stock',
        description: 'Explore REITs, crowdfunding, crypto, and other alternative investment vehicles for portfolio diversification and alpha generation.',

        photo: '/images/categories/alternative-investments.jpg',
        createdAt: now,
        updatedAt: now,
        subcategoryIds: []
    }
];


const BlogPreview = ({ }) => {

    const sectionRef = React.useRef(null);

    const mobile = useMediaQuery(`(max-width:767px)`);

    return (

        <SectionWrapper
            ref={sectionRef}
            id='home-blog-preview-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <div
                className='flex flex-col justify-between h-full grow'
            >
                <MainHeroHeader
                    id={"blog-preview-header"}
                    headerLabel={`Deep Dives into Technology, Finance & the Future`}
                    tagline={"Fresh. Informative. Relevant."}
                    size={mobile ? "md" : "xl"}
                />

                <MotionDiv
                    className='flex gap-12'
                >
                    <BlogPreviewWrapper
                        className='relative left-[12vw] xl:left-[-3vw] rounded-4xl bg-gray-950 py-6 px-6 w-screen xl:w-[45vw]'
                    >
                        <BlogPreviewCard
                            post={mockBlogPosts[0]}
                        />
                    </BlogPreviewWrapper>

                    <MotionDiv
                        className='hidden xl:flex xl:flex-col'
                    >
                        <div className='w-full h-fit'>
                            <Typography variant='h3' >
                                Featured Posts
                            </Typography>
                            <div
                                className='w-full min-h-[27vh]'
                            >

                                <MotionDiv
                                    className='h-[24vh] w-full absolute flex gap-6'
                                >
                                    {
                                        mockBlogPosts.map((p, i) => {
                                            if (i === 0) return
                                            return (
                                                <BlogRelatedPostCard
                                                    key={p.id}
                                                    post={p}
                                                />
                                            )
                                        })
                                    }


                                </MotionDiv>
                            </div>
                        </div>

                        <div
                            className='w-full mt-auto'
                        >
                            <Typography variant='h3' >
                                Categories
                            </Typography>
                            <div
                                className='w-full min-h-[27vh]'
                            >

                                <MotionDiv
                                    className='h-[24vh] w-full absolute flex gap-6'
                                >
                                    {
                                        mockCategories.map((c) => {
                                            return (
                                                <BlogCategoryCard
                                                key={c.id}
                                                    category={c}
                                                />
                                            )
                                        })
                                    }


                                </MotionDiv>
                            </div>
                        </div>

                    </MotionDiv>
                </MotionDiv>

                <MotionDiv
                    className="w-full flex gap-3 relative z-50"
                >
                    <Link href={`/blog`}>
                        <Button variant="contained" color='primary'>
                            Go to Blog
                        </Button>
                    </Link>
                    <Link href={`/blog/subscribe`}>
                        <Button variant="outlined" color='primary'
                        >
                            Subscribe
                        </Button>
                    </Link>

                </MotionDiv>
            </div>


        </SectionWrapper>

    )
}



export default BlogPreview;