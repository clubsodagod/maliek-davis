"use client";

import React from "react";
import { EmailTemplate } from "../_components/EmailTemplateSelector";
import { PropertyInterestEmailProps } from "@/app/emails/PropertyInterestEmail";

interface TemplateRendererProps {
    selectedTemplate: EmailTemplate;
    props: PropertyInterestEmailProps|null;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({
    selectedTemplate,
    props,
}) => {
    const TemplateComponent = selectedTemplate.Component;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold mb-2">
                Template Selected: {selectedTemplate.name}
            </h2>

            <div className="border p-4 bg-white rounded min-h-[40vh]">
                <TemplateComponent {...props} />
            </div>
        </div>
    );
};

export default TemplateRenderer;
