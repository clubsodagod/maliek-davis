/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReceiptLineItem } from "@/app/emails/the-lunch-box/checkout/CustomerReceiptEmail";
import type Stripe from "stripe";

export default function buildReceiptEmailProps(session: Stripe.Checkout.Session) {
    const currency = session.currency || "usd";
    const totalDetails = session.total_details || ({} as NonNullable<typeof session.total_details>);

    const lineItems: ReceiptLineItem[] =
        (session.line_items?.data || []).map((li) => ({
            id: li.id,
            description:
                li.description ||
                    li.price?.product && li.price && typeof li.price.product === "object"
                    ? (li.price?.product as any)?.name || "Item"
                    : "Item",
            quantity: li.quantity || 1,
            unit_amount: li.price?.unit_amount ?? undefined,
            amount_subtotal: (li as any).amount_subtotal ?? undefined,
            amount_total: (li as any).amount_total ?? undefined,
        })) || [];

// Try to surface basic card info if present
const pi = session.payment_intent as Stripe.PaymentIntent | null | undefined;
const charge = pi && typeof pi !== "string" ? (pi as any).charges?.data?.[0] : undefined;
const pm = charge?.payment_method_details?.card;

// Some Stripe SDK versions use `shipping_details` while others use `shipping` on the Checkout Session.
// Cast to any to access either property at runtime without TypeScript errors.
const shipping = (session as any).shipping_details ?? (session as any).shipping ?? null;

return {
    sessionId: session.id,
    created: session.created,
    currency,
    amountSubtotal: session.amount_subtotal || 0,
    amountTotal: session.amount_total || 0,
    amountTax: totalDetails.amount_tax ?? undefined,
    amountShipping: totalDetails.amount_shipping ?? undefined,
    amountDiscount: totalDetails.amount_discount ?? undefined,
    customerEmail: session.customer_details?.email ?? undefined,
    customerName: session.customer_details?.name ?? undefined,
    customerPhone: session.customer_details?.phone ?? undefined,
    paymentBrand: pm?.brand ?? undefined,
    paymentLast4: pm?.last4 ?? undefined,
    billingAddress: session.customer_details?.address ?? null,
    shippingAddress:
        (shipping?.address
            ? { ...shipping.address, name: shipping?.name || null }
            : null) ?? null,
    lineItems,
    supportEmail: "orders@example.com",
    businessName: "The Lunch Box",
} as const;
}
