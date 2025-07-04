"use client"

import React from 'react'
import PrestigePartnersMainHero from './main-hero/PrestigePartnersMainHero';
import WhyPartnerWithMe from './why-partner-with-me/WhyPartnerWithMe';
import InvestmentPhilosophy from './investment-philosophy/InvestmentPhilosophy';
import PartnerSelection from './partner-selection/PartnerSelection';
import ChooseYourPathCTA from '@/components/contact-forms/ChooseYourPathCTA';


const PrestigePartnersMainModule = ({ }) => {

    return (
        <>
            <PrestigePartnersMainHero />
            <WhyPartnerWithMe />
            <InvestmentPhilosophy />
            <PartnerSelection />
            <ChooseYourPathCTA />
        </>
    )
}



export default PrestigePartnersMainModule;