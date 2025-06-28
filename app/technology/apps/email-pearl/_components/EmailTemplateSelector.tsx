"use client";

import { useState, useEffect } from "react";
import { COMPONENT_MAP } from "../_library/templates.const";

export interface EmailTemplate {
    _id: string;
    name: string;
    subject: string;
    componentSource: string;
    requiredFields: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component: React.FC<any>; // <-- include component reference
}

export default function EmailTemplateSelector({
    onSelect,
}: {
    onSelect: (template: EmailTemplate) => void;
}) {
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTemplates(COMPONENT_MAP);
        setLoading(false);
    }, []);

    if (loading) return <p>Loading templates...</p>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Choose an Email Template</h2>
            <div className="grid gap-4">
                {templates.map((template) => (
                    <div
                        key={template._id}
                        className="border rounded p-4 shadow hover:border-blue-500"
                    >
                        <h3 className="text-lg font-semibold">{template.name}</h3>
                        <p className="text-gray-600">Subject: {template.subject}</p>
                        <div className="mt-2">
                            <button className="btn" onClick={() => onSelect(template)}>
                                Select Template
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
