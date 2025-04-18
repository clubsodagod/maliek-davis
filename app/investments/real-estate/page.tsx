import React from 'react'
import RealEstateMainModule from './_components/RealEstateMainModule'
import RealEstateInvestmentCriteria from './_components/building-blocks/RealEstateInvestmentCriteria'
import DealSourcingAndEvaluation from './_components/building-blocks/deal-sourcing-evaluation/DealSourcingAndEvaluation'

const RealEstatePage = () => {
    return (
        <>
            <RealEstateMainModule />
            <RealEstateInvestmentCriteria />
            <DealSourcingAndEvaluation />
        </>
    )
}

export default RealEstatePage