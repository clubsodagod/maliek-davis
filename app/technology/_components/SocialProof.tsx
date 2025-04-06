"use client"

import MainHeroHeader from '@/components/headers/MainHeroHeader';
import { MotionDiv } from '@/components/motion/MotionDiv';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import TestimonialCard from './TestimonialCard';


const SocialProof = ({ }) => {

    const sectionRef = React.useRef(null);

    return (
        <SectionWrapper
            ref={sectionRef}
            id='social-proof-section'
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >


            <Box component={MotionDiv}
                className='w-screen relative -left-6 px-6 pb-12 rounded-b-4xl flex flex-col gap-3'
                style={{
                    boxShadow: "1px 6px 8px  #17171747",
                }}

            >
                <MainHeroHeader
                    headerLabel={"Results Driven. Proven Success."}
                    tagline={"Don't just take our word for it—see the impact of our technology solutions in action."}
                    size={"lg"}
                    className=''
                />

                <div
                    className='w-full flex flex-col gap-1 '
                >
                    <Typography variant='h4' color='primary.light'>
                        Case Studies
                    </Typography>
                    <div className='flex flex-col gap-2 w-full'>
                        {
                            caseStudies.map((c, i) => {

                                if (i > 1) {
                                    if (i === 2) {
                                        return (
                                            <Link href={`/technology/portfolio/case-studies`}
                                                key={`${c.title} ${i}`}
                                            >
                                                <Typography variant='body2' className=' w-full underline' fontStyle={"italic"}  >
                                                    more...
                                                </Typography>
                                            </Link>
                                        )
                                    } else {
                                        return
                                    }
                                }
                                return (
                                    <Link href={`/technology/portfolio${c.path}`}
                                        key={`${c.title} ${i}`}
                                    >
                                        <Typography variant='body2' className='line-clamp-1 w-full underline' fontWeight={"200"} >
                                            {c.title}
                                        </Typography>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

            </Box>

            <div
                className='w-full flex flex-col gap-6 '
            >

                <Typography
                    fontWeight={"600"}
                    variant='h5' color='secondary.dark'
                    className='w-full text-center'
                >
                    Client Testimonials
                </Typography>

                <TestimonialCard testimonial={testimonials[0]}/>
            </div>

            <div className='w-full grow' />
        </SectionWrapper>
    )
}



export default SocialProof;


type CaseStudy = {
    title: string;
    path: string;
};


export const caseStudies: CaseStudy[] = [
    {
        title: "Scaling a Fintech App to 1 Million Users Without Downtime",
        path: "/case-studies/scaling-fintech-app"
    },
    {
        title: "AI Automation That Saved a Startup 40+ Hours a Week",
        path: "/case-studies/ai-startup-automation"
    },
    {
        title: "From Monolith to Microservices: A Legacy System Rebuilt",
        path: "/case-studies/legacy-to-microservices"
    },
    {
        title: "Smart Contract Integration for a Decentralized Real Estate Platform",
        path: "/case-studies/smart-contract-real-estate"
    },
    {
        title: "Launching an AI-Powered MVP in 30 Days",
        path: "/case-studies/ai-mvp-launch"
    },
    {
        title: "Optimizing Cloud Infrastructure to Cut Costs by 60%",
        path: "/case-studies/cloud-cost-optimization"
    },
    {
        title: "Improving Developer Velocity with Clean Architecture & CI/CD",
        path: "/case-studies/clean-architecture-devops"
    },
    {
        title: "Building a Personalized Recommendation Engine with Machine Learning",
        path: "/case-studies/ai-recommendation-engine"
    },
    {
        title: "How a DAO Model Enabled Transparent Governance at Scale",
        path: "/case-studies/dao-governance-scale"
    },
    {
        title: "Refactoring a High-Growth SaaS Platform to Eliminate Technical Debt",
        path: "/case-studies/saas-refactor-tech-debt"
    },
    {
        title: "Creating a Scalable NFT Marketplace with Web3 Infrastructure",
        path: "/case-studies/nft-marketplace-web3"
    },
    {
        title: "AI Chatbot Deployment That Doubled Customer Engagement",
        path: "/case-studies/ai-chatbot-engagement"
    },
    {
        title: "Automating Internal Ops for a Logistics Firm Using AI + No-Code Tools",
        path: "/case-studies/ai-no-code-logistics"
    },
    {
        title: "Designing Resilient APIs for Global Real-Time Data Sync",
        path: "/case-studies/resilient-api-data-sync"
    },
    {
        title: "Using AI to Predict User Behavior and Optimize UX Flow",
        path: "/case-studies/ai-user-behavior-ux"
    }
];

export type Testimonial = {
    photo: string;
    name: string;
    review: string;
    projectName: string;
    path: string;
};

export const testimonials: Testimonial[] = [
    {
        photo: "https://images.pexels.com/photos/2719416/pexels-photo-2719416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Jordan Smith",
        review: "Working with Maliek completely changed the trajectory of our platform. We went from crashing during surges to scaling effortlessly. Highly recommend!",
        projectName: "Scaling a Fintech App to 1 Million Users",
        path: "/case-studies/scaling-fintech-app"
    },
    {
        photo: "https://images.pexels.com/photos/1181431/pexels-photo-1181431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Amira Jones",
        review: "Maliek built our AI automation system in record time. We now save over 40 hours a week thanks to his clean architecture and efficient process.",
        projectName: "AI Automation That Saved a Startup 40+ Hours",
        path: "/case-studies/ai-startup-automation"
    },
    {
        photo: "/images/testimonials/diego-hernandez.jpg",
        name: "Diego Hernandez",
        review: "Our Web3 MVP wouldn't exist without Maliek. He helped us launch fast, smart, and without tech debt. His expertise in smart contracts is top tier.",
        projectName: "Smart Contract Integration for Real Estate",
        path: "/case-studies/smart-contract-real-estate"
    },
    {
        photo: "/images/testimonials/samantha-lee.jpg",
        name: "Samantha Lee",
        review: "The AI recommendation engine Maliek delivered is now our highest-performing user engagement tool. He’s a visionary engineer who truly listens.",
        projectName: "AI-Powered Product Personalization",
        path: "/case-studies/ai-recommendation-engine"
    },
    {
        photo: "/images/testimonials/eric-wu.jpg",
        name: "Eric Wu",
        review: "As a CTO, I needed clean, scalable infrastructure. Maliek not only refactored our monolith into microservices, but mentored our team along the way.",
        projectName: "From Monolith to Microservices",
        path: "/case-studies/legacy-to-microservices"
    }
];
