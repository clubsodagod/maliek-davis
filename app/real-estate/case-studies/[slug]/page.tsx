import React from 'react'


export const dynamic = "force-static";
export const dynamicParams = false;


export default async function DynamicCaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    // Here you would typically fetch the case study data based on the slug
    // For example:
    // const caseStudy = await getCaseStudyBySlug(slug);

    return (
        <div>
            <h1>Case Study: {slug}</h1>
            {/* Render case study content here */}
        </div>
    );
}