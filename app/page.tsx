import React from 'react'
import MainHomeHero from './_home-page/components/MainHomeHero'
import TechnologyMeetsStrategy from './_home-page/components/TechnologyMeetsStrategy'
import WhatsHappening from './_home-page/components/WhatsHappening';
import BlogPreview from './_home-page/components/BlogPreview';
import BuildSomethingExtraordinary from './_home-page/components/BuildSomethingExtraordinary';

const HomePage = () => {
  return (
    <>

      <MainHomeHero />
      <TechnologyMeetsStrategy />
      <WhatsHappening />
      <BlogPreview />
      <BuildSomethingExtraordinary />
    </>


  )
}

export default HomePage