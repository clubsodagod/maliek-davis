"use client";

import { CaseStudyDocumentType } from '@/app/technology/portfolio/_library/copy.const';
import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import slugify from 'slugify';
import { useMediaQuery, } from '@mui/material';


const StrategiesInActionCard: React.FC<{
    caseStudy: CaseStudyDocumentType;
    open: boolean;
    index: number;
}> = ({ caseStudy, open }) => {


    const [expanded, setExpanded] = useState(false);
    const isMobile = useMediaQuery(`(max-width:768px)`)

    const springTransition = {
        type: "spring",
        stiffness: 80,
        damping: 15,
        bounce: 0.25,
        duration: 0.6,
    };

    return (
        <ComponentTransition id={`${caseStudy.title}-transition-card`}>
            <MotionDiv
                className="caseStudy-card overflow-hidden rounded-t-4xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: open ? 1 : 1, y: open ? 0 : 0, scale: open ? 1 : 1.03 }}
                exit={{ opacity: 0, y: 10 }}
                transition={springTransition}
                style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: "1px -6px 8px  #17171747",
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold" className="pt-2 pl-3 cursor-pointer">
                    {caseStudy.title}
                </Typography>

                {open && (
                    <MotionDiv
                        className="md:flex gap-6 md:justify-center md:items-start py-6 2xl:gap-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ ...springTransition, delay: 0.1 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Left Column – Media */}
                        <div
                            className='h-full flex flex-col   md:justify-start'
                        >
                            <MotionDiv
                                className="flex my-4 w-full h-full justify-center  md:justify-start"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ ...springTransition, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-[30vh] h-[30vh] md:w-[300px] md:h-[300px]  xl:w-full xl:h-full rounded-4xl">
                                    <Image
                                        alt={`${caseStudy.title} featured photo`}
                                        src={caseStudy.featuredImg.mobile}
                                        sizes="100vw"
                                        width={300}
                                        height={300}
                                        style={{
                                            objectFit: "cover",
                                        }}
                                        className="w-full h-full rounded-4xl"
                                    />
                                </div>
                            </MotionDiv>

                            {/* Action Buttons */}
                            {!isMobile ? (
                                <MotionDiv
                                    className="flex flex-wrap gap-3 justify-center mt-6"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ ...springTransition, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <Link href={`/real-estate/case-studies/${slugify(caseStudy.title.toLowerCase())}`}>
                                        <Button variant="contained">View Full Case</Button>
                                    </Link>

                                    <Link href={`/real-estate/prestige-partners/landing-page`}>
                                        <Button variant="outlined">Become A Prestige Partner</Button>
                                    </Link>
                                </MotionDiv>
                            ) : null}

                        </div>


                        {/* Right Column – Details */}
                        <MotionDiv
                            className="flex flex-col justify-start my-4 gap-4 md:text-left md:max-w-1/3"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ ...springTransition, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            {caseStudy.address && (
                                <Typography variant="body2" className="text-gray-500 uppercase tracking-widest">
                                    {caseStudy.address}
                                </Typography>
                            )}

                            <Typography variant="body1">{caseStudy.summary}</Typography>

                            <div>
                                <Typography variant="subtitle2" fontWeight="medium">Objectives:</Typography>
                                <ul className="list-disc ml-4 mt-1 text-sm">
                                    {caseStudy.objectives.map((obj, idx) => (
                                        <li key={idx}>{obj}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <Typography variant="subtitle2" fontWeight="medium">Outcome:</Typography>
                                <Typography variant="body2" className="text-green-600 font-semibold">
                                    ${caseStudy.outcomes.valueGenerated.toLocaleString()} value generated
                                </Typography>
                                <Typography variant="body2" className="italic">
                                    {caseStudy.outcomes.technicalImpact}
                                </Typography>
                            </div>

                            {/* Expand Toggle */}
                            <Button
                                variant="text"
                                onClick={() => setExpanded(prev => !prev)}
                                className="text-left px-0"
                            >
                                {expanded ? 'Collapse Details ▲' : 'Expand Details ▼'}
                            </Button>

                            {expanded && (
                                <MotionDiv
                                    className="flex flex-col gap-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ ...springTransition, delay: 0.1 }}
                                >
                                    <div>
                                        <Typography variant="subtitle2" fontWeight="medium">Challenges:</Typography>
                                        <ul className="list-disc ml-4 mt-1 text-sm">
                                            {caseStudy.challenges.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <Typography variant="subtitle2" fontWeight="medium">Solutions:</Typography>
                                        <ul className="list-disc ml-4 mt-1 text-sm">
                                            {caseStudy.solutions.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <Typography variant="subtitle2" fontWeight="medium">Project Photos:</Typography>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            {caseStudy.photos.map((src, idx) => (
                                                <Image
                                                    key={idx}
                                                    src={src}
                                                    alt={`Project photo ${idx + 1}`}
                                                    width={200}
                                                    height={120}
                                                    className="rounded-xl object-cover w-full h-[120px]"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <Typography variant="subtitle2" fontWeight="medium">Video Overview:</Typography>
                                        <video
                                            src={caseStudy.featuredVideo.desktop}
                                            controls
                                            className="w-full rounded-xl mt-2"
                                        />
                                    </div>
                                </MotionDiv>
                            )}

                            {isMobile && (
                                <MotionDiv
                                    className="flex flex-wrap gap-3 justify-center md:justify-start mt-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ ...springTransition, delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <Link href={`/real-estate/case-studies/${slugify(caseStudy.title.toLowerCase())}`}>
                                        <Button variant="contained">View Full Case</Button>
                                    </Link>

                                    <Link href={`/real-estate/prestige-partners/landing-page`}>
                                        <Button variant="outlined">Become A Prestige Partner</Button>
                                    </Link>
                                </MotionDiv>
                            )}

                        </MotionDiv>
                    </MotionDiv>
                )}
            </MotionDiv>
        </ComponentTransition>
    );
};

export default StrategiesInActionCard;
