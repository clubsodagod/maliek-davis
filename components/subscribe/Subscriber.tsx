"use client";

import React, { useState } from "react";
import ComponentTransition from "../layout/ComponentTransition";
import { MotionDiv } from "../motion/MotionDiv";
import { Button, TextField, Typography, CircularProgress } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { submitSubscriber } from "@/utility/fetchers/user.fetcher";
import toast from "react-hot-toast";

const bounceGrow = {
    initial: { scale: 0.6, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: { scale: 0.6, opacity: 0, transition: { duration: 0.2 } },
};

const Subscriber = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState({ email: "", firstName: "", lastName: "" });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const validate = () => {
        let valid = true;
        const newErrors = { email: "", firstName: "", lastName: "" };

        if (!email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        if (email === "") {
            if (!firstName) {
                newErrors.firstName = "First name is required";
                valid = false;
            }
            if (!lastName) {
                newErrors.lastName = "Last name is required";
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const clearForm = () => {
        setEmail("");
        setFirstName("");
        setLastName("");
        setErrors({ email: "", firstName: "", lastName: "" });
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);
        setSent(false);

        try {
            const result = await submitSubscriber({
                email,
                firstName,
                lastName,
            });

            if (result.error) {
                setErrors({ ...errors, email: result.message });
                toast.error(result.message || "Submission failed.");
            } else {
                setSent(true);
                clearForm();
                toast.success("Subscribed successfully!");
            }
        } catch (err) {
            console.error("Unexpected error", err);
            setErrors({ ...errors, email: "Unexpected error occurred" });
            toast.error("Unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ComponentTransition id="subscriber-component">
            <MotionDiv className="flex flex-col w-full h-fit px-3 py-6">
                <Typography variant="h5">Like Being Relevant?</Typography>
                <div className="flex flex-col gap-3 w-full">
                    <TextField
                        variant="filled"
                        label="Email @"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <AnimatePresence>
                        {email !== "" && (
                            <motion.div key="firstName" {...bounceGrow}>
                                <TextField
                                    variant="filled"
                                    label="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    fullWidth
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {email !== "" && (
                            <motion.div key="lastName" {...bounceGrow}>
                                <TextField
                                    variant="filled"
                                    label="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    fullWidth
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {sent ? "Subscribed!" : "Subscribe"}
                    </Button>
                </div>
            </MotionDiv>
        </ComponentTransition>
    );
};

export default Subscriber;
