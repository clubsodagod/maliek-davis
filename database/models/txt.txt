import mongoose, { Schema, Document } from "mongoose";

export type AnnouncementType =
    | "speaking_engagement"
    | "investment_opportunity"
    | "completed_client_project"
    | "new_social_content"
    | "new_store_product"
    | "community_service_event"
    | "fundraising"
    | "real_estate_syndication";

export interface IAnnouncementForm {
    title: string;
    description: string;
    image?: string;
    type: AnnouncementType;

    // Optional fields based on type
    speakingEngagement?: {
        event: string;
        date: Date;
        location: string;
        topic: string;
        link?: string;
    };

    investmentOpportunity?: {
        category: "real_estate" | "technical_project";
        dealSummary: string;
        location?: string;
        minInvestment?: number;
        projectedReturns?: string;
        deadline?: Date;
        linkToMoreInfo?: string;
    };

    completedClientProject?: {
        clientName: string;
        projectName: string;
        technologiesUsed: string[];
        summary: string;
        caseStudyLink?: string;
        projectUrl?: string; // Optional URL for the project
    };

    newSocialContent?: {
        platform: string; // e.g., "YouTube", "TikTok"
        postTitle: string;
        postUrl: string;
        tags?: string[];
    };

    newStoreProduct?: {
        productName: string;
        productId: mongoose.Types.ObjectId;
        productUrl: string;
        launchDate?: Date;
    };

    communityServiceEvent?: {
        eventName: string;
        date: Date;
        location: string;
        description: string;
        signupLink?: string;
    };

    fundraising?: {
        goalAmount: number;
        raisedAmount?: number;
        cause: string;
        endDate: Date;
        donationLink: string;
    };

    realEstateSyndication?: {
        propertyName: string;
        location: string;
        totalRaise: number;
        minimumInvestment: number;
        expectedReturns: string;
        contactEmail: string;
        offeringMemorandumUrl?: string;
    };
}

export interface IAnnouncement extends Document {
    title: string;
    slug: string; // for dynamic routing
    description: string;
    image?: string;
    type: AnnouncementType;
    createdAt: Date;
    updatedAt: Date;

    // Optional fields based on type
    speakingEngagement?: {
        event: string;
        date: Date;
        location: string;
        topic: string;
        link?: string;
    };

    investmentOpportunity?: {
        category: "real_estate" | "technical_project";
        dealSummary: string;
        location?: string;
        minInvestment?: number;
        projectedReturns?: string;
        deadline?: Date;
        linkToMoreInfo?: string;
    };

    completedClientProject?: {
        clientName: string;
        projectName: string;
        technologiesUsed: string[];
        summary: string;
        caseStudyLink?: string;
    };

    newSocialContent?: {
        platform: string; // e.g., "YouTube", "TikTok"
        postTitle: string;
        postUrl: string;
        tags?: string[];
    };

    newStoreProduct?: {
        productName: string;
        productId: mongoose.Types.ObjectId;
        productUrl: string;
        launchDate?: Date;
    };

    communityServiceEvent?: {
        eventName: string;
        date: Date;
        location: string;
        description: string;
        signupLink?: string;
    };

    fundraising?: {
        goalAmount: number;
        raisedAmount?: number;
        cause: string;
        endDate: Date;
        donationLink: string;
    };

    realEstateSyndication?: {
        propertyName: string;
        location: string;
        totalRaise: number;
        minimumInvestment: number;
        expectedReturns: string;
        contactEmail: string;
        offeringMemorandumUrl?: string;
    };
}

const AnnouncementSchema = new Schema<IAnnouncement>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        image: { type: String },
        type: {
            type: String,
            enum: [
                "speaking_engagement",
                "investment_opportunity",
                "completed_client_project",
                "new_social_content",
                "new_store_product",
                "community_service_event",
                "fundraising",
                "real_estate_syndication",
            ],
            required: true,
        },

        // Subtype-specific objects
        speakingEngagement: {
            event: String,
            date: Date,
            location: String,
            topic: String,
            link: String,
        },

        investmentOpportunity: {
            category: { type: String, enum: ["real_estate", "technical_project"] },
            dealSummary: String,
            location: String,
            minInvestment: Number,
            projectedReturns: String,
            deadline: Date,
            linkToMoreInfo: String,
        },

        completedClientProject: {
            clientName: String,
            projectName: String,
            technologiesUsed: [String],
            summary: String,
            caseStudyLink: String,
            projectUrl: String,
        },

        newSocialContent: {
            platform: String,
            postTitle: String,
            postUrl: String,
            tags: [String],
        },

        newStoreProduct: {
            productName: String,
            productId: { type: mongoose.Types.ObjectId, ref: "Product" },
            productUrl: String,
            launchDate: Date,
        },

        communityServiceEvent: {
            eventName: String,
            date: Date,
            location: String,
            description: String,
            signupLink: String,
        },

        fundraising: {
            goalAmount: Number,
            raisedAmount: Number,
            cause: String,
            endDate: Date,
            donationLink: String,
        },

        realEstateSyndication: {
            propertyName: String,
            location: String,
            totalRaise: Number,
            minimumInvestment: Number,
            expectedReturns: String,
            contactEmail: String,
            offeringMemorandumUrl: String,
        },
    },
    {
        timestamps: true,
    }
);

const AnnouncementModel =
    mongoose.models.Announcement ||
    mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);

export default AnnouncementModel;
