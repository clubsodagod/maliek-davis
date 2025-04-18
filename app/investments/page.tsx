import React from 'react'
import InvestmentsMainModule from './_components/InvestmentsMainModule'
import InvestmentsFocus from './_components/building-blocks/investments-focus/InvestmentsFocus'
import StrategiesInAction from './_components/building-blocks/strategies-in-action/StrategiesInAction'
import BlogModule from '@/components/blog-post-preview/BlogModule'
import ChooseYourPathCTA from '@/components/contact-forms/ChooseYourPathCTA'

const InvestmentsPage = () => {
    return (
        <>
            <InvestmentsMainModule />
            <InvestmentsFocus />
            <StrategiesInAction />
            <BlogModule
                headerLabel={'The Daily Davis'}
                tagline='Real Estate Market Insights & Strategies Edition'
                id={'investments-blog-preview'}
            />
            <ChooseYourPathCTA />
        </>

    )
}

export default InvestmentsPage