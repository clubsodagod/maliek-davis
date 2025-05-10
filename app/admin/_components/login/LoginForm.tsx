'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Typography, Button, CircularProgress } from '@mui/material';
import FormInput from '@/components/FormInput';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Credentials } from '@/library/types/users';

export default function LoginForm() {
    const { control, handleSubmit } = useForm<Credentials>();
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [fieldValidation, setFieldValidation] = useState<Record<string, true | false | null>>({});
    const router = useRouter();

    const validateFields = (data: Credentials) => {
        const validationState: Record<string, true | false> = {
            credential: !!data.credential.trim(),
            secret: !!data.secret.trim(),
        };

        setFieldValidation(validationState);
        return Object.values(validationState).every((v) => v === true);
    };

    const onSubmit = async (data: Credentials) => {
        setResponseMessage(null);

        const isValid = validateFields(data);
        if (!isValid) {
            setResponseMessage('Please complete the required fields.');
            return;
        }

        setLoading(true);

        try {
            const res = await signIn('credentials', {
                redirect: false,
                credential: data.credential,
                secret: data.secret,
            });

            setLoading(false);

            if (res?.error) {
                setResponseMessage('Invalid login credentials. Please try again.');
            } else {
                router.push('/admin/dashboard'); // Redirect on successful login
            }
        } catch (error) {
            setLoading(false);
            console.error('Login error:', error);
            setResponseMessage('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="w-full xl:w-1/3 2xl:w-full mx-auto 2xl:mx-0 rounded-4xl xl:ml-[48px] flex flex-col justify-center gap-6">
            <Typography variant="h5" className="text-xl font-bold mb-4 md:text-center">
                Sign In
            </Typography>

            <form className="flex flex-col gap-3 justify-center items-center 2xl:px-[10vw]" onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    name="credential"
                    label="Email or Username"
                    control={control}
                    error={fieldValidation.credential === false}
                />
                <FormInput
                    name="secret"
                    label="Password"
                    control={control}
                    type="password"
                    error={fieldValidation.secret === false}
                />

                {responseMessage && (
                    <Typography className="text-sm text-center text-red-600 mt-1">
                        {responseMessage}
                    </Typography>
                )}

                <div className="flex justify-center items-center md:px-1/3 mt-6">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
