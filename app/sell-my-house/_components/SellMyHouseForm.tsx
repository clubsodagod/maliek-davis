"use client";

import {
    useForm,
    FieldValues,
} from "react-hook-form";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    CircularProgress,
    Grid2,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { FormSection, leadFormSections } from "../_library/copy.const";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import FormFileUpload from "@/components/FormFileUpload";
import { MotivatedSellerFormInput, submitMotivatedSeller } from "@/utility/fetchers/contact.fetchers";

interface LeadFormDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function SellMyHouseForm({ open, setOpen }: LeadFormDialogProps) {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentSection: FormSection = leadFormSections[step];
    const isLastStep = step === leadFormSections.length - 1;
    const topRef = useRef<HTMLDivElement>(null);

    const {
        control,
        handleSubmit,
        trigger,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        mode: "onTouched",
    });

    const handleClose = () => {
        setOpen(false);
        setStep(0);
        reset(); // Optional reset on close
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
        console.log("Submitting form data:", data);
        try {
            const result = await submitMotivatedSeller(data as unknown as MotivatedSellerFormInput);
            if (result.error) {
                alert(result.message);
                setIsSubmitting(false);
                return;
            }

            // Scroll to top
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: "smooth" });
            }

            setIsSubmitting(false);
            reset();       // Clear form
            setStep(0);    // Reset step
            setOpen(false); // Close dialog
        } catch (error) {
            console.error("Form submission failed:", error);
            alert("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const escHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", escHandler);
        return () => window.removeEventListener("keydown", escHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            slotProps={{
                paper: {
                    sx: {
                        p: 4,
                        borderRadius: "24px",
                        bgcolor: "#FAFAFA",
                    },
                },
                backdrop: {
                    sx: {
                        backdropFilter: "blur(25px)",
                        bgcolor: "transparent",
                    },
                },
            }}
        >
            <div ref={topRef} />
            <DialogTitle>{currentSection.title}</DialogTitle>
            <DialogContent dividers>
                {currentSection.description && (
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        {currentSection.description}
                    </Typography>
                )}

                <Grid2 container spacing={3}>
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
                                    <Grid2 size={{ xs: 12, md: 6 }} key={field.name}>
                                        <FormInput
                                            {...sharedProps}
                                            multiline
                                            rows={field.rows || 4}
                                            type="text"
                                        />
                                    </Grid2>
                                );

                            case "select":
                            case "radio":
                                return (
                                    <Grid2 size={{ xs: 12, md: 6 }} key={field.name}>
                                        <FormSelect
                                            {...sharedProps}
                                            options={field.options!}
                                        />
                                    </Grid2>
                                );

                            case "file":
                            case "multi-file":
                                return (
                                    <Grid2 size={{ xs: 12, md: 6 }} key={field.name}>
                                        <FormFileUpload
                                            name={field.name}
                                            label={field.label}
                                            control={control}
                                            accept={field.accept}
                                            multiple={field.multiple}
                                        />
                                    </Grid2>
                                );

                            default:
                                return null;
                        }
                    })}
                </Grid2>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
                {step > 0 && (
                    <Button onClick={handleBack} disabled={isSubmitting}>
                        Previous
                    </Button>
                )}
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
            </DialogActions>
        </Dialog>
    );
}
