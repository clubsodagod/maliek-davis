"use client"

import React from 'react'
import RealEstateMainHero from './building-blocks/RealEstateMainHero';
import DealSourcingAndEvaluation from './building-blocks/deal-sourcing-evaluation/DealSourcingAndEvaluation';
import RealEstateInvestmentCriteria from './building-blocks/RealEstateInvestmentCriteria';
import BlogModule from '@/components/blog-post-preview/BlogModule';
import ChooseYourPathCTA from '@/components/contact-forms/ChooseYourPathCTA';
import StrategiesInAction from '@/app/_investments/_components/building-blocks/strategies-in-action/StrategiesInAction';
import { IBlogPost } from '@/database/models/blog-posts.model';

type RealEstateMainModuleProps = {
    posts?: IBlogPost[] | undefined;
}

const RealEstateMainModule: React.FC<RealEstateMainModuleProps> = ({
    posts
}) => {

    return (
        <>
            <RealEstateMainHero />
            <RealEstateInvestmentCriteria />
            <DealSourcingAndEvaluation />
            <BlogModule
                posts={posts}
                headerLabel={'The Daily Davis'}
                tagline='Real Estate Investors Edition'
                id={''}
            />
            <StrategiesInAction />
            <ChooseYourPathCTA />
        </>
    )
}



export default RealEstateMainModule;