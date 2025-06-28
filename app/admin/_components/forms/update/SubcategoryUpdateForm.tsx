'use client';

import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { Button, Typography, CircularProgress, Skeleton } from "@mui/material";
import toast from "react-hot-toast";

import { ISubcategoryForm } from "@/database/models/subcategory.model";
import FormInput from "@/components/FormInput";
import { MotionDiv } from "@/components/motion/MotionDiv";
import { updateSubcategory } from "@/utility/fetchers/content-manager.fetcher";

interface SubcategoryUpdateFormProps {
    content: ISubcategoryForm;
    onSuccess?: () => void;
}

export function SubcategoryUpdateForm({ content, onSuccess }: SubcategoryUpdateFormProps) {
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ISubcategoryForm>({
        defaultValues: {
            name: "",
            tagline: "",
            description: "",
            photo: "",
            video: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const [loadingContent, setLoadingContent] = useState(true);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (content) {
            Object.entries(content).forEach(([key, value]) => {
                setValue(key as keyof ISubcategoryForm, value);
            });
            setLoadingContent(false);
        }
    }, [content, setValue]);

    const handleFinalSubmit = (data: ISubcategoryForm) => {
        startTransition(async () => {
            const result = await updateSubcategory({
                ...data,
                updatedAt: new Date(),
            });

            if (result.success) {
                toast.success("Subcategory updated!");
                if (onSuccess) onSuccess();
                reset();
            } else {
                toast.error(result.message || "Failed to update.");
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
                {loadingContent ? <Skeleton width="60%" /> : "Update Subcategory"}
            </Typography>

            {loadingContent ? (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} variant="rounded" height={56} />
                    ))}
                </div>
            ) : (
                <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-4">
                    <FormInput
                        name="name"
                        label="Name"
                        control={control}
                        defaultValue=""
                        // rules={{ required: "Name is required" }}
                        error={!!errors.name}
                        // helperText={errors.name?.message}
                    />

                    <FormInput
                        name="tagline"
                        label="Tagline"
                        control={control}
                        defaultValue=""
                        // rules={{ required: "Tagline is required" }}
                        error={!!errors.tagline}
                        // helperText={errors.tagline?.message}
                    />

                    <FormInput
                        name="description"
                        label="Description"
                        control={control}
                        multiline
                        rows={4}
                        defaultValue=""
                        // rules={{ required: "Description is required" }}
                        error={!!errors.description}
                        // helperText={errors.description?.message}
                    />

                    <FormInput
                        name="photo"
                        label="Photo URL"
                        control={control}
                        defaultValue=""
                        // rules={{ required: "Photo URL is required" }}
                        error={!!errors.photo}
                        // helperText={errors.photo?.message}
                    />

                    <FormInput
                        name="video"
                        label="Video URL (optional)"
                        control={control}
                        defaultValue=""
                    />

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
                            {isPending ? "Updating..." : "Update Subcategory"}
                        </Button>
                    </MotionDiv>
                </form>
            )}
        </MotionDiv>
    );
}
