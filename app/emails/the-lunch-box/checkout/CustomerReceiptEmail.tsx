import { lunchBoxLogo } from "@/library/brand.const";
import { Html, Heading, Text } from "@react-email/components";
import * as React from "react";

/** Utility: format amounts from Stripe (integer cents) */
function fmt(amount: number | null | undefined, currency: string | null | undefined) {
    if (amount == null) return "-";
    // Stripe uses lowercase ISO currency codes, default to USD if missing
    const cur = (currency || "usd").toUpperCase();
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: cur,
        minimumFractionDigits: 2,
    }).format(amount / 100);
}

/** Utility: date formatting (created is epoch seconds from Stripe) */
function fmtDate(epochSeconds?: number) {
    if (!epochSeconds) return "";
    const d = new Date(epochSeconds * 1000);
    return d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
    });
}

export interface ReceiptLineItem {
    id: string;
    description: string;
    quantity: number;
    unit_amount?: number | null;      // cents
    amount_subtotal?: number | null;  // cents
    amount_total?: number | null;     // cents
}

export interface CustomerReceiptEmailProps {
    /** Stripe */
    sessionId: string;
    created: number; // epoch seconds
    currency: string;

    /** Totals (cents) */
    amountSubtotal: number;
    amountTotal: number;
    amountTax?: number;
    amountShipping?: number;
    amountDiscount?: number;

    /** Customer */
    customerEmail?: string | null;
    customerName?: string | null;
    customerPhone?: string | null;

    /** Payment summary (optional but nice) */
    paymentBrand?: string | null; // e.g., "visa"
    paymentLast4?: string | null; // e.g., "4242"

    /** Addresses (optional) */
    billingAddress?: {
        line1?: string | null;
        line2?: string | null;
        city?: string | null;
        state?: string | null;
        postal_code?: string | null;
    } | null;

    shippingAddress?: {
        name?: string | null;
        line1?: string | null;
        line2?: string | null;
        city?: string | null;
        state?: string | null;
        postal_code?: string | null;
    } | null;

    /** Items */
    lineItems: ReceiptLineItem[];

    /** Business info for footer/support */
    supportEmail?: string; // e.g., "orders@example.com"
    businessName?: string; // e.g., "The Lunch Box"
}

const rowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr auto auto",
    gap: "8px",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
    alignItems: "center",
};

const labelStyle: React.CSSProperties = { color: "#555", fontSize: 14 };
const valStyle: React.CSSProperties = { color: "#111", fontSize: 14, textAlign: "right" };

const sectionCard: React.CSSProperties = {
    background: "#fff",
    borderRadius: 8,
    padding: "20px",
    boxShadow: "0 1px 2px rgba(16,24,40,0.06)",
    marginBottom: 16,
};

const smallMuted: React.CSSProperties = { color: "#666", fontSize: 12, lineHeight: 1.5 };

const titleStyle: React.CSSProperties = {
    color: "#60abe4",
    margin: 0,
    fontSize: 24,
    lineHeight: 1.25,
};

const subtle: React.CSSProperties = { color: "#666" };

const divider: React.CSSProperties = { height: 1, background: "#eee", margin: "12px 0" };

const addressBlock: React.CSSProperties = { whiteSpace: "pre-line", fontSize: 14, color: "#333" };

const CustomerReceiptEmail: React.FC<CustomerReceiptEmailProps> = (props) => {
    const {
        sessionId,
        created,
        currency,
        amountSubtotal,
        amountTotal,
        amountTax,
        amountShipping,
        amountDiscount,
        customerEmail,
        customerName,
        customerPhone,
        paymentBrand,
        paymentLast4,
        billingAddress,
        shippingAddress,
        lineItems,
        supportEmail = "orders@example.com",
        businessName = "Your Business",
    } = props;

    const paymentLine =
        paymentBrand && paymentLast4
            ? `${paymentBrand.toUpperCase()} •••• ${paymentLast4}`
            : paymentBrand
                ? paymentBrand.toUpperCase()
                : undefined;

    const fmtAddr = (a?: CustomerReceiptEmailProps["billingAddress"] | null) =>
        a
            ? [a.line1, a.line2, [a.city, a.state].filter(Boolean).join(", "), a.postal_code]
                .filter(Boolean)
                .join("\n")
            : "";

    return (
        <Html>
            <div
                style={{
                    fontFamily: "sans-serif",
                    padding: "40px",
                    backgroundColor: "#f5f5f5",
                    backgroundImage: lunchBoxLogo,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    textAlign: "left",
                }}
            >
                <div style={{ maxWidth: 600, margin: "0 auto" }}>
                    <Heading as="h2" style={titleStyle}>
                        Thanks for your order{customerName ? `, ${customerName}` : ""}!
                    </Heading>
                    <Text style={{ fontSize: 16, lineHeight: 1.6, color: "#333", marginTop: 8 }}>
                        We’ve received your payment and your receipt is below.
                    </Text>

                    {/* Order Meta */}
                    <div style={{ ...sectionCard }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div>
                                <div style={{ ...smallMuted, marginBottom: 4 }}>Order Number</div>
                                <div style={{ fontSize: 14, color: "#111" }}>{sessionId}</div>
                            </div>
                            <div>
                                <div style={{ ...smallMuted, marginBottom: 4 }}>Order Date</div>
                                <div style={{ fontSize: 14, color: "#111" }}>{fmtDate(created)}</div>
                            </div>
                            {customerEmail ? (
                                <div>
                                    <div style={{ ...smallMuted, marginBottom: 4 }}>Email</div>
                                    <div style={{ fontSize: 14, color: "#111" }}>{customerEmail}</div>
                                </div>
                            ) : null}
                            {customerPhone ? (
                                <div>
                                    <div style={{ ...smallMuted, marginBottom: 4 }}>Phone</div>
                                    <div style={{ fontSize: 14, color: "#111" }}>{customerPhone}</div>
                                </div>
                            ) : null}
                            {paymentLine ? (
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <div style={{ ...smallMuted, marginBottom: 4 }}>Payment</div>
                                    <div style={{ fontSize: 14, color: "#111" }}>{paymentLine}</div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Items */}
                    <div style={{ ...sectionCard }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, color: "#666", fontSize: 12 }}>
                            <div>Item</div>
                            <div style={{ textAlign: "right" }}>Qty</div>
                            <div style={{ textAlign: "right" }}>Total</div>
                        </div>
                        <div style={{ ...divider }} />
                        {lineItems.map((li) => (
                            <div key={li.id} style={rowStyle}>
                                <div style={{ ...labelStyle }}>
                                    <div style={{ color: "#111", fontSize: 14 }}>{li.description}</div>
                                    {li.unit_amount != null ? (
                                        <div style={{ ...subtle, fontSize: 12 }}>
                                            {fmt(li.unit_amount, currency)} each
                                        </div>
                                    ) : null}
                                </div>
                                <div style={{ ...valStyle }}>{li.quantity}</div>
                                <div style={{ ...valStyle }}>
                                    {fmt(li.amount_total ?? li.amount_subtotal ?? 0, currency)}
                                </div>
                            </div>
                        ))}

                        <div style={{ ...divider }} />

                        {/* Totals */}
                        <div style={{ display: "grid", gap: 8 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center" }}>
                                <div style={labelStyle}>Subtotal</div>
                                <div style={valStyle}>{fmt(amountSubtotal, currency)}</div>
                            </div>
                            {typeof amountShipping === "number" ? (
                                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center" }}>
                                    <div style={labelStyle}>Shipping</div>
                                    <div style={valStyle}>{fmt(amountShipping, currency)}</div>
                                </div>
                            ) : null}
                            {typeof amountTax === "number" ? (
                                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center" }}>
                                    <div style={labelStyle}>Tax</div>
                                    <div style={valStyle}>{fmt(amountTax, currency)}</div>
                                </div>
                            ) : null}
                            {typeof amountDiscount === "number" && amountDiscount > 0 ? (
                                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center" }}>
                                    <div style={labelStyle}>Discount</div>
                                    <div style={valStyle}>- {fmt(amountDiscount, currency)}</div>
                                </div>
                            ) : null}
                            <div style={{ ...divider }} />
                            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center" }}>
                                <div style={{ ...labelStyle, fontWeight: 700, color: "#111" }}>Total</div>
                                <div style={{ ...valStyle, fontWeight: 700 }}>{fmt(amountTotal, currency)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Addresses */}
                    {(billingAddress || shippingAddress) && (
                        <div style={{ display: "grid", gap: 16 }}>
                            {billingAddress && (
                                <div style={{ ...sectionCard }}>
                                    <div style={{ ...smallMuted, marginBottom: 6 }}>Billing Address</div>
                                    <div style={addressBlock}>{fmtAddr(billingAddress)}</div>
                                </div>
                            )}
                            {shippingAddress && (
                                <div style={{ ...sectionCard }}>
                                    <div style={{ ...smallMuted, marginBottom: 6 }}>Shipping To</div>
                                    <div style={{ fontSize: 14, color: "#111", marginBottom: 4 }}>
                                        {shippingAddress.name || ""}
                                    </div>
                                    <div style={addressBlock}>{fmtAddr(shippingAddress)}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{ marginTop: 16 }}>
                        <Text style={{ ...smallMuted }}>
                            This receipt confirms your payment to {businessName}. If you have any questions,
                            reply to this email or contact us at <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
                        </Text>
                    </div>
                </div>
            </div>
        </Html>
    );
};

export default CustomerReceiptEmail;
