"use client";

import * as React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import { MotionDivProps } from "@/library/types/motion.types";
import { MotionDiv } from "@/components/motion/MotionDiv";
import { AnimatePresence, motion } from "framer-motion";
import { submitSubscriber } from "@/utility/fetchers/user.fetcher";
import toast from "react-hot-toast";

interface SubscriberCTAFormProps extends MotionDivProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const bounceGrow = {
    initial: { scale: 0.6, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: { scale: 0.6, opacity: 0, transition: { duration: 0.2 } },
};

const fadeSlide = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const SubscriberCTAForm: React.FC<SubscriberCTAFormProps> = ({ open, setOpen, ...props }) => {
    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [errors, setErrors] = React.useState({ email: "", firstName: "", lastName: "" });
    const [loading, setLoading] = React.useState(false);
    const [sent, setSent] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            clearForm();
        }, 400);
    };

    const clearForm = () => {
        setEmail("");
        setFirstName("");
        setLastName("");
        setErrors({ email: "", firstName: "", lastName: "" });
        setSent(false);
    };

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

        if (!firstName) {
            newErrors.firstName = "First name is required";
            valid = false;
        }

        if (!lastName) {
            newErrors.lastName = "Last name is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);

        try {
            const result = await submitSubscriber({
                email,
                firstName,
                lastName,
            });

            if (result?.error) {
                setErrors(prev => ({ ...prev, email: result.message }));
                toast.error(result.message || "Submission failed.");
            } else {
                toast.success("Subscribed successfully!");
                setSent(true);
                setTimeout(() => handleClose(), 1000);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            toast.error("Unexpected error occurred.");
            setErrors(prev => ({ ...prev, email: "Unexpected error occurred." }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <MotionDiv {...props}>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            padding: 3,
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
                <DialogTitle>Subscribe for Updates</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Join our newsletter and stay ahead with exclusive insights and updates.
                    </DialogContentText>

                    <motion.div {...fadeSlide} className="pt-4">
                        <Typography variant="h6">Subscriber Info</Typography>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div key="email-field" {...bounceGrow}>
                            <TextField
                                variant="filled"
                                label="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email}
                                sx={{ mt: 2 }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {email && (
                        <AnimatePresence>
                            <motion.div key="firstName" {...bounceGrow}>
                                <TextField
                                    variant="filled"
                                    label="First Name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    fullWidth
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    sx={{ mt: 2 }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {email && (
                        <AnimatePresence>
                            <motion.div key="lastName" {...bounceGrow}>
                                <TextField
                                    variant="filled"
                                    label="Last Name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    fullWidth
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    sx={{ mt: 2 }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <motion.div
                        key={sent ? "subscribed" : "subscribe"}
                        {...fadeSlide}
                    >
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {sent ? "Subscribed!" : "Subscribe"}
                        </Button>
                    </motion.div>
                </DialogActions>
            </Dialog>
        </MotionDiv>
    );
};

export default SubscriberCTAForm;
