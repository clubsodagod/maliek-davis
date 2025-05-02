"use client"

import React, { useState } from 'react'
import ComponentTransition from '../layout/ComponentTransition';
import { MotionDiv } from '../motion/MotionDiv';
import { Button, TextField, Typography, CircularProgress } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

const bounceGrow = {
    initial: { scale: 0.6, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    exit: { scale: 0.6, opacity: 0, transition: { duration: 0.2 } }
};

const Subscriber = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState({ email: '', firstName: '', lastName: '' });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const validate = () => {
        let valid = true;
        const newErrors: {email:string,firstName:string,lastName:string} = { email: '', firstName: '', lastName: '' };

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }

        if (email === '') {
            if (!firstName) {
                newErrors.firstName = 'First name is required';
                valid = false;
            }
            if (!lastName) {
                newErrors.lastName = 'Last name is required';
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setLoading(true);
        setSent(false);

        try {
            await new Promise((res) => setTimeout(res, 1500)); // simulate sending
            setSent(true);
        } catch (error) {
            console.error('Submit failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ComponentTransition id="subscriber-component">
            <MotionDiv className='flex flex-col w-full h-fit px-3 py-6'>
                <Typography variant="h5">
                    Like Being Relevant?
                </Typography>
                <div className='flex flex-col gap-3 w-full'>
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
                        {email !== '' && (
                            <motion.div
                                key="firstName"
                                variants={bounceGrow}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
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
                        {email !== '' && (
                            <motion.div
                                key="lastName"
                                variants={bounceGrow}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
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
                        {sent ? 'Subscribed!' : 'Subscribe'}
                    </Button>
                </div>
            </MotionDiv>
        </ComponentTransition>
    );
};

export default Subscriber;