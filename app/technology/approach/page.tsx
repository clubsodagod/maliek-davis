import React from 'react'
import TechnologyApproachMainHero from './_components/TechnologyApproachMainHero'
import CoreGuidingPrinciples from './_components/core-guiding-principles/CoreGuidingPrinciples'
import DesignPatternsArchitecture from './_components/design-patterns-and-architecture/DesignPatternsArchitecture'
import HolisticTechnology from "./_components/holistic-technology/HolisticTechnology"
import ChoosingProjects from './_components/choosing-right-project/ChoosingProjects'
import RealResults from './_components/real-results/RealResults'
import ChooseYourPathCTA from '@/components/contact-forms/ChooseYourPathCTA'

const TechnologyApproachPage = () => {
    return (
        <>
            <TechnologyApproachMainHero />
            <CoreGuidingPrinciples />
            <DesignPatternsArchitecture />
            <HolisticTechnology />
            <ChoosingProjects /> 
            <RealResults />
            <ChooseYourPathCTA />
        </>
    )
}

export default TechnologyApproachPage