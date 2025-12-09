/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { submitAuditLead } from "./_utility/submitAuditLead";

/**
 * Automation / Audit Lead Funnel — Single-file, drop-in React component (Next.js + Tailwind ready)
 *
 * What this includes:
 * - Sticky value-prop hero with trust badges
 * - "What you get" bullets + social proof
 * - 3-step lead form with progressive profiling (Contact → Audit Basics → Priorities)
 * - UTM + ref capture, basic honeypot, and optimistic UI
 * - Client-side validation (zod) + graceful error states
 * - Lightweight accessibility and keyboard support
 * - Clean brand-friendly visuals (Tailwind / Motion — no external UI libs)
 *
 * Integration notes:
 * - Update API_ENDPOINT to your server route. Ex: "/api/leads/automation-audit".
 * - The payload is fully typed; map to your DB model (e.g., CTA form model) on the server.
 * - If you already have a fetcher util, swap `submitLead` to use it.
 */

// ────────────────────────────────────────────────────────────────────────────────
// Config
// ────────────────────────────────────────────────────────────────────────────────
const API_ENDPOINT = "/api/leads/automation-audit";

const BRAND = {
    primary: "#00AEEF", // Bright Blue
    accent: "#8DC63F", // Energetic Green
    gray900: "#333333",
    gray050: "#F2F2F2",
    yellow: "#FFD700",
};

const PLATFORMS = ["Instagram", "Facebook", "TikTok", "LinkedIn", "YouTube", "Email", "Website", "Other"] as const;
const GOALS = ["More inbound leads", "Consistent posting", "Faster follow-up", "Client onboarding automation", "Reporting/analytics", "Reduce manual work"] as const;
const TIMELINES = ["ASAP (this month)", "30–60 days", "90 days", "Exploring"] as const;
const BUDGETS = ["<$500/mo", "$500–$1.5k/mo", "$1.5k–$3k/mo", "$3k+/mo"] as const;

// ────────────────────────────────────────────────────────────────────────────────
// Validation
// ────────────────────────────────────────────────────────────────────────────────

// Helpers
const nullableTrimmedString = z
    .string()
    .nullable()
    .transform((v) => (v ?? "").trim())
    .transform((v) => (v === "" ? null : v));

const nullableEnum = <T extends readonly [string, ...string[]]>(values: T) =>
    z.enum(values).nullable().transform((v) => (v ?? null));

// Phone regex
const PHONE_REGEX =
    /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const auditLeadSchema = z
    .object({
        // Step 1 — Contact
        fullName: z.string().min(2, "Please enter your name"),
        email: z.string().email("Add a valid email"),

        phone: z
            .string()
            .nullable()
            .transform((v) => (v ?? "").trim())
            .transform((v) => (v === "" ? null : v))
            .refine(
                (v) => v === null || PHONE_REGEX.test(v),
                { message: "Use a valid US phone (optional)" }
            ),

        company: nullableTrimmedString,
        website: nullableTrimmedString.refine(
            (v) => {
                if (v === null) return true;
                return /^https?:\/\//i.test(v) || /\./.test(v);
            },
            { message: "Add a valid URL (optional)" }
        ),

        // Step 2 — Audit Basics
        platforms: z.array(z.enum(PLATFORMS)).min(1, "Select at least 1 platform"),
        avgPostsPerWeek: nullableTrimmedString,
        hasCRM: z
            .enum(["yes", "no", "not_sure"])
            .nullable()
            .transform((v) => v ?? null),
        tools: nullableTrimmedString,

        // Step 3 — Priorities
        goals: z.array(z.enum(GOALS)).min(1, "Pick at least one priority"),
        timeline: z.enum(TIMELINES),

        budget: nullableEnum(BUDGETS),
        notes: nullableTrimmedString,

        // System fields
        utm_source: nullableTrimmedString,
        utm_medium: nullableTrimmedString,
        utm_campaign: nullableTrimmedString,
        referrer: nullableTrimmedString,
        honey: nullableTrimmedString,

        privacyAccepted: z
            .boolean()
            .refine((v) => v === true, "Please accept the privacy notice"),
    })
    .refine((d) => !d.honey, {
        message: "Bot detected",
        path: ["honey"],
    });


export interface AuditLeadForm {
    // Required / non-nullables
    fullName: string;
    email: string;
    platforms: (
        "Instagram" |
        "Facebook" |
        "TikTok" |
        "LinkedIn" |
        "YouTube" |
        "Email" |
        "Website" |
        "Other"
    )[];
    goals: (
        "More inbound leads" |
        "Consistent posting" |
        "Faster follow-up" |
        "Client onboarding automation" |
        "Reporting/analytics" |
        "Reduce manual work"
    )[];
    timeline: "ASAP (this month)" | "30–60 days" | "90 days" | "Exploring";
    privacyAccepted: boolean;

    // Nullable instead of purely optional
    phone: string | null;
    company: string | null;
    website: string | null;
    avgPostsPerWeek: string | null;
    hasCRM: "yes" | "no" | "not_sure" | null;
    tools: string | null;
    budget: (typeof BUDGETS)[number] | null;
    notes: string | null;

    // System / tracking fields
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    referrer: string | null;
    honey: string | null;
}


// ────────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────────

async function submitLead(payload: AuditLeadForm) {
    const res = await submitAuditLead(payload);
    if (!res?.success) {
        throw new Error(res?.message || "Failed to submit audit lead.");
    }
    return res;
}


const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const card = "bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-black/5";
const chip = "inline-flex items-center rounded-full border px-3 py-1 text-sm";

// ────────────────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────────────────
export default function AutomationAuditLeadPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [isPending, startTransition] = useTransition();
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const urlParams = useMemo(() => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""), []);

const {
    register,
    formState: { errors },
    watch,
    getValues,
    handleSubmit,
} = useForm<AuditLeadForm>({
    resolver: zodResolver(auditLeadSchema),
    defaultValues: {
        fullName: "",
        email: "",
        phone: null,
        company: null,
        website: null,
        platforms: [],
        avgPostsPerWeek: null,
        hasCRM: null,
        tools: null,
        goals: [],
        timeline: "Exploring",
        budget: null,
        notes: null,
        privacyAccepted: false,
        utm_source: urlParams.get("utm_source") ?? null,
        utm_medium: urlParams.get("utm_medium") ?? null,
        utm_campaign: urlParams.get("utm_campaign") ?? null,
        referrer: typeof document !== "undefined" ? document.referrer ?? null : null,
        honey: null,
    },
    mode: "onTouched",
});


    // Progressive step guarding
    useEffect(() => {
        if (step === 2) {
            // Ensure contact fields present
            const name = watch("fullName");
            const email = watch("email");
            if (!name || !email) setStep(1);
        }
        if (step === 3) {
            const platforms = watch("platforms");
            if (!platforms || platforms.length === 0) setStep(2);
        }
    }, [step, watch]);

    // Final submit handler (validates first, then uses getValues -> server action)
    const onSubmit = () => {
        setError(null);
        startTransition(async () => {
            try {
                const data = getValues();           // <- per your requirement
                await submitLead(data);             // <- uses server action under the hood
                setDone(true);
            } catch (e: any) {
                setError(e?.message || "Something went wrong");
            }
        });
    };

    if (done) {
        return (
            <main className="min-h-screen  bg-black"
            //  style={{
            //     // background gradient echoing brand colors
            //     ['--bg' as any]: `radial-gradient(1200px 600px at 20% -10%, ${BRAND.primary}10 0%, transparent 60%), radial-gradient(900px 500px at 100% 10%, ${BRAND.accent}14 0%, transparent 55%), ${BRAND.gray050} `, 
            // }}
            >
                <section className="max-w-5xl mx-auto px-6 py-20">
                    <motion.div {...fadeUp} className={`${card} text-center`}>
                        <h1 className="text-3xl font-semibold tracking-tight">Booked for review ✅</h1>
                        <p className="mt-3 text-gray-700">
                            We received your request for an Automation & Social Audit. Expect an intro email with next steps.
                        </p>
                        <p className="mt-1 text-gray-700">Want to move fast? Reply to the email with a link to your most active profile.</p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <span className={`${chip} border-black/10`}>Avg. 3–5 hrs saved / week in first month</span>
                            <span className={`${chip} border-black/10`}>Playbooks + prioritized roadmap included</span>
                            <span className={`${chip} border-black/10`}>No-pitch, value-first review</span>
                        </div>
                    </motion.div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[--bg] bg-black" style={{
            // // background gradient echoing brand colors
            // ['--bg' as any]: `radial-gradient(1200px 600px at 20% -10%, ${BRAND.primary}10 0%, transparent 60%), radial-gradient(900px 500px at 100% 10%, ${BRAND.accent}14 0%, transparent 55%), ${BRAND.gray050}`,
        }}>
            {/* Hero */}
            <section className="max-w-6xl mx-auto px-6 pt-16 pb-6 sm:pt-24">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <motion.div {...fadeUp}>
                        <div className="inline-flex items-center gap-2 rounded-full bg-black/80 text-white px-3 py-1 text-xs">
                            <span className="h-2 w-2 rounded-full bg-green-400" /> Live workflow teardown + roadmap
                        </div>
                        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-[1.1] text-[--h1]" style={{ ['--h1' as any]: BRAND.gray900 }}>
                            Free Automation & Social Audit
                        </h1>
                        <p className="mt-4 text-lg text-gray-700">
                            Uncover the <span className="font-semibold">3 fastest automations</span> for your brand, plus a 30‑day posting blueprint.
                        </p>
                        <ul className="mt-6 space-y-2 text-gray-700">
                            <li className="flex items-start gap-3"><Check /> Personalized teardown of your current stack</li>
                            <li className="flex items-start gap-3"><Check /> Quick wins to ship this week</li>
                            <li className="flex items-start gap-3"><Check /> Plug‑and‑play templates & SOPs</li>
                        </ul>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <TrustBadge>Privacy-first. No spam.</TrustBadge>
                            <TrustBadge>Avg. response: under 24 hrs</TrustBadge>
                            <TrustBadge>Detroit‑based, remote friendly</TrustBadge>
                        </div>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div {...fadeUp} className={card}>
                        <Progress step={step} />
                        <form className="mt-6 text-black">
                            {step === 1 && (
                                <div className="space-y-4">
                                    <Input label="Full name" required error={errors.fullName?.message} {...register("fullName")} />
                                    <Input label="Work email" type="email" required error={errors.email?.message} {...register("email")} />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input label="Phone (optional)" placeholder="(555) 555‑5555"  {...register("phone")} />
                                        <Input label="Company (optional)" {...register("company")} />
                                    </div>
                                    <Input label="Website (optional)" placeholder="https://yourdomain.com" error={errors.website?.message} {...register("website")} />

                                    <div className="mt-2 flex justify-between gap-3">
                                        <button type="button" className="btn-secondary" onClick={() => setStep(2)}>Next</button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-5">
                                    <fieldset>
                                        <Legend>Where are you active?</Legend>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {PLATFORMS.map((p) => (
                                                <label key={p} className="select-chip">
                                                    <input type="checkbox" value={p} className="peer mr-1" {...register("platforms")} />
                                                    <span className="chip-ui">{p}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <ErrorText msg={errors.platforms?.message as string} />
                                    </fieldset>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input label="Avg. posts per week" placeholder="e.g., 3" {...register("avgPostsPerWeek")} />
                                        <Select label="Do you use a CRM?" {...register("hasCRM")}>
                                            <option value="">Select…</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                            <option value="not_sure">Not sure</option>
                                        </Select>
                                    </div>
                                    <Input label="Tools in use (optional)" placeholder="e.g., Buffer, HubSpot, Airtable" {...register("tools")} />

                                    <div className="flex justify-between">
                                        <button type="button" className="btn-ghost" onClick={() => setStep(1)}>Back</button>
                                        <button type="button" className="btn-secondary" onClick={() => setStep(3)}>Next</button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-5">
                                    <fieldset>
                                        <Legend>Your top priorities</Legend>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {GOALS.map((g) => (
                                                <label key={g} className="select-chip">
                                                    <input type="checkbox" value={g} className="peer mr-1 text-black" {...register("goals")} />
                                                    <span className="chip-ui">{g}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <ErrorText msg={errors.goals?.message as string} />
                                    </fieldset>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Select label="Timeline" required {...register("timeline")}>
                                            <option value="">Select…</option>
                                            {TIMELINES.map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </Select>
                                        <Select label="Budget (optional)" {...register("budget")}>
                                            <option value="">Select…</option>
                                            {BUDGETS.map((b) => (
                                                <option key={b} value={b}>{b}</option>
                                            ))}
                                        </Select>
                                    </div>

                                    <Textarea label="Anything we should know? (optional)" rows={4} {...register("notes")} />

                                    {/* Privacy + Honeypot */}
                                    <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden   {...register("honey")} />
                                    <label className="flex items-start gap-3 text-sm text-gray-700">
                                        <input type="checkbox" className="mt-1" {...register("privacyAccepted")} />
                                        <span>
                                            I agree to the processing of my info to receive an audit and follow‑up resources.
                                            <span className="block text-gray-500">We don’t sell data. Ever.</span>
                                        </span>
                                    </label>
                                    <ErrorText msg={errors.privacyAccepted?.message as string} />

                                    {error && (
                                        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-800 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <button type="button" className="btn-ghost" onClick={() => setStep(2)}>Back</button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleSubmit(onSubmit)(); // RHF validate -> onSubmit -> getValues -> server action
                                            }}
                                            className="btn-primary"
                                            disabled={isPending}
                                        >
                                            {isPending ? "Submitting…" : "Get my audit"}
                                        </button>

                                    </div>
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* What you get */}
            <section className="max-w-6xl mx-auto px-6 pb-14">
                <motion.div {...fadeUp} className="grid md:grid-cols-3 gap-5">
                    <ValueCard title="Signal over noise" desc="We isolate high‑leverage fixes that create momentum fast." />
                    <ValueCard title="Playbooks included" desc="Templates, SOPs, and examples ready to plug into your stack." />
                    <ValueCard title="Roadmap ready" desc="A 30‑60‑90 plan aligned to your brand voice and goals." />
                </motion.div>
            </section>

            {/* Social proof / FAQs */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                <motion.div {...fadeUp} className={`${card} grid md:grid-cols-2 gap-10`}>
                    <div>
                        <h3 className="text-xl font-semibold">Common questions</h3>
                        <ul className="mt-4 space-y-3 text-gray-700">
                            <li>
                                <strong>Is this a sales call?</strong>
                                <br />No — it’s a value‑first review with clear takeaways. If you want help implementing, we’ll talk options.
                            </li>
                            <li>
                                <strong>How long does it take?</strong>
                                <br />The form takes ~2 minutes. Your audit summary usually arrives within 1 business day.
                            </li>
                            <li>
                                <strong>What do you review?</strong>
                                <br />Posting cadence, message clarity, automations, follow‑ups, and analytics.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Quick credibility</h3>
                        <ul className="mt-4 space-y-2 text-gray-700">
                            <li className="flex items-start gap-2"><Check /> Built posting engines, CRM automations, and AI helpers</li>
                            <li className="flex items-start gap-2"><Check /> Clean architecture and systems design mindset</li>
                            <li className="flex items-start gap-2"><Check /> Detroit roots — community and craft matter</li>
                        </ul>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}

// ────────────────────────────────────────────────────────────────────────────────
// UI Primitives
// ────────────────────────────────────────────────────────────────────────────────
function Progress({ step }: { step: 1 | 2 | 3 }) {
    return (
        <div className="flex items-center gap-2" aria-label={`Step ${step} of 3`}>
            {[1, 2, 3].map((s) => (
                <div key={s} className={`h-2 w-full rounded-full ${s <= step ? "bg-black/80" : "bg-black/10"}`} />
            ))}
        </div>
    );
}

function TrustBadge({ children }: React.PropsWithChildren) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {children}
        </div>
    );
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 shadow-sm">
            <h4 className="font-semibold">{title}</h4>
            <p className="mt-1 text-gray-700 text-sm">{desc}</p>
        </div>
    );
}

const baseInput =
    "w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-[--ring]";

function Input(
    props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; required?: boolean }
) {
    const { label, error, required, ...rest } = props;
    return (
        <label className="block">
            {label && (
                <span className="mb-1 block text-sm font-medium text-gray-800">
                    {label} {required && <span className="text-red-500" aria-hidden>*</span>}
                </span>
            )}
            <input {...rest} className={baseInput} style={{ ['--ring' as any]: BRAND.primary }} />
            {error && <ErrorText msg={error} />}
        </label>
    );
}

function Textarea(
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }
) {
    const { label, error, ...rest } = props;
    return (
        <label className="block">
            {label && <span className="mb-1 block text-sm font-medium text-gray-800">{label}</span>}
            <textarea {...rest} className={baseInput} style={{ ['--ring' as any]: BRAND.primary }} />
            {error && <ErrorText msg={error} />}
        </label>
    );
}

function Select(
    props: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string; required?: boolean }
) {
    const { label, error, required, ...rest } = props;
    return (
        <label className="block">
            {label && (
                <span className="mb-1 block text-sm font-medium text-gray-800">
                    {label} {required && <span className="text-red-500" aria-hidden>*</span>}
                </span>
            )}
            <select {...rest} className={baseInput} style={{ ['--ring' as any]: BRAND.primary }} />
            {error && <ErrorText msg={error} />}
        </label>
    );
}

function Legend({ children }: React.PropsWithChildren) {
    return <div className="mb-2 text-sm font-medium text-gray-900">{children}</div>;
}

function ErrorText({ msg }: { msg?: string }) {
    if (!msg) return null;
    return <p className="mt-1 text-xs text-red-600">{msg}</p>;
}

function Check() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ────────────────────────────────────────────────────────────────────────────────
// Tailwind helper classes (co-located for ease)
// Add these to your global styles if you prefer.
// ────────────────────────────────────────────────────────────────────────────────
// .btn-primary { @apply inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 font-medium shadow-sm hover:opacity-90 active:opacity-80; }
// .btn-secondary { @apply inline-flex items-center justify-center rounded-xl bg-[--btn2] text-black px-4 py-2 font-medium border border-black/10; }
// .btn-ghost { @apply inline-flex items-center justify-center rounded-xl px-4 py-2 text-gray-700 hover:bg-black/5; }
// .select-chip .chip-ui { @apply inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm transition; }
// .select-chip .peer:checked + .chip-ui { @apply bg-black text-white border-black; }
// Where used: .btn-secondary uses --btn2 and inputs use --ring
// You can set them via :root or inline; here we inherit brand colors from BRAND const.
