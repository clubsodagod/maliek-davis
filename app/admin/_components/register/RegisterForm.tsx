'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Typography, Button, CircularProgress } from "@mui/material";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import { IUserForm } from "@/database/models/user.model";
import { registerAdminUser } from "@/utility/fetchers/user.fetcher";

export default function UserRegistrationForm() {
    const {
        control,
        handleSubmit,
        reset,
        // getValues,
    } = useForm<IUserForm>();

    const [loading, setLoading] = useState(false);
    const [fieldValidation, setFieldValidation] = useState<Record<string, true | false | null>>({});
    const [responseMessage, setResponseMessage] = useState<string | null>(null);

    const validateFields = (data: IUserForm) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        const validationState: Record<string, true | false> = {
            firstName: !!data.firstName.trim(),
            lastName: !!data.lastName.trim(),
            username: !!data.username.trim(),
            email: emailRegex.test(data.email),
            conirmEmail: data.email === data.conirmEmail,
            avatar: !!data.avatar.trim(),
            password: passwordRegex.test(data.password),
            confirmPassword: data.password === data.confirmPassword,
            role: ["admin", "employee", "customer"].includes(data.role),
        };

        setFieldValidation(validationState);

        return Object.values(validationState).every((v) => v === true);
    };

    const onSubmit = async (data: IUserForm) => {
        setResponseMessage(null);

        const isValid = validateFields(data);
        if (!isValid) {
            setResponseMessage("Please fix the highlighted fields.");
            return;
        }

        setLoading(true);

        const response = await registerAdminUser(data);

        setLoading(false);
        setResponseMessage(response.message);

        if (!response.error) {
            reset();
            setFieldValidation({});
        }
    };

    return (
        <div className="w-full  xl:w-1/3 2xl:w-full  mx-auto 2xl:mx-0 rounded-4xl xl:ml-[48px] flex flex-col justify-center   gap-6">
            <Typography variant="h5" className="text-xl font-bold mb-4 md:text-center">
                Create Account
            </Typography>

            <form className="flex flex-col  gap-3  justify-center items-center 2xl:px-[10vw]" onSubmit={handleSubmit(onSubmit)}>
                <FormInput name="firstName" label="First Name" control={control} error={fieldValidation.firstName === false} />
                <FormInput name="lastName" label="Last Name" control={control} error={fieldValidation.lastName === false} />
                <FormInput name="username" label="Username" control={control} error={fieldValidation.username === false} />
                <FormInput name="email" label="Email" control={control} type="email" error={fieldValidation.email === false} />
                <FormInput name="conirmEmail" label="Confirm Email" control={control} type="email" error={fieldValidation.conirmEmail === false} />
                <FormInput name="avatar" label="Avatar URL" control={control} error={fieldValidation.avatar === false} />
                <FormInput name="password" label="Password" control={control} type="password" error={fieldValidation.password === false} />
                <FormInput name="confirmPassword" label="Confirm Password" control={control} type="password" error={fieldValidation.confirmPassword === false} />
                <FormSelect
                    name="role"
                    label="Role"
                    control={control}
                    options={[
                        { label: "Employee", value: "employee" },
                        { label: "Admin", value: "admin" },
                    ]}
                    error={fieldValidation.role === false}
                />

                {responseMessage && (
                    <Typography className="text-sm text-center text-red-600 mt-1">{responseMessage}</Typography>
                )}

                <div className="flex justify-center items-center md:px-1/3 mt-6">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
