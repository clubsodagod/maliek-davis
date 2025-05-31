/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import { BusinessLeadCaptureType, IBusinessLeadCaptureFormClient } from "@/database/models/business-cta-forms.model";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

type BusinessLeadCaptureFormType = IBusinessLeadCaptureFormClient;

const leadTypeOptions = [
    { label: "Business Planning", value: "business_planning" },
    { label: "AI & Automation", value: "ai_automation" },
    { label: "Marketing & Growth", value: "marketing_growth" },
    { label: "Digital Presence", value: "digital_presence" },
    { label: "Branding", value: "branding" },
];

interface Props {
    formType: BusinessLeadCaptureType;
}

export default function DynamicBusinessLeadCaptureModule({ formType }: Props) {
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        register
    } = useForm<BusinessLeadCaptureFormType>();

    const type = watch("type");

    // Set formType as the default for "type"
    React.useEffect(() => {
        setValue("type", formType);
    }, [formType, setValue]);

    const onSubmit = async (data: BusinessLeadCaptureFormType) => {
        try {
            console.log("Submitted:", data);
            // await submitBusinessLeadForm(data);
            reset();
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    return (
        <div className="w-full md:w-2/3 xl:w-1/2 mx-auto p-6 rounded-3xl bg-(--background) shadow-md">
            <Typography variant="h5" className="text-2xl font-bold mb-6 text-center">
                Let&apos;s Talk Business
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">

                <input type="hidden" value={formType} {...(register("type") as any)} />

                <FormInput name="name" label="Name" control={control} />
                <FormInput name="email" label="Email" control={control} />
                <FormInput name="phone" label="Phone" control={control} />
                <FormInput name="message" label="Message" control={control} multiline rows={3} />

                {/* Shared Business Fields */}
                <FormInput name="businessName" label="Business Name" control={control} />
                <FormInput name="website" label="Website" control={control} />
                <FormInput name="industry" label="Industry" control={control} />

                {/* Conditional Fields */}
                {type === "business_planning" && (
                    <>
                        <FormSelect
                            name="businessStage"
                            label="Business Stage"
                            control={control}
                            options={[
                                { label: "Idea", value: "Idea" },
                                { label: "Startup", value: "Startup" },
                                { label: "Growth", value: "Growth" },
                                { label: "Established", value: "Established" },
                            ]}
                        />
                        <FormSelect
                            name="fundingStatus"
                            label="Funding Status"
                            control={control}
                            options={[
                                { label: "Bootstrapped", value: "Bootstrapped" },
                                { label: "Seeking Funding", value: "Seeking Funding" },
                                { label: "Funded", value: "Funded" },
                            ]}
                        />
                        <FormInput name="businessGoals" label="Business Goals" control={control} multiline rows={3} />
                    </>
                )}

                {type === "ai_automation" && (
                    <>
                        <FormInput name="currentTools" label="Current Tools" control={control} />
                        <FormInput name="workflowPainPoints" label="Workflow Pain Points" control={control} multiline rows={2} />
                        <FormInput name="automationGoals" label="Automation Goals" control={control} multiline rows={2} />
                    </>
                )}

                {type === "marketing_growth" && (
                    <>
                        <FormInput name="targetAudience" label="Target Audience" control={control} />
                        <FormInput name="marketingChannels" label="Marketing Channels (comma separated)" control={control} />
                        <FormInput name="monthlyMarketingBudget" label="Monthly Marketing Budget" control={control} />
                        <FormInput name="growthGoals" label="Growth Goals" control={control} multiline rows={2} />
                    </>
                )}

                {type === "digital_presence" && (
                    <>
                        <FormInput name="existingPlatforms" label="Existing Platforms (comma separated)" control={control} />
                        <FormInput name="desiredFeatures" label="Desired Features" control={control} />
                        <FormInput name="contentNeeds" label="Content Needs" control={control} />
                        <FormInput name="seoGoals" label="SEO Goals" control={control} />
                    </>
                )}

                {type === "branding" && (
                    <>
                        <FormInput name="brandingGoals" label="Branding Goals" control={control} multiline rows={2} />
                        <FormInput name="brandChallenges" label="Brand Challenges" control={control} multiline rows={2} />
                        <FormInput name="brandBudget" label="Brand Budget" control={control} />
                        <FormInput name="currentBrandAssets" label="Current Brand Assets" control={control} />
                        <FormInput name="desiredTimeline" label="Desired Timeline" control={control} />
                    </>
                )}

                <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
                    Submit
                </Button>
            </form>
        </div>
    );
}
