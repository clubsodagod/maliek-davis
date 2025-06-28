'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState, useTransition } from 'react';
import { Button, Typography, CircularProgress, Skeleton } from '@mui/material';
import toast from 'react-hot-toast';

import { ICaseStudyForm, CaseStudyDocument } from '@/database/models/case-study.model';
import { MotionDiv } from '@/components/motion/MotionDiv';
import FormInput from '@/components/FormInput';
import FormTagInput from '@/components/FormTagInput';
import FormSelect from '@/components/FormSelect';
import { updateCaseStudy } from '@/utility/fetchers/content-manager.fetcher';

interface CaseStudyUpdateFormProps {
    content: CaseStudyDocument;
    onSuccess?: () => void;
}

export default function CaseStudyUpdateForm({ content, onSuccess }: CaseStudyUpdateFormProps) {
    const {
        control,
        handleSubmit,
        reset,
    } = useForm<ICaseStudyForm>();

    const [loadingContent, setLoadingContent] = useState(true);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (content) {
            reset({
                ...content,
            });
            setLoadingContent(false);
        }
    }, [content, reset]);

    const handleFinalSubmit = (data: ICaseStudyForm) => {
        startTransition(async () => {
            const result = await updateCaseStudy({
                ...data,
                _id: `${content._id}`,
            });

            if (result.success) {
                toast.success('Case Study updated!');
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
            className="max-w-2xl mx-auto space-y-6 bg-white/70 backdrop-blur-md rounded-2xl p-6"
        >
            <Typography variant="h5" fontWeight="bold">
                {loadingContent ? <Skeleton width="60%" /> : 'Update Case Study'}
            </Typography>

            {loadingContent ? (
                <div className="space-y-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} variant="rounded" height={56} />
                    ))}
                </div>
            ) : (
                <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-4">
                    <FormInput name="title" label="Title" control={control} />
                    <FormSelect
                        name="type"
                        label="Case Study Type"
                        control={control}
                        options={[
                            { value: 'TechnicalApplication', label: 'Technical Application' },
                            { value: 'Property', label: 'Property' },
                        ]}
                    />
                    <FormInput name="summary" label="Summary" control={control} multiline rows={3} />
                    <FormInput name="featuredImg.url" label="Featured Image URL" control={control} />
                    <FormInput name="featuredImg.alt" label="Featured Image Alt" control={control} />
                    <FormInput name="featuredVideo.url" label="Featured Video URL" control={control} />
                    <FormInput name="featuredVideo.alt" label="Featured Video Alt" control={control} />
                    <FormInput name="logo" label="Logo URL" control={control} />
                    <FormTagInput name="photos" label="Photos (URLs)" control={control} />
                    <FormTagInput name="objectives" label="Objectives" control={control} />
                    <FormTagInput name="challenges" label="Challenges" control={control} />
                    <FormTagInput name="solutions" label="Solutions" control={control} />
                    <FormInput name="outcomes.description" label="Outcome Description" control={control} multiline rows={3} />
                    <FormInput name="outcomes.valueGenerated" label="Value Generated ($)" type="number" control={control} />
                    <FormInput name="outcomes.technicalImpact" label="Technical Impact" control={control} />

                    {/* Show address only if type is Property */}
                    {content.type === 'Property' && (
                        <FormInput name="address" label="Property Address" control={control} />
                    )}

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
                            {isPending ? 'Updating...' : 'Update Case Study'}
                        </Button>
                    </MotionDiv>
                </form>
            )}
        </MotionDiv>
    );
}
