import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
// import { register } from "module";


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

export type ContactInquiry = TechnologyInquiry | InvestmentInquiry | EmploymentInquiry | HomeSellerInquiry;

export default function GeneralDynamicContact() {



    return (
        <div className="w-full md:w-1/2 xl:w-1/3 mx-auto xl:mx-0 rounded-lg xl:ml-[48px] flex flex-col justify-center gap-6">
            <Typography variant="h5" className="text-xl font-bold mb-4">Contact Me</Typography>
                <form  className="space-y-4">

                    {/* Inquiry Type */}
                    <div className="w-full">
                        <FormControl variant="filled" className="w-full">
                            <InputLabel variant="standard" htmlFor="inquiry-type">
                                Inquiry Type
                            </InputLabel>
                            <Select
                            className="w-full"
                                defaultValue={30}
                                inputProps={{
                                    name: 'inquiryType',
                                    id: 'inquiry-type',
                                }}
                            >
                                <MenuItem value={"technology"}>Technology</MenuItem>
                                <MenuItem value={"investment"}>Investment</MenuItem>
                                <MenuItem value={"employment"}>Employment</MenuItem>
                                <MenuItem value={"home-seller"}>Home Owner</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    {/* Company */}
                    <div>
                        <TextField
                        fullWidth
                        variant="filled"
                            name="company"
                            label="Company"
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <TextField
                        fullWidth
                        variant="filled"
                            name="name"
                            label="Name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <TextField
                        fullWidth
                        variant="filled"
                            name="email"
                            label="Email"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <TextField
                        fullWidth
                        variant="filled"
                            name="message"
                            label="message"
                            multiline
                            rows={3}
                        />
                    </div>




                    {/* Dynamic Fields */}
                    {/* {inquiryType === "technology" && (
                        <>
                            <div>
                                <label className="block font-medium">Tech Category</label>
                                <select {...register("techCategory")} className="w-full p-2 border rounded">
                                    <option value="web development">Web Development</option>
                                    <option value="AI/ML">AI/ML</option>
                                    <option value="software consulting">Software Consulting</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">Project Budget ($)</label>
                                <input {...register("projectBudget")} type="number" className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Deadline</label>
                                <input {...register("deadline")} type="date" className="w-full p-2 border rounded" />
                            </div>
                        </>
                    )}

                    {inquiryType === "investment" && (
                        <>
                            <div>
                                <label className="block font-medium">Investment Type</label>
                                <select {...register("investmentType")} className="w-full p-2 border rounded">
                                    <option value="real estate">Real Estate</option>
                                    <option value="startups">Startups</option>
                                    <option value="stocks">Stocks</option>
                                    <option value="crypto">Crypto</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">Investment Amount ($)</label>
                                <input {...register("investmentAmount")} type="number" className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Risk Preference</label>
                                <select {...register("riskPreference")} className="w-full p-2 border rounded">
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </>
                    )}

                    {inquiryType === "employment" && (
                        <>
                            <div>
                                <label className="block font-medium">Company Name</label>
                                <input {...register("companyName")} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Job Title</label>
                                <input {...register("jobTitle")} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Job Type</label>
                                <select {...register("jobType")} className="w-full p-2 border rounded">
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="freelance">Freelance</option>
                                </select>
                            </div>
                        </>
                    )}

                    {inquiryType === "home-seller" && (
                        <>
                            <div>
                                <label className="block font-medium">Property Address</label>
                                <input {...register("propertyAddress")} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Property Type</label>
                                <select {...register("propertyType")} className="w-full p-2 border rounded">
                                    <option value="single-family">Single Family</option>
                                    <option value="multi-family">Multi-Family</option>
                                    <option value="condo">Condo</option>
                                    <option value="land">Land</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">Asking Price ($)</label>
                                <input {...register("askingPrice")} type="number" className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block font-medium">Urgency</label>
                                <select {...register("urgency")} className="w-full p-2 border rounded">
                                    <option value="immediate">Immediate</option>
                                    <option value="within 3 months">Within 3 Months</option>
                                    <option value="within 6 months">Within 6 Months</option>
                                    <option value="flexible">Flexible</option>
                                </select>
                            </div>
                        </>
                    )} */}

                    <Button type="submit" variant="contained" className="w-full bg-blue-600 text-white p-2 rounded">
                        Submit Inquiry
                    </Button>
                </form>

        </div>
    );
};

