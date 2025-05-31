"use client"

import { AdminSection, adminSections } from '@/app/admin/_library/copy.const';
import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'


interface AdminSectionCardProps {
    section: AdminSection;
}

const AdminSectionCard: React.FC<AdminSectionCardProps> = ({ section }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(section.path);
    };

    return (
        <ComponentTransition id={`${section.name}-transition-card`}>
            <MotionDiv
                onClick={handleClick}
                className="investment-card overflow-hidden rounded-t-4xl md:rounded-4xl flex flex-col justify-between p-6 w-full md:max-w-[350px] min-h-[375px] max-h-[435px] cursor-pointer bg-(--background)  transition-transform hover:scale-[1.01]"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "anticipate" }}
                style={{
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow: "1px -6px 8px #17171747",
                }}
            >
                        <Typography component="div" variant="h3" className="text-xl font-semibold text-(--foreground)">
                            {section.label}
                        </Typography>
                        <Typography variant="subtitle1" fontSize={{sm:"1.5rem"}} className="text-sm text-(--foreground)">
                            {section.description}
                        </Typography >


            </MotionDiv>
        </ComponentTransition>
    );
};


const AdminSectionCards = ({ }) => {

    return (
        <MotionDiv
            className='w-full h-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-12'
        >
            {
                adminSections.map((s, i) => {
                    return (
                        <AdminSectionCard
                            key={`${s.name} : ${i}`}
                            section={s}
                        />
                    )
                })
            }
        </MotionDiv>
    )
}



export default AdminSectionCards;

