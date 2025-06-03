import { brandLogo } from "@/library/brand.const";
import { Html, Heading, Text, Img } from "@react-email/components";
import * as React from "react";

interface IInvestmentOpportunity {
    category: string;
    dealSummary: string;
    location?: string;
    minInvestment?: number;
    projectedReturns?: string;
    deadline?: Date;
    linkToMoreInfo?: string;
}

interface ICompletedClientProject {
    clientName: string;
    projectName: string;
    technologiesUsed: string[];
    summary: string;
    caseStudyLink?: string;
    projectUrl?: string;
}

interface INewSocialContent {
    platform: string;
    postTitle: string;
    postUrl: string;
    tags?: string[];
}

interface AnnouncementEmailProps {
    title: string;
    description: string;
    image?: string;
    type: string;
    investmentOpportunity?: IInvestmentOpportunity|undefined;
    completedClientProject?: ICompletedClientProject|undefined;
    newSocialContent?: INewSocialContent|undefined;
}

const AnnouncementEmail: React.FC<AnnouncementEmailProps> = ({
    title,
    description,
    image,
    investmentOpportunity ,
    completedClientProject,
    newSocialContent
}) => {
    return (
        <Html>
            <div
                style={{
                    fontFamily: "sans-serif",
                    padding: "40px",
                    position: "relative",
                    textAlign: "left",
                    backgroundColor: "#00000017",
                    zIndex: -1,
                    backgroundImage: `url(${brandLogo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                }}
            >
                <div style={{  fontFamily: "sans-serif"  }}>
                    <Heading as="h2" style={{ color: '#60abe4' }}>{title}</Heading>
                    {image && (
                        <Img src={image} alt="Announcement image" style={{ width: "100%", marginBottom: "20px" }} />
                    )}

                    <Text style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>{description}</Text>

                    {investmentOpportunity && (
                        <Text style={{ fontSize: "16px", color: "#333" }}>
                            <strong>Opportunity Type:</strong> {investmentOpportunity.category}<br />
                            <strong>Summary:</strong> {investmentOpportunity.dealSummary}<br />
                            {investmentOpportunity.location && (<><strong>Location:</strong> {investmentOpportunity.location}<br /></>)}
                            {investmentOpportunity.minInvestment && (<><strong>Minimum Investment:</strong> ${investmentOpportunity.minInvestment}<br /></>)}
                            {investmentOpportunity.projectedReturns && (<><strong>Projected Returns:</strong> {investmentOpportunity.projectedReturns}<br /></>)}
                            {investmentOpportunity.deadline && (<><strong>Deadline:</strong> {new Date(investmentOpportunity.deadline).toLocaleDateString()}<br /></>)}
                            {investmentOpportunity.linkToMoreInfo && (<><strong>More Info:</strong> <a href={investmentOpportunity.linkToMoreInfo}>{investmentOpportunity.linkToMoreInfo}</a><br /></>)}
                        </Text>
                    )}

                    {completedClientProject && (
                        <Text style={{ fontSize: "16px", color: "#333" }}>
                            <strong>Client:</strong> {completedClientProject.clientName}<br />
                            <strong>Project:</strong> {completedClientProject.projectName}<br />
                            <strong>Tech Used:</strong> {completedClientProject.technologiesUsed.join(", ")}<br />
                            <strong>Summary:</strong> {completedClientProject.summary}<br />
                            {completedClientProject.caseStudyLink && (<><strong>Case Study:</strong> <a href={completedClientProject.caseStudyLink}>{completedClientProject.caseStudyLink}</a><br /></>)}
                            {completedClientProject.projectUrl && (<><strong>Project URL:</strong> <a href={completedClientProject.projectUrl}>{completedClientProject.projectUrl}</a><br /></>)}
                        </Text>
                    )}

                    {newSocialContent && (
                        <Text style={{ fontSize: "16px", color: "#333" }}>
                            <strong>Platform:</strong> {newSocialContent.platform}<br />
                            <strong>Title:</strong> {newSocialContent.postTitle}<br />
                            <strong>Watch Now:</strong> <a href={newSocialContent.postUrl}>{newSocialContent.postUrl}</a><br />
                            {Array.isArray(newSocialContent.tags) && newSocialContent.tags.length > 0 && (
                                <><strong>Tags:</strong> {newSocialContent.tags.join(", ")}<br /></>
                            )}
                        </Text>
                    )}
                </div>
            </div>

        </Html>
    );
};

export default AnnouncementEmail;
