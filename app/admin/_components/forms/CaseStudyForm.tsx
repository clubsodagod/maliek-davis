import { useForm } from "react-hook-form";
import { useState } from "react";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import FormTagInput from "@/components/FormTagInput";
import { ICaseStudyForm } from "@/database/models/case-study.model";

export function CaseStudyForm() {
    const [step, setStep] = useState(1);

    const {
        control,
        handleSubmit,
        trigger,
        reset,
    } = useForm<ICaseStudyForm>({
        defaultValues: {
            title: "",
            type: "",
            featuredImg: { url: "", alt: "" },
            featuredVideo: { url: "", alt: "" },
            photos: [],
            logo: "",
            summary: "",
            objectives: [],
            challenges: [],
            solutions: [],
            outcomes: {
                description: "",
                valueGenerated: 0,
                technicalImpact: "",
            },
            address: "",
        },
    });

    const handleNext = async () => {
        const valid = await trigger(["title", "type"]);
        if (valid) setStep(2);
    };

    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const handleFinalSubmit = async (data: ICaseStudyForm) => {
        await submitCaseStudy(data);
        reset();
        setStep(1);
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            {step === 1 && (
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <h2 className="text-xl font-semibold">Basic Info</h2>
                    <FormInput name="title" label="Title" control={control} />
                    <FormSelect
                        name="type"
                        label="Type"
                        control={control}
                        options={[
                            { value: "TechnicalApplication", label: "Technical Application" },
                            { value: "Property", label: "Property" },
                        ]}
                    />
                    <div className="flex justify-end pt-4">
                        <button className="btn" onClick={handleNext}>Next</button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-4">
                    <h2 className="text-xl font-semibold">Detailed Information</h2>

                    <FormInput name="featuredImg.url" label="Featured Image URL" control={control} />
                    <FormInput name="featuredImg.alt" label="Featured Image Alt Text" control={control} />
                    <FormInput name="featuredVideo.url" label="Featured Video URL" control={control} />
                    <FormInput name="featuredVideo.alt" label="Featured Video Alt Text" control={control} />
                    <FormTagInput name="photos" label="Photos" control={control} placeholder="Add photo URLs" />
                    <FormInput name="logo" label="Logo URL" control={control} />
                    <FormInput name="summary" label="Summary" multiline rows={4} control={control} />
                    <FormTagInput name="objectives" label="Objectives" control={control} placeholder="Add objective" />
                    <FormTagInput name="challenges" label="Challenges" control={control} placeholder="Add challenge" />
                    <FormTagInput name="solutions" label="Solutions" control={control} placeholder="Add solution" />

                    <FormInput name="outcomes.description" label="Outcome Description" multiline rows={3} control={control} />
                    <FormInput name="outcomes.valueGenerated" label="Value Generated" type="number" control={control} />
                    <FormInput name="outcomes.technicalImpact" label="Technical Impact" control={control} />

                    <FormInput name="address" label="Address (optional)" control={control} />

                    <div className="flex justify-between gap-4 pt-4">
                        <button type="button" className="btn" onClick={handleBack}>Back</button>
                        <button type="submit" className="btn">Submit Case Study</button>
                    </div>
                </form>
            )}
        </div>
    );
}
function submitCaseStudy(data: ICaseStudyForm) {
    console.log(data)
    throw new Error("Function not implemented.");
}

