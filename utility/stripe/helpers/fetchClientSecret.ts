"use server";


import { headers } from "next/headers";
import { stripe } from "./stripe";

export async function fetchClientSecret() {
    const origin = (await headers()).get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
                    {
                        price: "price_1SLEJVDHZWd1GpGcGEnRxWMm",
                        quantity: 1
                    },
        ],
        mode: 'payment',
        return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
        // automatic_tax: { enabled: true },
    })
    
    return session.client_secret || ""
}