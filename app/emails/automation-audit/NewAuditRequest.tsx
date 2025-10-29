// /emails/NewAutomationAuditEmail.tsx
import { brandLogo } from "@/library/brand.const";
import { Html, Heading, Text } from "@react-email/components";
import * as React from "react";

export interface NewAutomationAuditEmailProps {
    // Step 1 — Contact
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    website?: string;

    // Step 2 — Audit Basics
    platforms: ("Instagram" | "Facebook" | "TikTok" | "LinkedIn" | "YouTube" | "Email" | "Website" | "Other")[];
    avgPostsPerWeek?: string;
    hasCRM?: "yes" | "no" | "not_sure";
    tools?: string;

    // Step 3 — Priorities
    goals: (
        | "More inbound leads"
        | "Consistent posting"
        | "Faster follow-up"
        | "Client onboarding automation"
        | "Reporting/analytics"
        | "Reduce manual work"
    )[];
    timeline: "ASAP (this month)" | "30–60 days" | "90 days" | "Exploring";
    budget?: "<$500/mo" | "$500–$1.5k/mo" | "$1.5k–$3k/mo" | "$3k+/mo";
    notes?: string;

    // System
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    referrer?: string;
    submittedAt?: string | Date;
}

const Field: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => {
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) return null;
    return (
        <Text style={{ fontSize: "14px", lineHeight: "1.6", color: "#333", margin: "0 0 6px" }}>
            <strong>{label}:</strong> {value}
        </Text>
    );
};

const PillList: React.FC<{ items?: string[] }> = ({ items }) => {
    if (!items || items.length === 0) return null;
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "8px 0 12px" }}>
            {items.map((i) => (
                <span
                    key={i}
                    style={{
                        display: "inline-block",
                        fontSize: "12px",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        background: "#0000000F",
                        border: "1px solid #0000001A",
                    }}
                >
                    {i}
                </span>
            ))}
        </div>
    );
};

const fmtDate = (d?: string | Date) => (d ? new Date(d).toLocaleString() : undefined);

const NewAutomationAuditEmail: React.FC<NewAutomationAuditEmailProps> = ({
    fullName = "Jane Founder",
    email = "jane@example.com",
    phone = "(555) 555-5555",
    company = "Acme Co",
    website = "https://acme.example",
    platforms = ["Instagram", "LinkedIn"],
    avgPostsPerWeek = "3",
    hasCRM = "not_sure",
    tools = "Buffer, Airtable",
    goals = ["More inbound leads", "Consistent posting"],
    timeline = "Exploring",
    budget = "$500–$1.5k/mo",
    notes = "We’re trying to get consistent and convert more inbound.",
    utm_source,
    utm_medium,
    utm_campaign,
    referrer,
    submittedAt,
}) => {
    return (
        <Html>
            <div
                style={{
                    fontFamily: "sans-serif",
                    padding: "40px",
                    backgroundColor: "#f5f5f5",
                    backgroundImage: `url(${brandLogo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    textAlign: "left",
                }}
            >
                <div style={{ maxWidth: "640px", margin: "0 auto" }}>
                    <Heading as="h2" style={{ color: "#60abe4", marginTop: 0 }}>
                        New Automation Audit Request
                    </Heading>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                        A new Automation &amp; Social Audit request was submitted{fmtDate(submittedAt) ? ` on ${fmtDate(submittedAt)}` : ""}.
                        Below are the details.
                    </Text>

                    {/* Contact */}
                    <Heading as="h3" style={{ fontSize: "18px", color: "#111", margin: "18px 0 8px" }}>
                        Contact
                    </Heading>
                    <Field label="Full name" value={fullName} />
                    <Field label="Email" value={email} />
                    <Field label="Phone" value={phone} />
                    <Field label="Company" value={company} />
                    <Field label="Website" value={website} />

                    {/* Audit Basics */}
                    <Heading as="h3" style={{ fontSize: "18px", color: "#111", margin: "18px 0 8px" }}>
                        Audit Basics
                    </Heading>
                    <Field label="Avg. posts per week" value={avgPostsPerWeek} />
                    <Field label="Uses a CRM" value={hasCRM} />
                    <Field label="Tools in use" value={tools} />
                    <Text style={{ fontSize: "14px", lineHeight: "1.6", color: "#333", margin: "0 0 6px" }}>
                        <strong>Active platforms:</strong>
                    </Text>
                    <PillList items={platforms} />

                    {/* Priorities */}
                    <Heading as="h3" style={{ fontSize: "18px", color: "#111", margin: "18px 0 8px" }}>
                        Priorities
                    </Heading>
                    <Text style={{ fontSize: "14px", lineHeight: "1.6", color: "#333", margin: "0 0 6px" }}>
                        <strong>Top goals:</strong>
                    </Text>
                    <PillList items={goals} />
                    <Field label="Timeline" value={timeline} />
                    <Field label="Budget" value={budget} />
                    <Field label="Notes" value={notes} />

                    {/* Attribution */}
                    {(utm_source || utm_medium || utm_campaign || referrer) && (
                        <>
                            <Heading as="h3" style={{ fontSize: "18px", color: "#111", margin: "18px 0 8px" }}>
                                Source &amp; Attribution
                            </Heading>
                            <Field label="UTM Source" value={utm_source} />
                            <Field label="UTM Medium" value={utm_medium} />
                            <Field label="UTM Campaign" value={utm_campaign} />
                            <Field label="Referrer" value={referrer} />
                        </>
                    )}

                    <Text style={{ fontSize: "12px", color: "#888", marginTop: "18px" }}>
                        Internal notification • Reply to this email to follow up.
                    </Text>
                </div>
            </div>
        </Html>
    );
};

export default NewAutomationAuditEmail;
