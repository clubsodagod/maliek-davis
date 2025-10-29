import { lunchBoxLogo } from "@/library/brand.const";
import { Html, Heading, Text } from "@react-email/components";
import * as React from "react";

/* ──────────────────────────────────────────────────────────────────────────
 * Utilities
 * ────────────────────────────────────────────────────────────────────────── */

function fmtMoney(amount?: number | null, currency?: string | null) {
    if (amount == null) return "-";
    const cur = (currency || "usd").toUpperCase();
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: cur,
        minimumFractionDigits: 2,
    }).format(amount / 100);
}

function fmtDateTime(epochSeconds?: number) {
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

function fmtTime(epochSeconds?: number) {
    if (!epochSeconds) return "";
    const d = new Date(epochSeconds * 1000);
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function between(a?: number, b?: number) {
    if (!a || !b) return "";
    return `${fmtTime(a)} – ${fmtTime(b)}`;
}

function timeBadgeColor(priority?: NewOrderEmailProps["priority"]) {
    switch (priority) {
        case "rush":
            return "#ef4444"; // red-500
        case "high":
            return "#f59e0b"; // amber-500
        default:
            return "#10b981"; // emerald-500
    }
}

/* ──────────────────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────────────────── */

export interface KitchenModifier {
    label: string;       // e.g., "Sauce"
    value: string;       // e.g., "Yum Yum"
}

export interface KitchenLineItem {
    id: string;
    name: string;        // e.g., "Salmon Bites"
    size?: string | null;// e.g., "Large"
    station?: string | null; // e.g., "Fry", "Grill"
    quantity: number;
    unit_amount?: number | null;     // cents
    notes?: string | null;           // customer notes for this item
    modifiers?: KitchenModifier[];   // options, sauces, sides
}

export interface NewOrderEmailProps {
    orderId: string;
    created: number;                   // epoch secs
    currency: string;

    // Fulfillment
    fulfillment: "pickup" | "delivery";
    pickupName?: string | null;
    pickupPhone?: string | null;
    deliveryAddress?: {
        line1?: string | null;
        line2?: string | null;
        city?: string | null;
        state?: string | null;
        postal_code?: string | null;
    } | null;

    // Timing
    scheduledWindow?: { start: number; end: number } | null; // epoch secs
    estimatedReadyAt?: number | null;                         // epoch secs
    priority?: "normal" | "high" | "rush";

    // Items
    lineItems: KitchenLineItem[];

    // Totals (for quick glance)
    amountSubtotal: number;
    amountTax?: number | null;
    amountFees?: number | null; // delivery or service fee
    amountTip?: number | null;
    amountTotal: number;

    // Meta
    paymentStatus?: "paid" | "unpaid" | "refunded";
    kitchenNotes?: string | null;      // order-level special instructions
    brandName?: string;                // defaults to "The Lunch Box"
}

/* ──────────────────────────────────────────────────────────────────────────
 * Styles
 * ────────────────────────────────────────────────────────────────────────── */

const pageWrap: React.CSSProperties = {
    fontFamily: "sans-serif",
    padding: "32px",
    backgroundColor: "#f5f5f5",
    backgroundImage: `url(${lunchBoxLogo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    textAlign: "left",
};


const container: React.CSSProperties = { maxWidth: 720, margin: "0 auto" };

const titleStyle: React.CSSProperties = {
    color: "#111827",
    margin: 0,
    fontSize: 24,
    lineHeight: 1.25,
};

const badge: React.CSSProperties = {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 999,
    fontSize: 12,
    lineHeight: "18px",
    color: "#fff",
    fontWeight: 700,
};

const card: React.CSSProperties = {
    background: "#fff",
    borderRadius: 10,
    padding: "18px 20px",
    boxShadow: "0 1px 2px rgba(16,24,40,0.06)",
    marginTop: 14,
};

const metaGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0,1fr))",
    gap: 12,
};

const metaLabel: React.CSSProperties = { color: "#6b7280", fontSize: 12 };
const metaValue: React.CSSProperties = { color: "#111827", fontSize: 14, fontWeight: 600 };

const itemsHeaderRow: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "46px 1fr 180px",
    gap: 10,
    color: "#6b7280",
    fontSize: 12,
};

const itemRow: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "46px 1fr 180px",
    gap: 10,
    padding: "10px 0",
    borderBottom: "1px solid #eee",
    alignItems: "start",
};

const qtyPill: React.CSSProperties = {
    display: "inline-block",
    minWidth: 36,
    textAlign: "center",
    borderRadius: 999,
    background: "#111827",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: "28px",
};

const itemName: React.CSSProperties = { color: "#111827", fontSize: 14, fontWeight: 700 };
const itemSubtle: React.CSSProperties = { color: "#6b7280", fontSize: 12, marginTop: 2, whiteSpace: "pre-line" };

const totalsGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 8,
    marginTop: 8,
    alignItems: "center",
};

const totalLabel: React.CSSProperties = { color: "#374151", fontSize: 14 };
const totalValue: React.CSSProperties = { color: "#111827", fontSize: 14, fontWeight: 700 };
const mockOrderProps: NewOrderEmailProps = {
    orderId: "LBX-1027",
    created: 1730000000, // epoch seconds
    currency: "usd",
    fulfillment: "pickup",
    pickupName: "Taylor Brooks",
    pickupPhone: "(248) 555-7621",
    deliveryAddress: {
        line1: "1245 W Grand Blvd",
        line2: "Unit 2A",
        city: "Detroit",
        state: "MI",
        postal_code: "48208",
    },
    scheduledWindow: {
        start: 1730001800, // +30 min
        end: 1730003600,   // +60 min
    },
    estimatedReadyAt: 1730002400, // +40 min
    priority: "rush",
    lineItems: [
        {
            id: "itm_wings",
            name: "Crispy Wings",
            size: "6 Pieces",
            station: "Fry",
            quantity: 2,
            unit_amount: 999,
            notes: "One order mild, one hot.",
            modifiers: [
                { label: "Sauce", value: "Parmesan Garlic" },
                { label: "Side", value: "Fermented Fries" },
            ],
        },
        {
            id: "itm_salmon",
            name: "Salmon Bites",
            size: "Large",
            station: "Grill",
            quantity: 1,
            unit_amount: 1499,
            notes: "Extra sauce cup.",
            modifiers: [
                { label: "Side", value: "Garlic Mash" },
                { label: "Sauce", value: "Yum Yum" },
            ],
        },
        {
            id: "itm_sweet_corn",
            name: "Sweet Corn",
            station: "Prep",
            quantity: 3,
            unit_amount: 499,
        },
    ],
    amountSubtotal: 999 * 2 + 1499 + 499 * 3, // $59.94
    amountTax: 360,   // $3.60
    amountFees: 0,    // pickup
    amountTip: 500,   // $5.00
    amountTotal: 6594, // $65.94
    paymentStatus: "paid",
    kitchenNotes:
        "Customer asked for extra napkins and utensils. Rush this order for pickup within 30 minutes.",
    brandName: "The Lunch Box",
};
/* ──────────────────────────────────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────────────────────────────────── */

const NewOrderEmail: React.FC<NewOrderEmailProps> = () => {
    const {
        orderId,
        created,
        currency,
        fulfillment,
        pickupName,
        pickupPhone,
        deliveryAddress,
        scheduledWindow,
        estimatedReadyAt,
        priority = "normal",
        lineItems,
        amountSubtotal,
        amountTax,
        amountFees,
        amountTip,
        amountTotal,
        paymentStatus = "paid",
        kitchenNotes,
        brandName = "The Lunch Box",
    } = mockOrderProps;

    const priColor = timeBadgeColor(priority);
    const fulfillmentBadge =
        fulfillment === "pickup"
            ? { text: "PICKUP", color: "#3b82f6" } // blue-500
            : { text: "DELIVERY", color: "#9333ea" }; // purple-600

    const addressBlock = deliveryAddress
        ? [deliveryAddress.line1, deliveryAddress.line2, [deliveryAddress.city, deliveryAddress.state].filter(Boolean).join(", "), deliveryAddress.postal_code]
            .filter(Boolean)
            .join("\n")
        : "";

    return (
        <Html>
            <div style={pageWrap}>
                <div style={container}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                        <Heading as="h2" style={titleStyle}>
                            New Order — #{orderId}
                        </Heading>
                        <span style={{ ...badge, background: priColor }}> {priority.toUpperCase()} </span>
                        <span style={{ ...badge, background: fulfillmentBadge.color }}> {fulfillmentBadge.text} </span>
                        <span
                            style={{
                                ...badge,
                                background: paymentStatus === "paid" ? "#10b981" : paymentStatus === "refunded" ? "#6b7280" : "#ef4444",
                            }}
                        >
                            {paymentStatus.toUpperCase()}
                        </span>
                    </div>

                    {/* Meta */}
                    <div style={card}>
                        <div style={metaGrid}>
                            <div>
                                <div style={metaLabel}>Created</div>
                                <div style={metaValue}>{fmtDateTime(created)}</div>
                            </div>
                            <div>
                                <div style={metaLabel}>Ready Window</div>
                                <div style={metaValue}>
                                    {scheduledWindow ? between(scheduledWindow.start, scheduledWindow.end) : estimatedReadyAt ? fmtTime(estimatedReadyAt) : "ASAP"}
                                </div>
                            </div>
                            <div>
                                <div style={metaLabel}>Contact</div>
                                <div style={metaValue}>
                                    {pickupName || "—"}
                                    {pickupPhone ? ` • ${pickupPhone}` : ""}
                                </div>
                            </div>
                            {fulfillment === "delivery" && (
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <div style={metaLabel}>Delivery Address</div>
                                    <div style={{ ...metaValue, whiteSpace: "pre-line", fontWeight: 500 }}>{addressBlock || "—"}</div>
                                </div>
                            )}
                            {kitchenNotes && (
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <div style={metaLabel}>Order Notes</div>
                                    <div style={{ ...metaValue, whiteSpace: "pre-line" }}>{kitchenNotes}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Items */}
                    <div style={card}>
                        <div style={itemsHeaderRow}>
                            <div>Qty</div>
                            <div>Item</div>
                            <div>Station / Notes</div>
                        </div>
                        <div style={{ height: 1, background: "#eee", margin: "10px 0" }} />
                        {lineItems.map((li) => (
                            <div key={li.id} style={itemRow}>
                                <div>
                                    <span style={qtyPill}>{li.quantity}</span>
                                </div>

                                <div>
                                    <div style={itemName}>
                                        {li.name}
                                        {li.size ? ` — ${li.size}` : ""}
                                    </div>
                                    {typeof li.unit_amount === "number" && (
                                        <div style={itemSubtle}>{fmtMoney(li.unit_amount, currency)} each</div>
                                    )}
                                    {!!li.modifiers?.length && (
                                        <div style={itemSubtle}>
                                            {li.modifiers
                                                .map((m) => (m.label ? `${m.label}: ${m.value}` : m.value))
                                                .join(" • ")}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    {li.station ? <div style={{ ...badge, background: "#0ea5e9" }}>{li.station.toUpperCase()}</div> : null}
                                    {li.notes ? <div style={{ ...itemSubtle, marginTop: 6 }}>{li.notes}</div> : null}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Totals (quick glance for pack-out/verification) */}
                    <div style={card}>
                        <div style={totalsGrid}>
                            <div style={totalLabel}>Subtotal</div>
                            <div style={totalValue}>{fmtMoney(amountSubtotal, currency)}</div>

                            {typeof amountTax === "number" && (
                                <>
                                    <div style={totalLabel}>Tax</div>
                                    <div style={totalValue}>{fmtMoney(amountTax, currency)}</div>
                                </>
                            )}

                            {typeof amountFees === "number" && (
                                <>
                                    <div style={totalLabel}>{fulfillment === "delivery" ? "Delivery Fee" : "Fees"}</div>
                                    <div style={totalValue}>{fmtMoney(amountFees, currency)}</div>
                                </>
                            )}

                            {typeof amountTip === "number" && amountTip > 0 && (
                                <>
                                    <div style={totalLabel}>Tip</div>
                                    <div style={totalValue}>{fmtMoney(amountTip, currency)}</div>
                                </>
                            )}

                            <div style={{ height: 1, background: "#eee", gridColumn: "1 / -1", margin: "6px 0" }} />

                            <div style={{ ...totalLabel, fontWeight: 800 }}>Total</div>
                            <div style={{ ...totalValue, fontWeight: 800 }}>{fmtMoney(amountTotal, currency)}</div>
                        </div>
                        <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 10 }}>
                            {brandName} • Verify items & labels before handoff.
                        </Text>
                    </div>
                </div>
            </div>
        </Html>
    );
};

export default NewOrderEmail;
