// /app/api/checkout/route.ts
import { stripe } from "@/utility/stripe/helpers/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { items } = await req.json(); // items come from the browser
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const line_items = items.map((i: any) => ({ price: i.priceId, quantity: i.qty }));

    const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items,
        mode: "payment",
        return_url: `${req.headers.get("origin")}/the-lunch-box/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
}
