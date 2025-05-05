import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { submitInquiryForm } from "@/utility/fetchers/contact.fetchers";

type InquiryType = "technology" | "investment" | "employment" | "home-seller";

interface BaseInquiry {
    name: string;
    email: string;
    message: string;
    inquiryType: InquiryType;
}

interface TechnologyInquiry extends BaseInquiry {
    inquiryType: "technology";
    techCategory: "web development" | "AI/ML" | "software consulting" | "other";
    projectBudget?: number;
    deadline?: string;
}

interface InvestmentInquiry extends BaseInquiry {
    inquiryType: "investment";
    investmentType: "real estate" | "startups" | "stocks" | "crypto";
    investmentAmount: number;
    riskPreference: "low" | "medium" | "high";
}

interface EmploymentInquiry extends BaseInquiry {
    inquiryType: "employment";
    companyName: string;
    jobTitle: string;
    jobType: "full-time" | "part-time" | "contract" | "freelance";
    salaryRange?: string;
}

interface HomeSellerInquiry extends BaseInquiry {
    inquiryType: "home-seller";
    propertyAddress: string;
    propertyType: "single-family" | "multi-family" | "condo" | "land";
    askingPrice: number;
    urgency: "immediate" | "within 3 months" | "within 6 months" | "flexible";
}

export type ContactInquiry =
    | TechnologyInquiry
    | InvestmentInquiry
    | EmploymentInquiry
    | HomeSellerInquiry;

const inquiryTypeOptions = [
    { label: "Technology", value: "technology" },
    { label: "Investment", value: "investment" },
    { label: "Employment", value: "employment" },
    { label: "Home Owner", value: "home-seller" },
];

export default function GeneralDynamicContact() {
    const {
        control,
        handleSubmit,
        reset,
        watch,
    } = useForm<ContactInquiry>();

    const inquiryType = watch("inquiryType");

    const onSubmit = async (data: ContactInquiry) => {
                try {
                    await submitInquiryForm(data as unknown as ContactInquiry);
                } catch (error) {
                    console.error("Form submission failed:", error);
                }
        console.log("Submitted:", data);
        reset();
    };

    return (
        <div className="w-full md:w-1/2 xl:w-1/3 mx-auto xl:mx-0 rounded-4xl xl:ml-[48px] flex flex-col justify-center gap-6">
            <Typography variant="h5" className="text-xl font-bold mb-4 md:text-center">Contact Me</Typography>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <FormSelect name="inquiryType" label="Inquiry Type" options={inquiryTypeOptions} control={control}  />
                <FormInput name="name" label="Name" control={control} />
                <FormInput name="email" label="Email" control={control} />
                <FormInput name="message" label="Message" control={control} multiline rows={3} />

                {inquiryType === "technology" && (
                    <>
                        <FormSelect
                            name="techCategory"
                            label="Tech Category"
                            control={control}
                            options={[
                                { label: "Web Development", value: "web development" },
                                { label: "AI/ML", value: "AI/ML" },
                                { label: "Software Consulting", value: "software consulting" },
                                { label: "Other", value: "other" },
                            ]}
                        />
                        <FormInput name="projectBudget" label="Project Budget ($)" type="number" control={control} />
                        <FormInput name="deadline" label="Deadline" type="date" control={control} />
                    </>
                )}

                {inquiryType === "investment" && (
                    <>
                        <FormSelect
                            name="investmentType"
                            label="Investment Type"
                            control={control}
                            options={[
                                { label: "Real Estate", value: "real estate" },
                                { label: "Startups", value: "startups" },
                                { label: "Stocks", value: "stocks" },
                                { label: "Crypto", value: "crypto" },
                            ]}
                        />
                        <FormInput name="investmentAmount" label="Investment Amount ($)" type="number" control={control} />
                        <FormSelect
                            name="riskPreference"
                            label="Risk Preference"
                            control={control}
                            options={[
                                { label: "Low", value: "low" },
                                { label: "Medium", value: "medium" },
                                { label: "High", value: "high" },
                            ]}
                        />
                    </>
                )}

                {inquiryType === "employment" && (
                    <>
                        <FormInput name="companyName" label="Company Name" control={control} />
                        <FormInput name="jobTitle" label="Job Title" control={control} />
                        <FormSelect
                            name="jobType"
                            label="Job Type"
                            control={control}
                            options={[
                                { label: "Full-time", value: "full-time" },
                                { label: "Part-time", value: "part-time" },
                                { label: "Contract", value: "contract" },
                                { label: "Freelance", value: "freelance" },
                            ]}
                        />
                    </>
                )}

                {inquiryType === "home-seller" && (
                    <>
                        <FormInput name="propertyAddress" label="Property Address" control={control} />
                        <FormSelect
                            name="propertyType"
                            label="Property Type"
                            control={control}
                            options={[
                                { label: "Single Family", value: "single-family" },
                                { label: "Multi Family", value: "multi-family" },
                                { label: "Condo", value: "condo" },
                                { label: "Land", value: "land" },
                            ]}
                        />
                        <FormInput name="askingPrice" label="Asking Price ($)" type="number" control={control} />
                        <FormSelect
                            name="urgency"
                            label="Urgency"
                            control={control}
                            options={[
                                { label: "Immediate", value: "immediate" },
                                { label: "Within 3 Months", value: "within 3 months" },
                                { label: "Within 6 Months", value: "within 6 months" },
                                { label: "Flexible", value: "flexible" },
                            ]}
                        />
                    </>
                )}

                <div
                    className="flexjustify-center items-center md:px-1/3 mt-6"
                >
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
