'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState, useTransition } from 'react';
import { Button, Typography, CircularProgress, Skeleton } from '@mui/material';
import toast from 'react-hot-toast';

import { IAnnouncementForm, AnnouncementType } from '@/database/models/announcement.model';
import FormInput from '@/components/FormInput';
import FormTagInput from '@/components/FormTagInput';
import FormSelect from '@/components/FormSelect';
import FormDatePicker from '@/components/FormDatePicker';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { AnnouncementWrapper } from '@/app/admin/_library/admin.types';
import { updateAnnouncement } from '@/utility/fetchers/content-manager.fetcher';
// import { updateAnnouncement } from '@/utility/fetchers/content-manager.fetcher';

interface AnnouncementUpdateFormProps {
    content: AnnouncementWrapper["payload"];
    onSuccess?: () => void;
}

const announcementTypeLabels: Record<AnnouncementType, string> = {
    speaking_engagement: 'Speaking Engagement',
    investment_opportunity: 'Investment Opportunity',
    completed_client_project: 'Completed Client Project',
    new_social_content: 'New Social Content',
    community_service_event: 'Community Service',
    fundraising: 'Fundraising',
    inhouse_app: 'In-House App',
    real_estate_syndication: 'Real Estate Syndication',
};

export default function AnnouncementUpdateForm({ content, onSuccess }: AnnouncementUpdateFormProps) {
    const {
        control,
        handleSubmit,
        reset,
    } = useForm<IAnnouncementForm>();

    const [loadingContent, setLoadingContent] = useState(true);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (content) {
            console.log(content);

            reset({
                ...content,
                investmentOpportunity: content.investmentOpportunity
                    ? {
                        ...content.investmentOpportunity,
                        deadline: content.investmentOpportunity.deadline
                    }
                    : undefined,

                speakingEngagement: content.speakingEngagement
                    ? {
                        ...content.speakingEngagement,
                        date: content.speakingEngagement.date
                            ? new Date(content.speakingEngagement.date)
                            : undefined,
                    }
                    : undefined,

                communityServiceEvent: content.communityServiceEvent
                    ? {
                        ...content.communityServiceEvent,
                        date: content.communityServiceEvent.date
                            ? new Date(content.communityServiceEvent.date)
                            : undefined,
                    }
                    : undefined,

                fundraising: content.fundraising
                    ? {
                        ...content.fundraising,
                        endDate: content.fundraising.endDate
                            ? new Date(content.fundraising.endDate)
                            : undefined,
                    }
                    : undefined,

                inhouseApp: content.inhouseApp
                    ? {
                        ...content.inhouseApp,
                        releaseDate: content.inhouseApp.releaseDate
                            ? new Date(content.inhouseApp.releaseDate)
                            : undefined,
                    }
                    : undefined,
            });

            setLoadingContent(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const handleFinalSubmit = (data: IAnnouncementForm) => {
        startTransition(async () => {
            const result = await updateAnnouncement({
                ...data,
                _id: `${content._id}`
            });

            if (result.success) {
                toast.success('Announcement updated!');
                onSuccess?.();
                reset();
            } else {
                toast.error(result.message || 'Failed to update.');
            }
        });
    };

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mx-auto space-y-6 bg-white/70 backdrop-blur-md rounded-2xl p-6"
        >
            <Typography variant="h5" fontWeight="bold">
                {loadingContent ? <Skeleton width="60%" /> : 'Update Announcement'}
            </Typography>

            {loadingContent ? (
                <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} variant="rounded" height={56} />
                    ))}
                </div>
            ) : (
                <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-4">
                    <FormInput name="title" label="Title" control={control} />
                    <FormInput name="description" label="Description" control={control} multiline rows={4} />
                    <FormInput name="image" label="Image URL (optional)" control={control} />
                    <FormSelect
                        name="type"
                        label="Announcement Type"
                        control={control}
                        options={Object.entries(announcementTypeLabels).map(([value, label]) => ({
                            value,
                            label,
                        }))}
                    />

                    {/* Conditional Fields */}
                    {content.type === 'investment_opportunity' && (
                        <>
                            <FormInput name="investmentOpportunity.dealSummary" label="Deal Summary" control={control} />
                            <FormSelect
                                name="investmentOpportunity.category"
                                label="Category"
                                control={control}
                                options={[
                                    { value: 'real_estate', label: 'Real Estate' },
                                    { value: 'technical_project', label: 'Technical Project' },
                                ]}
                            />
                            <FormInput name="investmentOpportunity.location" label="Location" control={control} />
                            <FormInput name="investmentOpportunity.minInvestment" label="Min Investment" type="number" control={control} />
                            <FormInput name="investmentOpportunity.projectedReturns" label="Projected Returns" control={control} />
                            <FormDatePicker name="investmentOpportunity.deadline" label="Deadline" control={control} />
                            <FormInput name="investmentOpportunity.linkToMoreInfo" label="More Info URL" control={control} />
                        </>
                    )}

                    {content.type === 'completed_client_project' && (
                        <>
                            <FormInput name="completedClientProject.clientName" label="Client Name" control={control} />
                            <FormInput name="completedClientProject.projectName" label="Project Name" control={control} />
                            <FormTagInput name="completedClientProject.technologiesUsed" label="Technologies Used" control={control} />
                            <FormInput name="completedClientProject.summary" label="Summary" control={control} multiline rows={3} />
                            <FormInput name="completedClientProject.caseStudyLink" label="Case Study Link" control={control} />
                            <FormInput name="completedClientProject.projectUrl" label="Project URL" control={control} />
                        </>
                    )}

                    {content.type === 'new_social_content' && (
                        <>
                            <FormInput name="newSocialContent.platform" label="Platform" control={control} />
                            <FormInput name="newSocialContent.postTitle" label="Post Title" control={control} />
                            <FormInput name="newSocialContent.postUrl" label="Post URL" control={control} />
                            <FormTagInput name="newSocialContent.tags" label="Tags" control={control} />
                        </>
                    )}

                    {/* Add additional dynamic fields for other types as needed */}

                    <MotionDiv
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="pt-4"
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isPending}
                            fullWidth
                            endIcon={isPending && <CircularProgress size={20} />}
                        >
                            {isPending ? 'Updating...' : 'Update Announcement'}
                        </Button>
                    </MotionDiv>
                </form>
            )}
        </MotionDiv>
    );
}
