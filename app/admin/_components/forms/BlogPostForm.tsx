"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FormInput from "@/components/FormInput";
import FormTagInput from "@/components/FormTagInput";
import FormSelect from "@/components/FormSelect";
import { IBlogPostClient } from "@/database/models/blog-posts.model";
import { blogPostFormSections } from "../../_library/forms.const";
import FormMultiSelect from "@/components/FormMultiSelect";
import RichTextInput from "@/components/tinyMCE/RichTextInput";
import { submitBlogPost } from "@/utility/fetchers/content-manager.fetcher";

export function BlogPostForm() {
    const { data: session } = useSession();
    const [step, setStep] = useState(0);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
    } = useForm<IBlogPostClient>({
        defaultValues: {
            title: "",
            featuredImg: "",
            content: "",
            author: "",
            category: "",
            subcategories: [],
            tags: [],
            metaDescription: "",
            seoKeywords: [],
        },
        mode: "onTouched",
    });

    useEffect(() => {
        if (session?.user?.id) {
            setValue("author", session.user.id);
        }
    }, [session, setValue]);

    const onSubmit = async (data: IBlogPostClient) => {
        await submitBlogPost(data);
        console.log("Blog post submitted:", data);
        reset();
        setStep(0);
    };

    const handleNext = () => {
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 0));
    };

    const currentSection = blogPostFormSections[step];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">Create Blog Post</h2>

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
                    return (
                        <FormSelect
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            control={control}
                            options={field.options!}
                        />
                    );
                }
                if (field.type === "multi-select") {
                    return (
                        <FormMultiSelect
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            control={control}
                            options={field.options!}
                        />
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
                {step < blogPostFormSections.length - 1 ? (
                    <button type="button" className="btn ml-auto" onClick={handleNext}>
                        Next
                    </button>
                ) : (
                    <button type="submit" className="btn ml-auto">
                        Submit Blog Post
                    </button>
                )}
            </div>
        </form>
    );
}


