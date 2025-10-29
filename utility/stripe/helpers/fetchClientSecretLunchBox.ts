// app/actions/stripe/fetchClientSecretLunchBox.ts
"use server";

import { headers } from "next/headers";
import { stripe } from "./stripe";

export type StripeLineItemInput = {
    priceId: string; // PriceOption.id (the Stripe Price ID)
    qty: number;
};

export async function fetchClientSecretLunchBox(items: StripeLineItemInput[]) {
    const origin = (await headers()).get("origin") ?? "";

    // Defensive filtering
    const line_items = items
        .filter((it) => it.priceId && it.qty > 0)
        .map((it) => ({
            price: it.priceId,      // <-- the Stripe Price ID from your PriceOption.id
            quantity: it.qty,
        }));

    if (line_items.length === 0) {
        throw new Error("No valid line items provided.");
    }

    const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items,
        mode: "payment",
        return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return session.client_secret || "";
}
