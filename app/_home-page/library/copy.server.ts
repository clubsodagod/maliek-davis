"use server";

import AnnouncementModel, { IAnnouncement } from "@/database/models/announcement.model";
import connectToDB from "@/database/connect-to-db.database";


export const getMockAnnouncements = async (): Promise<IAnnouncement[]> => {
    await connectToDB();

    const announcements: IAnnouncement[] = [
        new AnnouncementModel({
            title: "Tech Talk at CodeCon 2025",
            slug: "tech-talk-codecon-2025",
            description: "Join Maliek Davis at CodeCon to explore the future of AI in everyday applications.",
            type: "speaking_engagement",
            image: "/images/codecon.jpg",
            speakingEngagement: {
                event: "CodeCon 2025",
                date: new Date("2025-08-15"),
                location: "San Francisco, CA",
                topic: "AI-Powered Automation in Daily Life",
                link: "https://codecon2025.com/speakers/maliek-davis",
            },
        }),

        new AnnouncementModel({
            title: "Downtown Detroit Value-Add Syndication",
            slug: "detroit-syndication-deal",
            description: "An exciting syndication opportunity in downtown Detroit for accredited investors.",
            type: "real_estate_syndication",
            realEstateSyndication: {
                propertyName: "The Edison Lofts",
                location: "Detroit, MI",
                totalRaise: 2500000,
                minimumInvestment: 25000,
                expectedReturns: "14% IRR over 5 years",
                contactEmail: "invest@pearlboxcapital.com",
                offeringMemorandumUrl: "https://example.com/memo/edison-lofts.pdf",
            },
        }),

        new AnnouncementModel({
            title: "Rueblur NFT Launch",
            slug: "rueblur-nft-launch",
            description: "Rueblur drops its first NFT collection focused on mental health and digital art.",
            type: "new_social_content",
            newSocialContent: {
                platform: "Instagram",
                postTitle: "NFT Drop: Rueblur x Mental Health",
                postUrl: "https://instagram.com/p/mentalhealth-nft",
                tags: ["#NFT", "#MentalHealth", "#Rueblur"],
            },
        }),

        new AnnouncementModel({
            title: "Community Clean-Up Day",
            slug: "community-cleanup-august",
            description: "Join us for a neighborhood clean-up and BBQ in Westside Detroit!",
            type: "community_service_event",
            communityServiceEvent: {
                eventName: "Westside Community Clean-Up",
                date: new Date("2025-08-10"),
                location: "Rosedale Park, Detroit, MI",
                description: "Bring gloves, a smile, and let's restore the beauty of our neighborhood.",
                signupLink: "https://signup.com/rosedale-cleanup",
            },
        }),

        new AnnouncementModel({
            title: "Tech for Teens Fundraiser",
            slug: "tech-for-teens-2025",
            description: "Help us raise $10,000 to provide laptops and coding bootcamp access to underserved teens.",
            type: "fundraising",
            fundraising: {
                goalAmount: 10000,
                raisedAmount: 3000,
                cause: "Youth Technology Access",
                endDate: new Date("2025-09-01"),
                donationLink: "https://donate.techforteens.org",
            },
        }),

        new AnnouncementModel({
            title: "Launch of CleanCash SaaS",
            slug: "cleancash-client-launch",
            description: "We just launched CleanCash, a SaaS for automated bookkeeping for small business owners.",
            type: "completed_client_project",
            completedClientProject: {
                clientName: "CleanCash Inc.",
                projectName: "CleanCash Web Platform",
                technologiesUsed: ["React", "Node.js", "MongoDB", "Stripe"],
                summary: "Built an automated expense management and tax prep system for sole proprietors.",
                caseStudyLink: "https://maliek-davis.com/case-studies/cleancash",
            },
        }),

        new AnnouncementModel({
            title: "AI Trading Bot Opportunity",
            slug: "ai-trading-investment",
            description: "Invest in our next-gen AI trading algorithm with projected 18% annual returns.",
            type: "investment_opportunity",
            investmentOpportunity: {
                category: "technical_project",
                dealSummary: "Seed round for AI-powered algorithmic trading system.",
                minInvestment: 5000,
                projectedReturns: "18% annually",
                deadline: new Date("2025-07-15"),
                linkToMoreInfo: "https://maliek-davis.com/investments/trading-ai",
            },
        }),
    ];

    return announcements;
};
