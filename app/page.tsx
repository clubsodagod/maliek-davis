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
  title: "Maliek Davis | Software Engineer & Real Estate Investor",
  description:
    "Explore the world of Maliek Davis — a results-driven software engineer, real estate investor, and entrepreneur focused on innovation, strategy, and impact. Discover tech solutions, investment opportunities, and more.",
  keywords: [
    "Maliek Davis",
    "Software Engineer",
    "Real Estate Investor",
    "Entrepreneur",
    "Tech Consultant",
    "Web Development",
    "Multifamily Investing",
    "Real Estate Automation",
    "Michigan Real Estate",
    "Startup Strategy",
  ],
  openGraph: {
    title: "Maliek Davis | Software Engineer & Real Estate Investor",
    description:
      "Learn about Maliek Davis, a strategic software engineer and real estate investor helping others create leverage through technology and property acquisition.",
    url: "https://maliek-davis.com",
    siteName: "Maliek Davis",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maliek Davis",
    description:
      "Entrepreneur, software engineer, and investor focused on building tech and real estate systems that create freedom and long-term value.",
  },
};


