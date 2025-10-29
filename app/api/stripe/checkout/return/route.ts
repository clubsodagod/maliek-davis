/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { stripe } from "@/utility/stripe/helpers/stripe";
import buildReceiptEmailProps from "@/utility/buildReceiptEmailProps";
import { sendCustomerReceiptEmail } from "@/utility/sendCustomerReceiptEmailLunchBox";

/**
 * GET /api/the-lunch-box/checkout/return?session_id=...
 * - Retrieves the Stripe session securely on the server
 * - Optionally sends the receipt email when status === "complete"
 * - Returns a small JSON payload for the client page to render
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const session_id = searchParams.get("session_id");

        if (!session_id) {
            return NextResponse.json(
                { status: "error", message: "Missing session_id" },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: [
                "line_items",
                "payment_intent",
                "payment_intent.charges.data.payment_method_details",
            ],
        });

        if (session.status === "open") {
            return NextResponse.json({ status: "open" });
        }

        if (session.status === "complete") {
            // Build props for your React Email template
            const props = buildReceiptEmailProps(session);

            // OPTIONAL: send the email here (uncomment when ready)
            await sendCustomerReceiptEmail(props, {
                bcc: ["self@maliek-davis.com", "maliekjdavis24@gmail.com", "jacaristevenson2003@gmail.com"],
                from: "orders@maliek-davis.com",
                replyTo: "self@maliek-davis.com",
                subject: `Your Order Receipt — ${props.sessionId}`,
            });

            return NextResponse.json({
                status: "complete",
                customer_email: session.customer_details?.email ?? null,
            });
        }

        // Fallback for any unexpected terminal state
        return NextResponse.json(
            { status: "error", message: `Unexpected status: ${session.status}` },
            { status: 500 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { status: "error", message: err?.message ?? "Internal error" },
            { status: 500 }
        );
    }
}
