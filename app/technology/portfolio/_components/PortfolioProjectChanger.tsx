"use client";

import React from "react";
import Image from "next/image";
import { CaseStudyDocumentType } from "../_library/copy.const";
import { Typography } from "@mui/material";

interface PortfolioProjectChangerProps {
    caseStudies: CaseStudyDocumentType[];
    setPortfolio: (index: number) => void;
    currentIndex: number;
}

const PortfolioProjectChanger: React.FC<PortfolioProjectChangerProps> = ({
    caseStudies,
    setPortfolio,
    currentIndex
}) => {
    return (
        <div className="w-full flex">
            <div className="min-w-fit pr-2 flex flex-col max-h-[37vh] overflow-y-auto gap-4 items-center  rounded-xl">
                {caseStudies.map((study, index) => (
                    <div
                        key={study.title}
                        className="relative"
                    >
                        <button
                            onClick={() => setPortfolio(index)}
                            className={`w-[85px] min-h-[85px] rounded-xl overflow-hidden shadow-lg border-2 ${currentIndex === index ? "border-primary" : "border-transparent"} transition-all duration-200 hover:scale-105`}
                            title={study.title}
                        >
                            <Image
                                src={study.logo}
                                alt={`${study.title} logo`}
                                width={75}
                                height={75}
                                className="object-cover w-[85px] h-[85px]  rounded-2xl"
                            />
                        </button>
                        <div
                            className={`absolute top-0 h-full w-full flex justify-center items-end pb-2 pointer-events-auto`} 
                            onClick={() => setPortfolio(index)}
                        >

                            <Typography className="w-full text-center" variant="caption"  color={currentIndex === index ? "secondary.light" : "#fafafa"} >
                                {study.title}
                            </Typography>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PortfolioProjectChanger;
