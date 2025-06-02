import { AnnouncementType,  IAnnouncementForm } from "@/database/models/announcement.model";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import FormDatePicker from "@/components/FormDatePicker";
import FormMultiSelect from "@/components/FormMultiSelect";
import FormSelect from "@/components/FormSelect";
import FormTagInput from "@/components/FormTagInput";
import { submitAnnouncement } from "@/utility/fetchers/content-manager.fetcher";

const announcementTypeLabels: Record<AnnouncementType, string> = {
    investment_opportunity: "Investment Opportunity",
    completed_client_project: "Completed Project",
    new_social_content: "Social Content",
    speaking_engagement: "Speaking Engagement",
    new_store_product: "New Store Product",
    community_service_event: "Community Service",
    fundraising: "Fundraising",
    real_estate_syndication: "Real Estate Syndication"
};

export function AnnouncementForm() {
    const [step, setStep] = useState(1);
    const [type, setType] = useState<AnnouncementType | null>(null);
    const typeButtonsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const [focusedIndex, setFocusedIndex] = useState(0);

    const {
        control,
        handleSubmit,
        trigger,
        setValue,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        reset
    } = useForm<IAnnouncementForm>({
        defaultValues: {
            title: "",
            description: "",
            image: "",
        },
    });

    const handleNext = async () => {
        const valid = await trigger(["title", "description"]);
        if (valid) setStep(3);
    };

    const handleBack = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handleFinalSubmit = async (data: IAnnouncementForm) => {
        const formData: IAnnouncementForm = {
            ...data,
            type: type!,
        };
        await submitAnnouncement(formData as IAnnouncementForm);
        console.log(formData);
        // reset();
        setStep(1);
        setType(null);
    };

    useEffect(() => {
        if (step === 1 && typeButtonsRef.current[focusedIndex]) {
            typeButtonsRef.current[focusedIndex]?.focus();
        }
    }, [focusedIndex, step]);

    const handleKeyDownTypeSelect = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const max = Object.keys(announcementTypeLabels).length - 1;
        if (e.key === "ArrowRight") {
            setFocusedIndex((prev) => Math.min(prev + 1, max));
        } else if (e.key === "ArrowLeft") {
            setFocusedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
            const key = Object.keys(announcementTypeLabels)[focusedIndex] as AnnouncementType;
            setType(key);
            setStep(2);
            setValue("type", key);
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            {step === 1 && (
                <div className="space-y-4" onKeyDown={handleKeyDownTypeSelect} tabIndex={0}>
                    <h2 className="text-xl font-semibold">Select Announcement Type</h2>
                    <div className="flex flex-wrap gap-3">
                        {(Object.keys(announcementTypeLabels) as AnnouncementType[]).map((key, idx) => (
                            <button
                                key={key}
                                type="button"
                                ref={(el) => { typeButtonsRef.current[idx] = el; }}
                                onClick={() => {
                                    setType(key);
                                    setStep(2);
                                    setValue("type", key);
                                }}
                                className={`btn ${focusedIndex === idx ? 'ring-2 ring-blue-500' : ''}`}
                                aria-pressed={type === key}
                                aria-label={`Select ${announcementTypeLabels[key]}`}
                            >
                                {announcementTypeLabels[key]}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && (
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <h2 className="text-xl font-semibold">General Details</h2>

                    <FormInput name="title" label="Title" control={control} defaultValue="" />
                    <FormInput name="description" label="Description" control={control} multiline rows={4} defaultValue="" />
                    <FormInput name="image" label="Image URL (optional)" control={control} defaultValue="" />

                    <div className="flex justify-between gap-4 pt-4">
                        <button className="btn" type="button" onClick={handleBack}>Back</button>
                        <button className="btn" onClick={handleNext}>Next</button>
                    </div>
                </form>
            )}

            {step === 3 && type && (
                <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-4">
                    <h2 className="text-xl font-semibold">Details for {announcementTypeLabels[type]}</h2>

                    {type === "investment_opportunity" && (
                        <>
                            <FormInput name="investmentOpportunity.dealSummary" label="Deal Summary" control={control} defaultValue="" />
                            <FormSelect
                                name="investmentOpportunity.category"
                                label="Category"
                                control={control}
                                options={[
                                    { value: "real_estate", label: "Real Estate" },
                                    { value: "technical_project", label: "Technical Project" },
                                ]}
                                defaultValue=""
                            />
                            <FormInput name="investmentOpportunity.location" label="Location (optional)" control={control} defaultValue="" />
                            <FormInput name="investmentOpportunity.minInvestment" label="Minimum Investment (optional)" control={control} type="number" defaultValue="" />
                            <FormInput name="investmentOpportunity.projectedReturns" label="Projected Returns (optional)" control={control} defaultValue="" />
                            <FormDatePicker name="investmentOpportunity.deadline" label="Deadline (optional)" control={control} />
                            <FormInput name="investmentOpportunity.linkToMoreInfo" label="Link to More Info (optional)" control={control} defaultValue="" />
                        </>
                    )}

                    {type === "completed_client_project" && (
                        <>
                            <FormInput name="completedClientProject.clientName" label="Client Name" control={control} defaultValue="" />
                            <FormInput name="completedClientProject.projectName" label="Project Name" control={control} defaultValue="" />
                            <FormMultiSelect
                                name="completedClientProject.technologiesUsed"
                                label="Technologies Used"
                                control={control}
                                options={[
                                    { value: "React", label: "React" },
                                    { value: "Node.js", label: "Node.js" },
                                    { value: "MongoDB", label: "MongoDB" },
                                    { value: "Python", label: "Python" },
                                ]}
                                defaultValue={[]}
                            />
                            <FormInput multiline rows={4} name="completedClientProject.summary" label="Project Summary" control={control} defaultValue="" />
                            <FormInput name="completedClientProject.caseStudyLink" label="Case Study Link (optional)" control={control} defaultValue="" />
                            <FormInput name="completedClientProject.projectUrl" label="Project URL (optional)" control={control} defaultValue="" />
                        </>
                    )}

                    {type === "new_social_content" && (
                        <>
                            <FormInput name="newSocialContent.platform" label="Platform (e.g. Twitter)" control={control} defaultValue="" />
                            <FormInput name="newSocialContent.postTitle" label="Post Title" control={control} defaultValue="" />
                            <FormInput name="newSocialContent.postUrl" label="Content Link" control={control} defaultValue="" />
                            <FormTagInput name="newSocialContent.tags" label="Tags (optional)" control={control} placeholder="Add tags" />
                        </>
                    )}

                    <div className="flex justify-between gap-4 pt-4">
                        <button type="button" className="btn" onClick={handleBack}>Back</button>
                        <button type="submit" className="btn">Submit Announcement</button>
                    </div>
                </form>
            )}
        </div>
    );
}
