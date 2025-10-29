"use client";

import React from "react";
import ConfettiCelebration from "./ConfettiCelebration";

/**
 * CheckoutSuccess — client-only presentation component for successful Stripe checkout.
 */
const CheckoutSuccess: React.FC<{ email?: string | null }> = ({ email }) => {
    return (
        <>

            <ConfettiCelebration />
            <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#f5f5f5] to-white overflow-hidden">

                {/* Content Card */}
                <div className="z-10 bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl px-8 py-12 text-center max-w-xl mx-4 animate-fade-in-up">
                    <h1 className="text-3xl font-bold text-[#60abe4] mb-4">
                        Thank you for your order! 🎉
                    </h1>

                    <p className="text-lg text-gray-700 leading-relaxed">
                        We appreciate your business! A confirmation email has been sent to{" "}
                        <span className="font-semibold">{email || "your email address"}</span>.
                        <br />
                        If you have any questions, please email{" "}
                        <a
                            href="mailto:orders@maliek-davis.com"
                            className="text-[#60abe4] hover:underline"
                        >
                            orders@maliek-davis.com
                        </a>.
                    </p>

                    <div className="mt-8">
                        <a
                            href="/the-lunch-box"
                            className="inline-block bg-[#60abe4] text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-[#4a8ec7] transition-all"
                        >
                            Back to Menu
                        </a>
                    </div>
                </div>

                {/* Soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
            </section>
        </>
    );
};

export default CheckoutSuccess;
