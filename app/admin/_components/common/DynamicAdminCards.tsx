'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@mui/material';
import { AdminSection } from '@/app/admin/_library/copy.const';
import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';

export interface AdminSectionCardProps {
    section: AdminSection;
}

/**
 * Renders a single admin action card (e.g., "Create Post", "Manage Tags").
 *
 * @param section - A subsection containing label, path, and description.
 */
const AdminActionCard: React.FC<AdminSectionCardProps> = ({ section }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(section.path);
    };

    return (
        <ComponentTransition id={`${section.name}-transition-card`}>
            <MotionDiv
                onClick={handleClick}
                className="investment-card overflow-hidden rounded-t-4xl md:rounded-4xl flex flex-col justify-between p-6 w-full md:max-w-[350px] min-h-[375px] max-h-[435px] cursor-pointer bg-(--background) transition-transform hover:scale-[1.01]"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3, ease: 'anticipate' }}
                style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: '1px -6px 8px #17171747',
                }}
            >
                <Typography
                    component="div"
                    variant="h3"
                    className="text-xl font-semibold text-(--foreground)"
                >
                    {section.label}
                </Typography>

                <Typography
                    variant="subtitle1"
                    fontSize={{ sm: '1.5rem' }}
                    className="text-sm text-(--foreground)"
                >
                    {section.description}
                </Typography>
            </MotionDiv>
        </ComponentTransition>
    );
};

export interface DynamicAdminCardsProps {
    /**
     * A list of third-level admin actions (i.e., subSections inside a section).
     */
    actions: AdminSection[];
}

/**
 * Renders a dynamic grid of admin cards for a selected admin module.
 *
 * @param actions - An array of AdminSection items representing actions (e.g., "Create Blog", "Manage Announcements").
 */
const DynamicAdminCards: React.FC<DynamicAdminCardsProps> = ({ actions }) => {
    return (
        <MotionDiv className="w-full h-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-12">
            {actions.map((section, index) => (
                <AdminActionCard key={`${section.name}:${index}`} section={section} />
            ))}
        </MotionDiv>
    );
};

export default DynamicAdminCards;
