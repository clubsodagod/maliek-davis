/* eslint-disable @typescript-eslint/no-unused-vars */


import ComponentTransition from '@/components/layout/ComponentTransition';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import RegisterForm from '../register/RegisterForm';
import LoginForm from '../login/LoginForm';
import { renderForm } from '@/utility/render-form.utility';

interface AccessFormCardProps {
    label: "Login"|"Register"|"Forgot Password"|"Reset Password"|"Verify Email"|"Resend Verification Email";
    open: boolean;
    index: number;
}

const AccessFormCard: React.FC<AccessFormCardProps> = ({ label,  open }) => {
    const [expanded, setExpanded] = useState(false);
    const isMobile = useMediaQuery(`(max-width:768px)`);

    const springTransition = {
        type: "spring",
        stiffness: 80,
        damping: 15,
        bounce: 0.25,
        duration: 0.6,
    };

    return (
        <ComponentTransition id={`${label}-transition-card-access`}>
            <MotionDiv
                className="caseStudy-card overflow-hidden rounded-t-4xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: open ? 1 : 1, y: open ? 0 : 0, scale: open ? 1 : 1.03 }}
                exit={{ opacity: 0, y: 10 }}
                transition={springTransition}
                style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: "1px -6px 8px  #17171747",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    className="pt-2 pl-3 cursor-pointer text-center"
                    color="secondary.dark"
                >
                    {label}
                </Typography>
                <div className="mt-4">
                    {renderForm(label)}
                </div>
            </MotionDiv>
        </ComponentTransition>
    );
};

export default AccessFormCard;
