import { IAnnouncement } from '@/database/models/announcement.model';
import { getAnnouncementBySlug, getAnnouncements } from '@/utility/fetchers/content-manager.fetcher';
import React from 'react'
import { AnnouncementDisplay } from '../_components/AnnouncementsDisplay';

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
    const announcements = await getAnnouncements() as unknown as IAnnouncement[];

    return announcements.map((post) => ({
        slug: post.slug,
    }))
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug: postSlug } = await params

    const announcement: IAnnouncement | null = await getAnnouncementBySlug(postSlug);
    console.log(announcement);
    
    return (
        <>
            <AnnouncementDisplay 
                announcement={announcement}
            />
        </>
    )
}

