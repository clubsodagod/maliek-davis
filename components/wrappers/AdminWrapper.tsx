"use client"

import { MotionDivProps } from '@/library/types/motion.types';
import React from 'react'
import { MotionDiv } from '../motion/MotionDiv';
import { AnimatePresence } from 'motion/react';

interface AdminWrapperProps extends MotionDivProps {
    children: React.ReactNode
    adminRef:React.RefObject<HTMLDivElement|null>;
}
const AdminWrapper:React.FC<AdminWrapperProps> = ({
    children,
    ...props
}) => {

    const adminRef = React.useRef<HTMLDivElement>(null);
    const id = props.id ? props.id : '';

    return (
        <AnimatePresence
            key={id}
        >
            <MotionDiv
                ref={adminRef}
                {...props}
            >
                {children}
            </MotionDiv>
        </AnimatePresence>

    );
};

export default AdminWrapper;
