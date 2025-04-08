/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { MotionDiv } from '@/components/motion/MotionDiv';
import { Typography, Button, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { CaseStudyDocumentType } from '../_library/copy.const';

interface PortfolioCaseStudyCardProps {
    caseStudy: CaseStudyDocumentType;
    index: number;
    currentScreen: 'mobile' | 'tablet' | 'desktop';
    setDevice: (device: 'mobile' | 'tablet' | 'desktop') => void;
}

const PortfolioCaseStudyCard: React.FC<PortfolioCaseStudyCardProps> = ({
    caseStudy,
    index,
    currentScreen, 
    setDevice
}) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'anticipate' }}
            className=" w-full flex flex-col p-6 grow rounded-t-4xl gap-8 bg-(--background)"
            style={{
                boxShadow: '1px -6px 8px #17171747'
            }}
        >
            {/* Preview Images */}
            <MotionDiv className="h-full w-full flex gap-6 justify-center">
                {viewOptions.map((option, i) => (
                    <div
                        key={`${option.label}-${i}`}
                        className="flex-1/3 flex flex-col justify-center items-center gap-2"
                        onClick={()=>{setDevice(option.label.toLowerCase() as 'mobile' | 'tablet' | 'desktop')}}
                    >
                        <Image
                            src={option.photo}
                            alt={`${option.label} preview`}
                            width={9}
                            height={16}
                            sizes="100vw"
                            className="rounded-xl object-contain w-[50px] h-[50px]"
                        />
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            className="w-full text-center"
                        >
                            {option.label}
                        </Typography>
                    </div>
                ))}
            </MotionDiv>

            {/* Title & Summary */}
            <div className="w-full flex flex-col gap-3">
                <Typography variant="h5" fontWeight="500">
                    {caseStudy.title}
                </Typography>
                <Typography variant="body1" fontWeight="400">
                    {caseStudy.summary}
                </Typography>
            </div>

            {/* Expanded Details */}
            {expanded && (
                <div className="w-full flex flex-col gap-4 text-sm mt-4">
                    <SectionBlock title="Objectives" items={caseStudy.objectives} />
                    <SectionBlock title="Challenges" items={caseStudy.challenges} />
                    <SectionBlock title="Solutions" items={caseStudy.solutions} />
                    <div className="flex flex-col gap-2">
                        <Typography variant="subtitle2" fontWeight="bold">
                            Outcome
                        </Typography>
                        <Typography variant="body2">{caseStudy.outcomes.description}</Typography>
                        {caseStudy.outcomes.valueGenerated > 0 && (
                            <Typography variant="body2">
                                💰 Value Generated: ${caseStudy.outcomes.valueGenerated.toLocaleString()}
                            </Typography>
                        )}
                        {caseStudy.outcomes.technicalImpact && (
                            <Typography variant="body2">
                                ⚙️ Technical Impact: {caseStudy.outcomes.technicalImpact}
                            </Typography>
                        )}
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <Button variant="text" onClick={() => setExpanded(!expanded)}>
                {expanded ? 'Show less' : 'See more...'}
            </Button>
        </MotionDiv>
    );
};

export default PortfolioCaseStudyCard;

// 👇 SectionBlock helper component
const SectionBlock: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <div className="flex flex-col gap-1">
        <Typography variant="subtitle2" fontWeight="bold">
            {title}
        </Typography>
        <ul className="list-disc list-inside text-sm pl-4">
            {items.map((item, i) => (
                <li key={`${title}-${i}`}>{item}</li>
            ))}
        </ul>
    </div>
);

// 👇 View option thumbnails
export const viewOptions: { label: string; photo: string }[] = [
    {
        label: 'Mobile',
        photo: 'https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586751/Convert_to_PNG_project_18_nvj7lv.png'
    },
    {
        label: 'Tablet',
        photo: 'https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586751/Convert_to_PNG_project_19_m2mews.png'
    },
    {
        label: 'Desktop',
        photo: 'https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586751/Convert_to_PNG_project_20_pkqljv.png'
    }
];
