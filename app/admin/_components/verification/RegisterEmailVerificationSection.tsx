"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainHeroHeader from "@/components/headers/MainHeroHeader";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import {
    initialHeaderAnimation,
    animateHeaderAnimation,
    transitionHeaderAnimation,
} from "@/library/animations/enter.animations";
import { Typography, CircularProgress } from "@mui/material";
import { verifyUserEmail } from "@/utility/fetchers/user.fetcher";
import { IUser } from "@/database/models/user.model";
import VerificationSuccessCard from "./VerificationSuccessCard";


const verifyEmailToken = async (
    token: string,
): Promise<{ success: boolean; message: string, user?: IUser | null | undefined; }> => {
    return await verifyUserEmail({ token });
};


const RegisterEmailVerificationSection = () => {
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();

    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";
    const username = searchParams.get("username") || "";
    const firstName = searchParams.get("firstName") || "";

    const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const verify = async () => {
            const res = await verifyEmailToken(token);
            setStatus(res.success ? "success" : "error");
            setMessage(res.message);
            setUser(res.user ?? null);
        };

        if (token && email) {
            verify();
        } else {
            setStatus("error");
            setMessage("Missing verification information.");
        }
    }, [token, email]);


    return (
        <SectionWrapper
            id="admin-access-registration"
            ref={sectionRef}
            whileInView={{ opacity: 1 }}
            initial={initialHeaderAnimation}
            animate={animateHeaderAnimation}
            transition={transitionHeaderAnimation}
            exit={{ opacity: 0, scaleY: 0 }}
        >
            <MainHeroHeader
                headerLabel={`Email Verification for ${firstName || username}`}
                tagline={`You're so close to joining the team!`}
                size="lg"
                center="md:text-center"
            />

            <div className="grow flex flex-col justify-center  text-center">
                {status === "pending" && <CircularProgress />}
                {status !== "pending" && (
                    <Typography
                        className={`text-lg font-medium ${status === "success" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {message}
                    </Typography>
                )}
                {status === "success" && user && (
                    <VerificationSuccessCard user={user} message={message} />
                )}
            </div>
        </SectionWrapper>
    );
};

export default RegisterEmailVerificationSection;
