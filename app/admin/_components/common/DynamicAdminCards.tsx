'use client';

import React from 'react';
import { AdminSection } from '@/app/admin/_library/copy.const';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { ContentManagerCard } from '../content-manager/ContentManagerCards';

export interface AdminSectionCardProps {
    section: AdminSection;
}


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
                <ContentManagerCard key={`${section.name}:${index}`} section={section} />
            ))}
        </MotionDiv>
    );
};

export default DynamicAdminCards;
