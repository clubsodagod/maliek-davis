'use client';

import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { Button, Typography, CircularProgress, Skeleton } from "@mui/material";
import toast from "react-hot-toast";

import { ICategory, ICategoryForm } from "@/database/models/category.model";
import FormInput from "@/components/FormInput";
import FormMultiSelect from "@/components/FormMultiSelect";
import { MotionDiv } from "@/components/motion/MotionDiv";
import { updateCategory } from "@/utility/fetchers/content-manager.fetcher";
import { CategoryWrapper } from "@/app/admin/_library/admin.types";

interface CategoryUpdateFormProps {
    content: CategoryWrapper["payload"];
    options: { label: string; value: string }[];
    onSuccess?: () => void;
}

export function CategoryUpdateForm({ content, options, onSuccess }: CategoryUpdateFormProps) {
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ICategoryForm>({
        defaultValues: {
            name: "",
            slug: "",
            tagline: "",
            description: "",
            subcategories: [],
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
            console.log(content);
            
            Object.entries(content).forEach(([key, value]) => {
                if (key === "subcategories" && Array.isArray(value)) {
                    // Assume value is an array of subcategory objects, convert to array of IDs
                    setValue("subcategories", value.map((sub: ICategory["name"]) => sub ));
                } else {
                    setValue(key as keyof ICategoryForm, value as keyof ICategory);
                }
            });
            setLoadingContent(false);
        }
    }, [content, setValue]);


    const handleFinalSubmit = (data: ICategoryForm) => {
        startTransition(async () => {
            const result = await updateCategory({
                ...data,
                updatedAt: new Date(),
            });

            if (result.success) {
                toast.success("Category updated!");
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
                {loadingContent ? <Skeleton width="60%" /> : "Update Category"}
            </Typography>

            {loadingContent ? (
                <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
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
                        error={!!errors.name}
                    />
                    <FormInput
                        name="slug"
                        label="Slug"
                        control={control}
                        defaultValue=""
                        error={!!errors.slug}
                    />
                    <FormInput
                        name="tagline"
                        label="Tagline"
                        control={control}
                        defaultValue=""
                        error={!!errors.tagline}
                    />
                    <FormInput
                        name="description"
                        label="Description"
                        control={control}
                        multiline
                        rows={4}
                        defaultValue=""
                        error={!!errors.description}
                    />
                    <FormMultiSelect
                        name="subcategories"
                        label="Subcategories"
                        control={control}
                        options={options}
                        defaultValue={[]}
                    />
                    <FormInput
                        name="photo"
                        label="Photo URL"
                        control={control}
                        defaultValue=""
                        error={!!errors.photo}
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
                            {isPending ? "Updating..." : "Update Category"}
                        </Button>
                    </MotionDiv>
                </form>
            )}
        </MotionDiv>
    );
}
