"use client";
import React from "react";
import Image from "next/image";
import { IAnnouncement } from "@/database/models/announcement.model";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

interface Props {
    announcement: IAnnouncement | null;
}

export const AnnouncementDisplay: React.FC<Props> = ({ announcement }) => {
    if (!announcement) {
        return (
            <SectionWrapper>
                <div className="max-w-3xl mx-auto px-4 py-10 text-center text-gray-500">
                    <p>No announcement found.</p>
                </div>
            </SectionWrapper>
        );
    }

    const {
        title,
        description,
        image,
        type,
        investmentOpportunity,
        completedClientProject,
        newSocialContent,
    } = announcement;

    return (
        <SectionWrapper>
            <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
                <h1 className="text-3xl font-bold">{title}</h1>

                {image && (
                    <Image
                        src={image}
                        alt="Announcement Image"
                        width={800}
                        height={400}
                        className="rounded shadow-md w-full h-auto"
                    />
                )}

                <p className="text-lg text-gray-700">{description}</p>

                {type === "investment_opportunity" && investmentOpportunity && (
                    <section className="space-y-2 border-t pt-6">
                        <h2 className="text-xl font-semibold">Investment Opportunity</h2>
                        <p><strong>Category:</strong> {investmentOpportunity.category}</p>
                        <p><strong>Summary:</strong> {investmentOpportunity.dealSummary}</p>
                        {investmentOpportunity.location && <p><strong>Location:</strong> {investmentOpportunity.location}</p>}
                        {investmentOpportunity.minInvestment && <p><strong>Min Investment:</strong> ${investmentOpportunity.minInvestment}</p>}
                        {investmentOpportunity.projectedReturns && <p><strong>Returns:</strong> {investmentOpportunity.projectedReturns}</p>}
                        {investmentOpportunity.deadline && <p><strong>Deadline:</strong> {new Date(investmentOpportunity.deadline).toLocaleDateString()}</p>}
                        {investmentOpportunity.linkToMoreInfo && (
                            <p><a className="text-blue-600 underline" href={investmentOpportunity.linkToMoreInfo} target="_blank" rel="noopener noreferrer">More Info</a></p>
                        )}
                    </section>
                )}

                {type === "completed_client_project" && completedClientProject && (
                    <section className="space-y-2 border-t pt-6">
                        <h2 className="text-xl font-semibold">Completed Client Project</h2>
                        <p><strong>Client:</strong> {completedClientProject.clientName}</p>
                        <p><strong>Project:</strong> {completedClientProject.projectName}</p>
                        <p><strong>Technologies:</strong> {completedClientProject.technologiesUsed.join(", ")}</p>
                        <p><strong>Summary:</strong> {completedClientProject.summary}</p>
                        {completedClientProject.caseStudyLink && (
                            <p><a className="text-blue-600 underline" href={completedClientProject.caseStudyLink}>Case Study</a></p>
                        )}
                        {completedClientProject.caseStudyLink && (
                            <p><a className="text-blue-600 underline" href={completedClientProject.caseStudyLink}>Project URL</a></p>
                        )}
                    </section>
                )}

                {type === "new_social_content" && newSocialContent && (
                    <section className="space-y-2 border-t pt-6">
                        <h2 className="text-xl font-semibold">New Social Content</h2>
                        <p><strong>Platform:</strong> {newSocialContent.platform}</p>
                        <p><strong>Post Title:</strong> {newSocialContent.postTitle}</p>
                        <p><a className="text-blue-600 underline" href={newSocialContent.postUrl}>View Post</a></p>
                        {newSocialContent.tags && (
                            <p><strong>Tags:</strong> {newSocialContent.tags.join(", ")}</p>
                        )}
                    </section>
                )}
            </div>
        </SectionWrapper>
    );
};
