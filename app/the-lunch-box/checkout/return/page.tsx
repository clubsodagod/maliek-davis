/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CheckoutSuccess from "../../_components/CheckoutSuccess";
import Link from "next/link";

type ApiResponse =
    | { status: "complete"; customer_email?: string | null }
    | { status: "open" }
    | { status: "error"; message: string };

export default function ReturnPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("session_id");

    const [state, setState] = React.useState<{
        loading: boolean;
        error?: string;
        email?: string | null;
        done: boolean;
    }>({
        loading: true,
        done: false,
    });

    React.useEffect(() => {
        let cancelled = false;

        async function run() {
            if (!sessionId) {
                setState({ loading: false, error: "Missing session_id", done: false });
                return;
            }

            try {
                const res = await fetch(
                    `/api/stripe/checkout/return?session_id=${encodeURIComponent(
                        sessionId
                    )}`,
                    { method: "GET", cache: "no-store" }
                );

                const data: ApiResponse = await res.json();
                console.log(data);


                if (cancelled) return;

                if (data.status === "open") {
                    // Session not completed — go home
                    router.replace("/");
                    return;
                }

                if (data.status === "complete") {
                    setState({
                        loading: false,
                        email: data.customer_email ?? null,
                        done: true,
                    });
                    return;
                }

                setState({
                    loading: false,
                    error:
                        (data as any)?.message ??
                        "Something went wrong while confirming your order.",
                    done: false,
                });
            } catch (err: any) {
                if (!cancelled) {
                    setState({
                        loading: false,
                        error: err?.message ?? "Network error.",
                        done: false,
                    });
                }
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [sessionId, router]);

    if (state.loading) {
        return (
            <Suspense>
                <section className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#f5f5f5] to-white">
                    <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl px-8 py-12 text-center max-w-xl mx-4">
                        <h1 className="text-2xl font-semibold text-[#60abe4]">Finalizing your order…</h1>
                        <p className="text-gray-600 mt-3">Please hold on while we confirm your payment.</p>
                    </div>
                </section>
            </Suspense>

        );
    }

    if (state.error) {
        return (
            <Suspense>
                <section className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#f5f5f5] to-white">
                    <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl px-8 py-12 text-center max-w-xl mx-4">
                        <h1 className="text-2xl font-semibold text-red-600">Uh oh.</h1>
                        <p className="text-gray-700 mt-3">{state.error}</p>
                        <Link
                            href="/"
                            className="inline-block mt-6 bg-[#60abe4] text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-[#4a8ec7] transition-all"
                        >
                            Back to Home
                        </Link>
                    </div>
                </section>
            </Suspense>

        );
    }

    if (state.done) {
        return
        <Suspense>
            <CheckoutSuccess email={state.email} />
        </Suspense>
        
    }

    return null
}
