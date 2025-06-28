import React from 'react'
import MainHomeHero from './_home-page/components/MainHomeHero'
import TechnologyMeetsStrategy from './_home-page/components/TechnologyMeetsStrategy'
import WhatsHappening from './_home-page/components/WhatsHappening';
import BlogPreview from './_home-page/components/BlogPreview';
import { getAllBlogPostCategories, paginatedBlogFetcher } from '@/utility/fetchers/blog.fetcher';
import { IBlogPost } from '@/database/models/blog-posts.model';
import { ICategory } from '@/database/models/category.model';
import SellYourHomeFastSection from './_home-page/components/SellYourHomeFastSection';
import { Metadata } from 'next';

export default async function HomePage() {
  const posts = await paginatedBlogFetcher(0, 0) as unknown as IBlogPost[];
  const categories = await getAllBlogPostCategories() as unknown as ICategory[];
  console.log(posts);


  return (
    <>
      <MainHomeHero />
      <SellYourHomeFastSection />
      <TechnologyMeetsStrategy />
      <WhatsHappening />
      <BlogPreview posts={posts} categories={categories} />
      {/* <ChooseYourPathCTA /> */}
    </>


  )
}


export const metadata: Metadata = {
  title: "Maliek Davis | Intelligent Systems & Strategic Investments",
  description:
    "Building intelligent systems, profitable investments, and innovation without limits. Maliek Davis helps visionary businesses and investors unlock scalable growth through AI, automation, and real estate strategy.",
  keywords: [
    "Maliek Davis",
    "AI Automation",
    "Real Estate Investing",
    "Strategic Investments",
    "Software Engineer",
    "Entrepreneur",
    "Business Systems",
    "Real Estate Innovation",
    "Tech Consultant",
    "Automated Solutions",
    "Startup Strategy",
    "Multifamily Real Estate",
    "Michigan Real Estate",
    "Growth Engineering",
  ],
  openGraph: {
    title: "Maliek Davis | Intelligent Systems & Strategic Investments",
    description:
      "Explore how Maliek Davis engineers profitable investments and future-proof systems at the intersection of AI, automation, and real estate innovation.",
    url: "https://maliek-davis.com",
    siteName: "Maliek Davis",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maliek Davis | Systems, Capital, Innovation",
    description:
      "Entrepreneur and investor engineering systems and opportunities for long-term value. AI. Automation. Real estate. Growth without limits.",
  },
};



