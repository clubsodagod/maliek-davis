"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Button, useMediaQuery } from '@mui/material';
import React from 'react'
import BusinessPlanningSection from './business-planning/BusinessPlanningSection';
import BrandingSection from './branding/BrandingSection';
import DigitalPresenceSection from './digital-presence/DigitalPresenceSection';
import AIAutomationSection from './ai-automation/AIAutomationSection';
import MarketingGrowthSystemsSection from './marketing-growth-systems/MarketingGrowthSystemsSection';


function renderSection(section: number) {
    switch (section) {
        case 0:
            return <BusinessPlanningSection />
        case 1:
            return <BrandingSection />
        case 2:
            return <DigitalPresenceSection />
        case 3:
            return <AIAutomationSection />
        case 4:
            return <MarketingGrowthSystemsSection />

        default:
            break;
    }
}

const BusinessModule = ({ }) => {


    const sectionRef = React.useRef(null);

    const desktop = useMediaQuery(`(min-width:1100px)`);

    const [section, setSection] = React.useState<number>(0);

    return (
        <>
            <SectionWrapper
                id='business-hero-section'
                ref={sectionRef}
                whileInView={{ opacity: 1 }}
                initial={initialHeaderAnimation}
                animate={animateHeaderAnimation}
                transition={transitionHeaderAnimation}
                exit={{ opacity: 0, scaleY: 0 }}
                className=''
            >

                <div
                    className='w-full sm:px-[12.5vw] grow flex flex-col justify-center'
                >
                    <MainHeroHeader
                        headerLabel={"Compete With Giants. Run Your Business Like a Boss."}
                        headerLabelClassName='text-center'
                        taglineClassName='text-center'
                        tagline={"Branding. Digital Presence. Automation. Scalable Marketing Systems."}
                        size={!desktop ? "md" : "xl"}
                        className=''
                    />
                    <div className="w-full mt-10 flex flex-wrap justify-center items-center px-10 sm:px-20 min-h-12 gap-6">
                        {["Planning", "Branding", "Digital Presence", "AI & Automation", "Marketing & Growth"].map((label, i) => (
                            <Button
                                key={label}
                                variant="contained"
                                id={section === i ? "selected-btn" : undefined}
                                onClick={() => setSection(i)}
                                disabled={section === i}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>


                </div>

            </SectionWrapper>

            {
                renderSection(section)
            }

        </>
    )
}



export default BusinessModule;