import React from 'react'
import MainHomeHero from './_home-page/components/MainHomeHero'
import TechnologyMeetsStrategy from './_home-page/components/TechnologyMeetsStrategy'
import WhatsHappening from './_home-page/components/WhatsHappening';
import BlogPreview from './_home-page/components/BlogPreview';
import ChooseYourPathCTA from '@/components/contact-forms/ChooseYourPathCTA';
import { getAllBlogPostCategories, paginatedBlogFetcher } from '@/utility/fetchers/blog.fetcher';
import { IBlogPost } from '@/database/models/blog-posts.model';
import { ICategory } from '@/database/models/category.model';

export default async function HomePage() {
  const posts = await paginatedBlogFetcher(0, 0) as unknown as IBlogPost[];
  const categories = await getAllBlogPostCategories() as unknown as ICategory[];
  console.log(posts);
  
  

  return (
    <>
      <MainHomeHero />

      <TechnologyMeetsStrategy />
      <WhatsHappening />
      <BlogPreview posts={posts} categories={categories} />
      <ChooseYourPathCTA />
    </>


  )
}

