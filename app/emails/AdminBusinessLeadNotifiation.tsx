import { IBusinessLeadCaptureFormClient } from "@/database/models/business-cta-forms.model";
import { Html, Heading, Text } from "@react-email/components";
import * as React from "react";

const AdminNotificationEmail: React.FC<{ data: IBusinessLeadCaptureFormClient }> = ({ data }) => {
    return (
        <Html>
            <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#fff" }}>
                <Heading as="h2" style={{ color: "#000" }}>New Business Inquiry Received</Heading>
                <Text style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
                    <strong>Name:</strong> {data.name}<br />
                    <strong>Email:</strong> {data.email}<br />
                    <strong>Phone:</strong> {data.phone || "N/A"}<br />
                    <strong>Type:</strong> {data.type}<br />
                    <strong>Message:</strong> {data.message || "(none)"}<br />
                    <br />
                    <strong>Business Name:</strong> {data.businessName || "N/A"}<br />
                    <strong>Website:</strong> {data.website || "N/A"}<br />
                    <strong>Industry:</strong> {data.industry || "N/A"}
                </Text>

                {data.type === "business_planning" && (
                    <Text style={{ fontSize: "16px", color: "#333" }}>
                        <strong>Stage:</strong> {data.businessStage}<br />
                        <strong>Funding:</strong> {data.fundingStatus}<br />
                        <strong>Goals:</strong> {data.businessGoals}
                    </Text>
                )}

                {data.type === "ai_automation" && (
                    <Text style={{ fontSize: "16px", color: "#333" }}>
                        <strong>Current Tools:</strong> {data.currentTools}<br />
                        <strong>Workflow Pain Points:</strong> {data.workflowPainPoints}<br />
                        <strong>Automation Goals:</strong> {data.automationGoals}
                    </Text>
                )}

                {data.type === "marketing_growth" && (
                    <Text style={{ fontSize: "16px", color: "#333" }}>
                        <strong>Target Audience:</strong> {data.targetAudience}<br />
                        <strong>Channels:</strong> {data.marketingChannels?.join(", ") || "N/A"}<br />
                        <strong>Budget:</strong> {data.monthlyMarketingBudget}<br />
                        <strong>Growth Goals:</strong> {data.growthGoals}
                    </Text>
                )}

                {data.type === "digital_presence" && (
                    <Text style={{ fontSize: "16px", color: "#333" }}>
                        <strong>Existing Platforms:</strong> {data.existingPlatforms?.join(", ") || "N/A"}<br />
                        <strong>Desired Features:</strong> {data.desiredFeatures}<br />
                        <strong>Content Needs:</strong> {data.contentNeeds}<br />
                        <strong>SEO Goals:</strong> {data.seoGoals}
                    </Text>
                )}

                {data.type === "branding" && (
                    <Text style={{ fontSize: "16px", color: "#333" }}>
                        <strong>Branding Goals:</strong> {data.brandingGoals}<br />
                        <strong>Challenges:</strong> {data.brandChallenges}<br />
                        <strong>Budget:</strong> {data.brandBudget}<br />
                        <strong>Assets:</strong> {data.currentBrandAssets}<br />
                        <strong>Timeline:</strong> {data.desiredTimeline}
                    </Text>
                )}
            </div>
        </Html>
    );
};

export default AdminNotificationEmail;