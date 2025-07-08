"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FormInput from "@/components/FormInput";
import FormTagInput from "@/components/FormTagInput";
import FormSelect from "@/components/FormSelect";
import FormMultiSelect from "@/components/FormMultiSelect";
import RichTextInput from "@/components/tinyMCE/RichTextInput";
import { IBlogPostClient } from "@/database/models/blog-posts.model";
import { blogPostFormSections } from "../../_library/forms.const";
import { submitBlogPost, getSubcategoryOptions, getCategoryOptions, getRelatedPostsLinks, getCategoryById } from "@/utility/fetchers/content-manager.fetcher";
import { Button } from "@mui/material";
import { AffiliatePartner } from "@/components/tinyMCE/AffiliatePartnerLinkList";
import { getAffiliatePartnerOptions } from "@/utility/fetchers/affiliate-partners.fetcher";



export function BlogPostForm() {
    const { data: session, status } = useSession();
    const [step, setStep] = useState(0);
    const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
    const [subcategoryOptions, setSubcategoryOptions] = useState<{ label: string; value: string }[]>([]);
    const [relatedLinks, setRelatedLinks] = useState<{ title: string; slug: string }[]>([]);
    const [filteredSubcategoryOptions, setFilteredSubcategoryOptions] = useState<{ label: string; value: string }[]>([]);
    const [affiliatePartners, setAffiliatePartners] = useState<AffiliatePartner[]>([]);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
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
        },
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

    const category = watch("category");

    useEffect(() => {
        if (status === "authenticated" && session?.user?._id) {
            const userId =
                typeof session.user._id === "string"
                    ? session.user._id
                    : "681fa586c53053e82efbdb00";
            setValue("author", userId);
        }

        const fetchLinksAndFilterSubs = async () => {
            if (category) {
                const links = await getRelatedPostsLinks(category);
                setRelatedLinks(links);
                const affiliateRes = await getAffiliatePartnerOptions(category);
                console.log("Affiliate Partners:", affiliateRes);
                
                setAffiliatePartners(affiliateRes);

                const selectedCategory = categoryOptions.find(cat => cat.value === category);

                if (selectedCategory) {
                    // Assume you have a way to fetch the full category object with its subcategories
                    const res = await getCategoryById(selectedCategory.value);
                    let fullCategory = null;
                    if (res) {
                        fullCategory = await res;
                    }

                    if (fullCategory && Array.isArray(fullCategory.subcategories)) {
                        const matchingSubcats = subcategoryOptions.filter(sub =>
                            fullCategory.subcategories.includes(sub.value)
                        );
                        setFilteredSubcategoryOptions(matchingSubcats);
                    } else {
                        setFilteredSubcategoryOptions([]);
                    }
                } else {
                    setFilteredSubcategoryOptions([]);
                }
            }
        };


        fetchLinksAndFilterSubs();
    }, [session, setValue, status, category, categoryOptions, subcategoryOptions]);






    const onSubmit = async (data: IBlogPostClient) => {

        const result = await submitBlogPost(data);
        console.log("Blog post submitted:", result);

        reset(); // Optional: Reset form after submission
        setValue("author", session?.user?.id || ""); // Reset author to current user ID
        setStep(0);
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

    const currentSection = blogPostFormSections[step];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-6">
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
                        field.name === "subcategories" ? filteredSubcategoryOptions : field.options!;

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
                            relatedLinks={relatedLinks}
                            affiliatePartners={affiliatePartners}
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
                        disabled={step !== blogPostFormSections.length - 1}
                        type="submit"
                        className="btn ml-auto"
                    >
                        Submit Blog Post
                    </Button>
                </div>
            </div>
        </form>
    );
}
