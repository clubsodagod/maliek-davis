"use client"
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper'
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import React, { useState } from 'react'
import AnnouncementCard from './AnnouncementCard';


interface Announcement {
    name: string;
    ftImg: string;
    description: string;
    path: string;
}


const announcements: Announcement[] = [
    {
        name: "New Feature: AI-Powered Home Valuations",
        ftImg: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1738719128/DALL_E_2025-02-04_20.28.57_-_A_visually_appealing_diagram_representing_the_architecture_of_a_modern_web_application._The_diagram_includes_key_components_such_as_the_frontend_UI_U_omvhet.webp",
        description: "Introducing AI-driven home value estimates on our real estate platform. Get accurate pricing insights instantly.",
        path: "/features/ai-home-valuation"
    },
    {
        name: "Investor Insights Newsletter - March 2025 Edition",
        ftImg: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1738696103/DALL_E_2025-02-04_14.07.39_-_An_illustration_of_multiple_apartment_buildings_with_different_investors_symbolically_sharing_ownership._Above_the_buildings_a_large_dollar_sign_hove_tkiliz.webp",
        description: "Stay ahead in the real estate market with our latest insights, trends, and exclusive deals for investors.",
        path: "/newsletters/march-2025"
    },
    {
        name: "Upcoming Webinar: Real Estate Investing in 2025",
        ftImg: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1738511921/DALL_E_2025-02-02_10.56.30_-_A_futuristic_circuit_board_with_lush_green_trees_growing_from_it_symbolizing_sustainable_innovation._The_design_should_blend_technology_and_nature_se_mldpd4.webp",
        description: "Join us for an in-depth webinar on navigating the 2025 real estate market. Learn from industry experts and get exclusive tips.",
        path: "/events/webinar-investing-2025"
    },
    {
        name: "Project Spotlight: Metro Detroit Revitalization",
        ftImg: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1738696103/DALL_E_2025-02-04_14.07.39_-_An_illustration_of_multiple_apartment_buildings_with_different_investors_symbolically_sharing_ownership._Above_the_buildings_a_large_dollar_sign_hove_tkiliz.webp",
        description: "Discover our latest initiative to transform underperforming properties into high-value investments in Metro Detroit.",
        path: "/projects/metro-detroit-revitalization"
    },
    {
        name: "Exclusive Off-Market Properties Available",
        ftImg: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1738511921/DALL_E_2025-02-02_10.58.09_-_A_futuristic_chessboard_with_a_glowing_knight_piece_at_the_center_symbolizing_strategic_forward_thinking._The_knight_emits_a_radiant_blue_and_gold_gl_hvmu2n.webp",
        description: "We have new off-market properties ready for investment. Act fast before they hit the public market.",
        path: "/deals/off-market-listings"
    },
    {
        name: "Blog Update: The Science Behind Real Estate Valuations",
        ftImg: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1738719128/DALL_E_2025-02-04_20.28.57_-_A_visually_appealing_diagram_representing_the_architecture_of_a_modern_web_application._The_diagram_includes_key_components_such_as_the_frontend_UI_U_omvhet.webp",
        description: "Explore the technical and scientific aspects of property valuations and how AI is changing the game.",
        path: "/blog/science-of-valuation"
    },
    {
        name: "Tech Upgrade: Improved Buyer Portal Experience",
        ftImg: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1738696103/DALL_E_2025-02-04_14.07.39_-_An_illustration_of_multiple_apartment_buildings_with_different_investors_symbolically_sharing_ownership._Above_the_buildings_a_large_dollar_sign_hove_tkiliz.webp",
        description: "Our buyer portal just got a major upgrade, making it easier to track deals, manage offers, and get alerts on new properties.",
        path: "/updates/buyer-portal-2025"
    },
    {
        name: "Networking Event: Connect with Top Investors",
        ftImg: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1738511708/DALL_E_2025-02-02_10.52.02_-_A_majestic_digital_phoenix_rising_from_a_sea_of_glowing_binary_code_symbolizing_transformation_and_adaptation._The_phoenix_is_composed_of_neon-like_e_dm7sfx.webp",
        description: "Join us in downtown Detroit for an exclusive investor networking event. Meet top-tier buyers and sellers in the industry.",
        path: "/events/investor-networking-2025"
    }
];

const WhatsHappening = () => {

    const sectionRef = React.useRef<HTMLDivElement>(null);


    const [announcement, setAnnouncement] = useState<number>(0);

    return (
        <SectionWrapper
            ref={sectionRef}
            id='whats-happening-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            
        {/* <BackgroundColorUnderlay 
            bgcolor={grey[50]}
        /> */}
            <div
                className='flex flex-col gap-3 h-full grow relative'
            >

                <MainHeroHeader
                    id={"whats-happening-header"}
                    headerLabel={`What's Happening`}
                    tagline={"Live & Upcoming: Projects. Events. Announcements."}
                    size={"lg"}
                />

            </div>
                <div
                    className='sliding-card-ctn  w-screen bg-[#fafafa66]'
                >
                    {
                        announcements.map((a,i)=>{

                            return (
                                <SlidingCardWrapper
                                    key={`${a.name} ${i}`}
                                    id={a.name}
                                    onClick={()=>setAnnouncement(i)}
                                >
                                    <AnnouncementCard 
                                        announcement={a}
                                        open={i===announcement}
                                        index={i}
                                    />
                                </SlidingCardWrapper>
                            )
                        })
                    }
                </div>
        </SectionWrapper>
    )
}

export default WhatsHappening