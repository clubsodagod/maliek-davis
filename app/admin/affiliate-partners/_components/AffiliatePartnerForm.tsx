"use client";

import { useForm, useFieldArray } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { IAffiliatePartnerForm } from "@/database/models/affiliate-partner.model";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import FormMultiSelect from "@/components/FormMultiSelect";
import FormTagInput from "@/components/FormTagInput";
import { getCategoryOptions } from "@/utility/fetchers/content-manager.fetcher";
import { Button } from "@mui/material";
import { affiliatePartnerFormSections } from "../_library/forms.const";
import AdminWrapper from "@/components/wrappers/AdminWrapper";
import { submitAffiliatePartner } from "@/utility/fetchers/affiliate-partners.fetcher";
import toast from "react-hot-toast";

function AffiliatePartnerForm() {

    const adminRef = React.useRef<HTMLDivElement>(null);

    const [step, setStep] = useState(0);
    const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);

    const {
        control,
        getValues,
        reset,
    } = useForm<IAffiliatePartnerForm>({
        defaultValues: {
            name: "",
            companyName: "",
            tagline: "",
            description: "",
            email: "",
            contactName: "",
            websiteUrl: "",
            logoUrl: "",
            categories: [],
            affiliateCode: "",
            integrationType: "manual",
            customLinks: [],
            notes: "",
            active: true,
        },
    });

    const { fields, append, remove } = useFieldArray<IAffiliatePartnerForm, "customLinks", "id">({
        control,
        name: "customLinks",
    });


    const currentSection = affiliatePartnerFormSections[step];

    useEffect(() => {
        async function fetchCategoryOptions() {
            const cats = await getCategoryOptions();
            setCategoryOptions(cats);
        }
        fetchCategoryOptions();
    }, []);
    const onSubmit = async () => {
        const rawData = getValues();

        // Transform raw form data into IAffiliatePartnerForm
        const data: IAffiliatePartnerForm = {
            ...rawData,
            customLinks: rawData.customLinks?.filter(
                (link: { label: string; url: string }) => link.label && link.url
            ) || [],
        };

        console.log("Submitting:", data);

        const res = await submitAffiliatePartner(data);

        if (res.success) {
            reset();
            setStep(0);
            toast.success("Affiliate Partner created!");
        } else {
            toast.error(res.message);
        }
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

    return (
        <AdminWrapper
            adminRef={adminRef}
            className=" p-6 pt-[15vh] "
        >
            <form onSubmit={(e) => {e.preventDefault(); onSubmit() }} className="max-w-5xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold">Create Affiliate Partner</h2>

                <h3 className="text-lg font-semibold">{currentSection.title}</h3>

                {currentSection.fields.map((field) => {
                    if (field.name === "categories") {
                        return (
                            <FormMultiSelect
                                key={field.name}
                                name={field.name as keyof IAffiliatePartnerForm}
                                label={field.label}
                                control={control}
                                options={categoryOptions}
                            />
                        );
                    }

                    if (field.type === "input" || field.type === "textarea") {
                        return (
                            <FormInput
                                key={field.name}
                                name={field.name as keyof IAffiliatePartnerForm}
                                label={field.label}
                                control={control}
                                type={field.type || "input"}
                                multiline={field.type === "textarea"}
                                rows={field.rows}
                            />
                        );
                    }

                    if (field.type === "select") {
                        return (
                            <FormSelect
                                key={field.name}
                                name={field.name as keyof IAffiliatePartnerForm}
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
                                name={field.name as keyof IAffiliatePartnerForm}
                                label={field.label}
                                control={control}
                                placeholder={field.placeholder}
                            />
                        );
                    }

                    if (field.name === "customLinks") {
                        return (
                            <div key="customLinks" className="space-y-2">
                                <h4 className="font-medium">Custom Links</h4>
                                {fields.map((item, idx) => (
                                    <div key={item.id} className="flex gap-3 items-center">
                                        <FormInput name={`customLinks.${idx}.label`} label="Label" control={control} />
                                        <FormInput name={`customLinks.${idx}.url`} label="URL" control={control} />
                                        <button type="button" className="text-red-500" onClick={() => remove(idx)}>
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <Button variant="outlined" onClick={() => append({ label: "", url: "" })}>
                                    + Add Link
                                </Button>
                            </div>
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
                        {step < affiliatePartnerFormSections.length - 1 ? (
                            <button type="button" className="btn" onClick={handleNext}>
                                Next
                            </button>
                        ) : null}
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={step !== affiliatePartnerFormSections.length - 1}
                            className="btn"
                        >
                            Submit Affiliate
                        </Button>
                    </div>
                </div>
            </form>
        </AdminWrapper>

    );
}


export default AffiliatePartnerForm;
