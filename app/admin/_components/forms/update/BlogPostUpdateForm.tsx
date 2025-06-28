/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { Button, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

import FormInput from "@/components/FormInput";
import FormTagInput from "@/components/FormTagInput";
import FormSelect from "@/components/FormSelect";
import FormMultiSelect from "@/components/FormMultiSelect";
import RichTextInput from "@/components/tinyMCE/RichTextInput";

import { IBlogPost, IBlogPostClient } from "@/database/models/blog-posts.model";
import { getSubcategoryOptions, getCategoryOptions, updateBlogPost } from "@/utility/fetchers/content-manager.fetcher";
import { blogPostFormSections } from "@/app/admin/_library/forms.const";

interface BlogPostUpdateFormProps {
    content: IBlogPost;
    onSuccess?: () => void;
}

export default function BlogPostUpdateForm({ content, onSuccess }: BlogPostUpdateFormProps) {
    const { data: session } = useSession();
    const [step, setStep] = useState(0);
    const [isPending, startTransition] = useTransition();

    const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
    const [subcategoryOptions, setSubcategoryOptions] = useState<{ label: string; value: string }[]>([]);

    const {
        control,
        handleSubmit,
        reset,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setValue,
    } = useForm<IBlogPostClient>({
        mode: "onSubmit",
    });

    useEffect(() => {
        async function fetchOptions() {
            const cats = await getCategoryOptions();
            const subs = await getSubcategoryOptions();
            setCategoryOptions(cats);
            setSubcategoryOptions(subs);
        }
        fetchOptions();
    }, []);

    useEffect(() => {
        if (content) {
            reset({
                _id: typeof content._id === "string" ? content._id : (content._id?.toString?.() ?? ""),
                title: content.title ?? "",
                featuredImg: content.featuredImg ?? "",
                content: content.content ?? "",
                author: typeof content.author === "string"
                    ? (session?.user?.id || content.author)
                    : (session?.user?.id || content.author?.id || ""),
                category: typeof content.category === "string"
                    ? content.category
                    : (content.category?._id?.toString?.() ?? ""),
                subcategories: Array.isArray(content.subcategories)
                    ? content.subcategories.map((sub: any) =>
                        typeof sub === "string" ? sub : (sub?._id?.toString?.() ?? "")
                    )
                    : [],
                tags: Array.isArray(content.tags) ? content.tags.map(String) : [],
                metaDescription: content.metaDescription ?? "",
                seoKeywords: Array.isArray(content.seoKeywords) ? content.seoKeywords.map(String) : [],
                // add other fields as needed, mapping to the correct types
            });
        }
    }, [content, reset, session]);

    const onSubmit = async (data: IBlogPostClient) => {
        if (!data) {
            toast.error("Please fill missing fields.");
            return;
        }

        startTransition(async () => {
            const result = await updateBlogPost({ ...data, _id: `${content._id}` });
            if (result.success) {
                toast.success("Blog post updated!");
                onSuccess?.();
            } else {
                toast.error(result.message || "Failed to update.");
            }
        });
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));
    const currentSection = blogPostFormSections[step];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">Update Blog Post</h2>

            <h3 className="text-lg font-semibold">{currentSection.title}</h3>
            {currentSection.fields.map((field) => {
                if (field.type === "input" || field.type === "textarea") {
                    return (
                        <FormInput
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            control={control}
                            multiline={field.type === "textarea"}
                            rows={field.rows}
                        />
                    );
                }

                if (field.type === "select") {
                    const options =
                        field.name === "category" ? categoryOptions : field.options!;
                    return options.length ? (
                        <FormSelect
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            control={control}
                            options={options}
                        />
                    ) : (
                        <p key={field.name}>Loading {field.label} options...</p>
                    );
                }

                if (field.type === "multi-select") {
                    const options =
                        field.name === "subcategories" ? subcategoryOptions : field.options!;
                    return options.length ? (
                        <FormMultiSelect
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            control={control}
                            options={options}
                        />
                    ) : (
                        <p key={field.name}>Loading {field.label} options...</p>
                    );
                }

                if (field.type === "tag") {
                    return (
                        <FormTagInput
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            control={control}
                            placeholder={field.placeholder}
                        />
                    );
                }

                if (field.type === "tinyMCE") {
                    return (
                        <RichTextInput
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            control={control}
                        />
                    );
                }

                return null;
            })}

            <div className="flex justify-between pt-4">
                {step > 0 && (
                    <button type="button" className="btn" onClick={handleBack}>
                        Back
                    </button>
                )}
                <div className="flex gap-3 ml-auto">
                    {step < blogPostFormSections.length - 1 ? (
                        <button type="button" className="btn ml-auto" onClick={handleNext}>
                            Next
                        </button>
                    ) : null}
                    <Button
                        variant="contained"
                        disabled={step !== blogPostFormSections.length - 1 || isPending}
                        type="submit"
                        className="btn ml-auto"
                        endIcon={isPending ? <CircularProgress size={18} /> : null}
                    >
                        {isPending ? "Saving..." : "Update Blog Post"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
