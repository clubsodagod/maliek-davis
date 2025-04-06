"use client"

import React from 'react'
// import useMediaQuery from '@mui/material/useMediaQuery';
import MainHeroHeader from '@/components/headers/MainHeroHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { initialHeaderAnimation, animateHeaderAnimation, transitionHeaderAnimation } from '@/library/animations/enter.animations';
import SlidingCardWrapper from '@/components/wrappers/SlidingCardWrapper';
import TechnologySolutionCard from './TechnologySolutionCard';


const TechnologySolutions = ({ }) => {

    const sectionRef = React.useRef(null);
        const [solution, setSolution] = React.useState<number>(0);

    // const desktop = useMediaQuery(`(min-width:1100px)`);

    return (
        <SectionWrapper
            id='technology-solutions-section'
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
            className=''
        >
            {/* <div className='w-full grow' /> */}


            <MainHeroHeader
                headerLabel={"Scalable, Secure, and Intelligent Technology for Growth & Innovation"}
                size={"md"}
                className=''
                tagline=''
            />

            <div
                className='w-screen flex flex-col relative -left-6'
            >
                
                                    {/* <MotionDiv
                                        className='w-full absolute left-6 mt-20 '
                                    >

                                    </MotionDiv> */}
                {
                    technologySolutions.map((s,i)=> {

                        return(
                            <SlidingCardWrapper
                                key={`${s.title} ${i}`}
                                id={s.title}
                                onClick={() => setSolution(i)}
                            >
                                <TechnologySolutionCard 
                                    solution={s}
                                    open={solution===i}
                                />
                            </SlidingCardWrapper>
                        )
                    })
                }
            </div>
        </SectionWrapper>

    )
}



export default TechnologySolutions;

export type Solution = {
    heading: string;
    items: string[];
    results?: string[];
    photo: string;
}; 

export type SolutionCategory = {
    title: string;
    subtitle: string;
    description: string;
    solutions: Solution[];
    bestFitFor: string[];
    cta: {
        label: string;
        link: string;
    };
    photo:string;
};


export const technologySolutions: SolutionCategory[] = [
    {
        title: "CTOs & Tech Decision-Makers",
        subtitle: "Powerful, Scalable, and Secure Architectures to Drive Innovation",
        description:
            "As a CTO, VP of Engineering, or technical leader, your biggest challenges often include scaling infrastructure, reducing technical debt, and ensuring performance & security. I provide battle-tested, future-proof solutions that empower your company to innovate without limits.",
        solutions: [
            {
                heading: "🚀 Scalability & Performance Engineering",
                items: [
                    "Optimize architecture to handle 10x growth without failure",
                    "Cloud & Infrastructure Optimization: Cost-efficient, auto-scaling solutions",
                    "Microservices & Serverless: Breaking monoliths into fast, manageable services"
                ],
                results: [
                    "Blazing-fast applications that scale effortlessly",
                    "Lower cloud costs & improved efficiency",
                    "Fewer outages & downtime—better customer experience"
                ],
                photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_2_wyltq0.png"
            },
            {
                heading: "🧠 AI & Automation for Business Efficiency",
                items: [
                    "Intelligent Automation: AI-driven process optimization & decision-making",
                    "Custom AI Models: Machine learning tailored to your business needs"
                ],
                results: [
                    "Automated workflows save time & reduce human error",
                    "AI-driven insights improve decision-making & revenue",
                    "Scalable AI solutions that grow with your company"
                ],
                photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_2_wyltq0.png"
            }
        ],
        bestFitFor: [
            "Enterprise companies scaling fast",
            "Startups needing rock-solid architecture from day one",
            "CTOs looking to future-proof their systems & improve efficiency"
        ],
        cta: {
            label: "Schedule a Free Technical Strategy Call",
            link: "/contact/strategy-call"
        },
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_2_wyltq0.png",
    },
    {
        title: "Software Developers & Engineering Teams",
        subtitle: "Building Maintainable, Scalable, and Efficient Software",
        description:
            "Developers & engineering teams often struggle with technical debt, slow development cycles, and outdated processes. These solutions help you write better code, scale your applications, and master cutting-edge technologies.",
        solutions: [
            {
                heading: "🛠 High-Quality Code & Best Practices",
                items: [
                    "Clean Architecture Consulting: Learn how to design scalable, maintainable codebases",
                    "Code Review & Refactoring: Eliminate technical debt & improve readability",
                    "CI/CD & Test Automation: Faster, bug-free releases with automated testing"
                ],
                results: [
                    "Simpler, maintainable code that future engineers love",
                    "Reduced bugs, faster releases, and increased reliability"
                ],
                photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_3_vosmxa.png"
            },
            {
                heading: "📈 Scaling Development Processes & Productivity",
                items: [
                    "DevOps & Cloud Automation: CI/CD, infrastructure as code, and monitoring",
                    "Remote Team Optimization: Efficient workflows & collaboration strategies",
                    "Agile & Lean Software Development: Faster iterations & better team velocity"
                ],
                results: [
                    "Eliminate bottlenecks & reduce wasted time",
                    "Higher developer efficiency & faster product delivery"
                ],
                photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586752/Convert_to_PNG_project_11_tojbmw.png"
            },
            {
                heading: "💡 AI & Web3 Development for Engineers",
                items: [
                    "AI Integration in Applications: How to leverage AI in software products",
                    "Smart Contracts & Web3: Secure, decentralized applications",
                    "Cloud-Native Development: Leverage the power of scalable cloud infrastructure"
                ],
                photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586751/Convert_to_PNG_project_17_q0znzm.png"
            }
        ],
        bestFitFor: [
            "Engineering teams improving their development process",
            "Senior developers mastering modern architectures",
            "Companies training their teams in AI, automation & Web3"
        ],
        cta: {
            label: "Join a Hands-On Workshop or Schedule a Mentorship Call",
            link: "/contact/developer-support"
        },
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_2_wyltq0.png",
    },
    {
        title: "Startups, Entrepreneurs & Tech Enthusiasts",
        subtitle: "Bringing Innovative Ideas to Market Faster & Smarter",
        description:
            "Startups and entrepreneurs need tech solutions that scale fast without technical debt. I help founders turn ideas into reality with AI, automation, and Web3-ready infrastructure.",
        solutions: [
            {
                heading: "🚀 MVP Development & Startup Acceleration",
                items: [
                    "AI-Powered MVPs: Launch faster with AI-driven prototypes",
                    "Rapid Prototyping & Lean Architecture: Go from idea to market in weeks",
                    "Scalable Infrastructure: Avoid technical debt before it happens"
                ],
                results: [
                    "Fast, cost-efficient MVP launch",
                    "Scalability from day one—no need for costly rewrites"
                ],
                photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586752/Convert_to_PNG_project_14_vgtzfi.png"
            },
            {
                heading: "🔗 Web3 & Decentralized App Development",
                items: [
                    "Smart Contracts & Tokenization: Secure, cost-effective blockchain integration",
                    "NFT & DeFi Development: Next-gen Web3 solutions",
                    "DAO & Governance Solutions: Blockchain for business innovation"
                ],
                results: [
                    "Leverage blockchain for transparency & security",
                    "Tap into emerging decentralized finance opportunities"
                ],
                photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586752/Convert_to_PNG_project_12_pb2uhd.png"
            },
            {
                heading: "🤖 AI-Driven Personalization & Automation",
                items: [
                    "AI Chatbots & Virtual Assistants: Automate support & sales",
                    "Recommendation Engines: AI-powered product personalization",
                    "AI Workflow Automation: Save time with intelligent automation"
                ],
                photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586751/Convert_to_PNG_project_16_huki6w.png"
            }
        ],
        bestFitFor: [
            "Startups needing cutting-edge tech without a massive team",
            "Entrepreneurs looking to validate & scale fast",
            "Tech enthusiasts exploring AI, blockchain & automation"
        ],
        cta: {
            label: "Get a Custom Tech Roadmap for Your Startup",
            link: "/contact/startup-roadmap"
        },
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_2_wyltq0.png",
    },
    {
        title: "Custom Consultation & Advisory Services",
        subtitle: "AI & Automation Strategy for Any Business",
        description:
            "For businesses looking to implement AI, automate processes, and optimize development, I offer one-on-one advisory services tailored to your needs.",
        solutions: [
            {
                heading: "🔹 AI & Automation Advisory",
                items: [
                    "Identify business processes AI can optimize",
                    "Design & implement machine learning solutions for automation"
                ],
                photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586750/Convert_to_PNG_project_24_x4dkwa.png"
            }
        ],
        bestFitFor: [
            "Small businesses optimizing workflows & cutting costs",
            "Enterprises leveraging AI to scale faster",
            "CTOs and tech leads looking for expert AI strategy"
        ],
        cta: {
            label: "Book a Consultation Call",
            link: "/contact/consultation"
        },
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_2_wyltq0.png",
    }
];

