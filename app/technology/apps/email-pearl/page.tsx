/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import EmailTemplateSelector, { EmailTemplate } from "./_components/EmailTemplateSelector";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import TemplateRenderer from "./_components/TemplateRenderer";
import { PropertyInterestEmailProps } from "@/app/emails/web-render/PropertyInterestEmail";

export default function EmailPearlPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
    const [templateProps, setTemplateProps] = useState<PropertyInterestEmailProps | null>(null);



    return (
        <SectionWrapper>
            <main className="max-w-3xl mx-auto p-6">
                {!selectedTemplate ? (
                    <EmailTemplateSelector onSelect={setSelectedTemplate} />
                ) : (
                    <TemplateRenderer selectedTemplate={selectedTemplate} props={templateProps} />
                )}
            </main>
        </SectionWrapper>
    );
}
