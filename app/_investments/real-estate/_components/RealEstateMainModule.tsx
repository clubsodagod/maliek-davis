"use client"

import React from 'react'
import RealEstateMainHero from './building-blocks/RealEstateMainHero';
import DealSourcingAndEvaluation from './building-blocks/deal-sourcing-evaluation/DealSourcingAndEvaluation';
import RealEstateInvestmentCriteria from './building-blocks/RealEstateInvestmentCriteria';
import BlogModule from '@/components/blog-post-preview/BlogModule';
import ChooseYourPathCTA from '@/components/contact-forms/ChooseYourPathCTA';
import StrategiesInAction from '../../_components/building-blocks/strategies-in-action/StrategiesInAction';


const RealEstateMainModule = ({ }) => {

    return (
        <>
            <RealEstateMainHero />
            <RealEstateInvestmentCriteria />
            <DealSourcingAndEvaluation />
            <BlogModule headerLabel={'The Daily Davis'} tagline='Real Estate Ivestors Edition' id={''}            
            />
            <StrategiesInAction />
            <ChooseYourPathCTA />
        </>
    )
}



export default RealEstateMainModule;