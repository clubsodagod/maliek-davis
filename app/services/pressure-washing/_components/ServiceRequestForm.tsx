"use client";

import React, { useRef, useState, useMemo } from "react";
import {
    useForm,
    FieldValues,
} from "react-hook-form";
import {
    Typography,
    Button,
    CircularProgress,
    Grid2,
} from "@mui/material"; // <-- move the structure here
import FormFileUpload from "@/components/FormFileUpload";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import { powerWashFormSections } from "../_library/form.const";
import { serviceCards } from "../_library/price-list.const";
import { FormSection } from "@/app/sell-my-house/_library/copy.const";
import { IServiceRequestInput } from "@/database/models/service-request.eco-wash";
import { submitServiceRequest } from "@/utility/fetchers/serivces/pressure-washing.fetcher";

const addOnCard = serviceCards.find((card) => card.title === "🔧 Add-Ons");

export default function ServiceRequestForm() {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const topRef = useRef<HTMLDivElement>(null);

    const currentSection: FormSection = powerWashFormSections[step];
    const isLastStep = step === powerWashFormSections.length - 1;

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        mode: "onTouched",
    });

    const selectedCategory = watch("serviceCategory");
    const selectedServices = watch("selectedServices") || [];

    const currentCategoryServices = useMemo(() => {
        return serviceCards.find((c) => c.title === selectedCategory)?.services ?? [];
    }, [selectedCategory]);

    const combinedServices = [
        ...currentCategoryServices,
        ...(addOnCard?.services || []),
    ];

    const toggleService = (name: string) => {
        const updated = selectedServices.includes(name)
            ? selectedServices.filter((s: string) => s !== name)
            : [...selectedServices, name];
        setValue("selectedServices", updated);
    };

    const handleNext = async () => {
        const valid = await trigger(currentSection.fields.map((f) => f.name));
        if (valid) setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => Math.max(prev - 1, 0));
    };


    const onSubmit = async (data: FieldValues) => {
        setIsSubmitting(true);

        try {
            // Scroll to top before response to show feedback area (optional UX)
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: "smooth" });
            }

            // Transform if necessary
            const payload: IServiceRequestInput = {
                fullName: data.fullName,
                phone: data.phone,
                email: data.email,
                address: data.address,
                city: data.city,
                state: data.state,
                zip: data.zip,
                notes: data.notes,
                serviceCategory: data.serviceCategory,
                selectedServices: data.selectedServices,
                photos: data.photos?.map((file: File) => file.name) || [], // adapt if using file URLs
            };

            const response = await submitServiceRequest(payload);

            if (!response.success) {
                console.error("[submitServiceRequest Error]", response.message);
                alert(response.message || "Something went wrong. Please try again.");
                return;
            }

            // Reset form and UI
            reset();
            setStep(0);

            // Success UX feedback
            alert("Your request was submitted successfully. We’ll be in touch shortly!");
        } catch (err: unknown) {
            console.error("[onSubmit]", err);
            alert("Unexpected error occurred. Please try again later or contact support.");
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className=" p-6 rounded-2xl shadow max-w-3xl mx-auto text-(--background) bg-[#232323]">
            <div ref={topRef} />
            <Typography className="" variant="h4" align="center" gutterBottom>
                Request a Power Wash Estimate
            </Typography>

            <Typography variant="h6" className="mb-4 ">
                {currentSection.title}
            </Typography>

            <Grid2 container spacing={3} >
                {currentSection.fields.map((field) => {
                    const sharedProps = {
                        name: field.name,
                        label: field.label,
                        control,
                        error: !!errors[field.name],
                    };

                    switch (field.type) {
                        case "text":
                        case "email":
                        case "tel":
                        case "number":
                            return (
                                <Grid2 size={{ xs: 12, md: 6 }} key={field.name}>
                                    <FormInput {...sharedProps} type={field.type} />
                                </Grid2>
                            );

                        case "textarea":
                            return (
                                <Grid2 size={{ xs: 12 }} key={field.name}>
                                    <FormInput {...sharedProps} multiline rows={field.rows || 4} />
                                </Grid2>
                            );

                        case "select":
                            return (
                                <Grid2 size={{ xs: 12, md: 6 }} key={field.name}>
                                    <FormSelect {...sharedProps} options={field.options!} />
                                </Grid2>
                            );

                        case "multi-file":
                        case "file":
                            return (
                                <Grid2 size={{ xs: 12, md: 6 }} key={field.name}>
                                    <FormFileUpload
                                        {...sharedProps}
                                        multiple={field.multiple}
                                        accept={field.accept}
                                    />
                                </Grid2>
                            );

                        case "checkbox":
                            // Render Add-Ons + dynamic checkboxes
                            return (
                                <Grid2 size={{ xs: 12, md: 6 }} key={field.name}>
                                    <Typography variant="subtitle1" className="font-bold mb-2">
                                        {field.label}
                                    </Typography>
                                    {combinedServices.map((service) => (
                                        <label key={service.name} className="flex items-center gap-2 mb-1">
                                            <input
                                                type="checkbox"
                                                checked={selectedServices.includes(service.name)}
                                                onChange={() => toggleService(service.name)}
                                            />
                                            <span>{service.name}</span>
                                        </label>
                                    ))}
                                </Grid2>
                            );

                        default:
                            return null;
                    }
                })}
            </Grid2>

            <div className="flex justify-between items-center mt-6">
                {step > 0 && (
                    <Button onClick={handleBack} disabled={isSubmitting}>
                        Previous
                    </Button>
                )}
                <div className="ml-auto">
                    {isLastStep ? (
                        <Button
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            startIcon={isSubmitting && <CircularProgress size={16} />}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={handleNext} disabled={isSubmitting}>
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
