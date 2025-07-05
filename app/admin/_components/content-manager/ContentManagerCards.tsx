"use client"

import { AdminSection, adminSections } from '@/app/admin/_library/copy.const';
import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'


interface AdminSectionCardProps {
    section: AdminSection;
}

export const ContentManagerCard: React.FC<AdminSectionCardProps> = ({ section }) => {
    const [hovered, setHovered] = React.useState(false);


    return (
        <ComponentTransition id={`${section.name}-transition-card`}>
            <Link href={section.path} className="w-full h-full">
                <MotionDiv
                    className="investment-card overflow-hidden rounded-t-4xl md:rounded-4xl flex flex-col justify-between p-6 w-full md:max-w-[350px] min-h-[325px] max-h-[335px] cursor-pointer bg-(--foreground) text-(--background)  transition-transform hover:scale-[1.01]"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 20 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: "anticipate" }}
                    style={{
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        boxShadow: "1px -6px 8px #17171747",
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <Typography component="div" variant="h4" fontSize={{ sm: "2rem", lg: "2rem" }}
                        className={`font-semibold text-[var(--background)] ${hovered ? "animate-gradient" : ""}`}
                    >
                        {section.label}
                    </Typography>
                    <Typography variant="subtitle1" fontSize={{ sm: "1.15rem" }} className="text-sm text-(--background)">
                        {section.description}
                    </Typography >


                </MotionDiv>
            </Link>

        </ComponentTransition>
    );
};


const ContentManagerCards = ({ }) => {

    return (
        <MotionDiv
            className='w-full h-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-12'
        >
            {
                adminSections[0]?.subSections?.map((s, i) => {
                    return (
                        <ContentManagerCard
                            key={`${s.name} : ${i}`}
                            section={s}
                        />
                    )
                })
            }
        </MotionDiv>
    )
}



export default ContentManagerCards;

