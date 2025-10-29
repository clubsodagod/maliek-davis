"use client";

import * as React from "react";
import {
    Drawer,
    Box,
    Stack,
    Typography,
    IconButton,
    Divider,
    Switch,
    FormControlLabel,
    Select,
    MenuItem,
    Button,
    Tooltip,
    Badge,
} from "@mui/material";
import { CloseRounded, ShoppingBasketRounded } from "@mui/icons-material";
import { FadeIn } from "../../_utility";
import OrderLineItem, { OrderLineItemType } from "./OrderLineItem";

export type OrderTotals = {
    subtotalCents: number;
    deliveryFeeCents: number;
    taxCents: number;
    totalCents: number;
};

export type OrderProps = {
    open: boolean;
    onClose: () => void;

    /** Line items to render */
    items: OrderLineItemType[];

    /** Handlers for item actions */
    handleRemoveFromOrder: (id: string | number) => void;
    handleQtyIncrease: (id: string | number) => void;
    handleQtyDecrease: (id: string | number) => void;

    /** Called when user presses "Place Order" */
    handleSubmitOrder?: (payload: {
        items: OrderLineItemType[];
        totals: OrderTotals;
        delivery: boolean;
        slot: string | null; // e.g., "Fri Oct 24 — 12:00–12:15"
    }) => void;

    /** Config */
    deliveryEnabled?: boolean; // default true
    defaultDelivery?: boolean; // default false (pickup)
    deliveryFeeCents?: number; // default 499
    taxRate?: number; // 0.06 = 6% (MI default)

    /**
     * NOTE: Ignored when Delivery is ON because we auto-generate
     * date+time slots per business rules (day-ahead, business hours).
     * Still used elsewhere if you want (kept for backward-compat).
     */
    slots?: string[];

    /** If true, user must pick a slot when delivery is on */
    requireSlotWhenDelivery?: boolean; // default true

    title?: string; // Drawer title
};

const defaultFormatMoney = (cents: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Math.max(0, cents) / 100);

const calcTotals = (
    items: OrderLineItemType[],
    delivery: boolean,
    taxRate: number,
    deliveryFeeCents: number
): OrderTotals => {
    const subtotalCents = items.reduce((sum, it) => sum + Math.max(1, it.qty) * it.priceCents, 0);
    const deliveryFee = delivery ? deliveryFeeCents : 0;
    const taxableBase = subtotalCents + deliveryFee;
    const taxCents = Math.round(taxableBase * taxRate);
    const totalCents = taxableBase + taxCents;
    return { subtotalCents, deliveryFeeCents: deliveryFee, taxCents, totalCents };
};

const TZ = "America/Detroit";


/** Business hours for a given date */
const getOpenCloseForDate = (d: Date): { openHour: number; closeHour: number } => {
    if (isWeekend(d)) return { openHour: 12, closeHour: 18 }; // 12pm–6pm
    return { openHour: 11, closeHour: 18 }; // 11am–6pm
};

/** "Now" in a specific IANA timezone as a Date object */
const nowInTZ = (tz: string) => new Date(new Date().toLocaleString("en-US", { timeZone: tz }));

/** Whether the business is accepting orders right now (by today's hours in TZ) */
const isOrderingOpenNow = (tz: string) => {
    const now = nowInTZ(tz);
    const { openHour, closeHour } = getOpenCloseForDate(now);
    const start = new Date(now);
    start.setHours(openHour, 0, 0, 0);
    const end = new Date(now);
    end.setHours(closeHour, 0, 0, 0);
    return now >= start && now < end;
};
/**
 * Helpers for “schedule a day ahead” with dynamic business hours.
 * Weekdays: 11am–6pm, Weekends: 12pm–6pm. 15-min intervals.
 */
const isWeekend = (d: Date) => {
    const day = d.getDay(); // 0 Sun … 6 Sat
    return day === 0 || day === 6;
};

const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n));

const toLocalDateKey = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const formatHumanDate = (d: Date) =>
    d.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

const to12h = (h24: number, m: number) => {
    const ampm = h24 >= 12 ? "PM" : "AM";
    const h = ((h24 + 11) % 12) + 1; // 0→12, 13→1
    const mm = pad2(m);
    return `${h}:${mm} ${ampm}`;
};

const build15MinWindows = (date: Date): string[] => {
    const { openHour, closeHour } = getOpenCloseForDate(date);
    const start = new Date(date);
    start.setHours(openHour, 0, 0, 0);

    const end = new Date(date);
    end.setHours(closeHour, 0, 0, 0);

    const slots: string[] = [];
    const cursor = new Date(start);

    while (cursor < end) {
        const next = new Date(cursor);
        next.setMinutes(cursor.getMinutes() + 15);

        if (next <= end) {
            const label = `${to12h(cursor.getHours(), cursor.getMinutes())}–${to12h(next.getHours(), next.getMinutes())}`;
            slots.push(label);
        }
        cursor.setMinutes(cursor.getMinutes() + 15);
    }
    return slots;
};

const nextNDatesStartingTomorrow = (n = 7) => {
    const base = new Date();
    // Force "tomorrow" — disallow same-day scheduling
    base.setDate(base.getDate() + 1);
    base.setHours(0, 0, 0, 0);
    const out: { key: string; date: Date; label: string }[] = [];
    for (let i = 0; i < n; i++) {
        const d = new Date(base);
        d.setDate(base.getDate() + i);
        out.push({
            key: toLocalDateKey(d),
            date: d,
            label: formatHumanDate(d),
        });
    }
    return out;
};

const Order: React.FC<OrderProps> = (props) => {
    const {
        open,
        onClose,
        items,
        handleRemoveFromOrder,
        handleQtyIncrease,
        handleQtyDecrease,
        handleSubmitOrder,
        deliveryEnabled = true,
        defaultDelivery = false,
        deliveryFeeCents = 499,
        taxRate = 0.06,
        slots = [],
        requireSlotWhenDelivery = true,
        title = "Your Order",
    } = props;

    const [delivery, setDelivery] = React.useState<boolean>(defaultDelivery);

    // Date options (tomorrow → +7)
    const dateOptions = React.useMemo(() => nextNDatesStartingTomorrow(7), []);
    const [dateKey, setDateKey] = React.useState<string>(dateOptions[0]?.key ?? "");
    const selectedDate = React.useMemo(
        () => dateOptions.find((d) => d.key === dateKey)?.date ?? null,
        [dateKey, dateOptions]
    );
    const dynamicTimeSlots = React.useMemo(() => (selectedDate ? build15MinWindows(selectedDate) : []), [selectedDate]);
    const [timeSlot, setTimeSlot] = React.useState<string>("");

    // Keep timeSlot valid when date changes / drawer opens
    React.useEffect(() => {
        if (open) {
            if (!dateKey && dateOptions.length) setDateKey(dateOptions[0].key);
            setTimeSlot((prev) => (dynamicTimeSlots.includes(prev) ? prev : ""));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, dateKey, dateOptions.length, selectedDate]);

    // --- NEW: live "ordering is open" gate (Detroit time) ---
    const [orderingOpen, setOrderingOpen] = React.useState<boolean>(() => isOrderingOpenNow(TZ));
    React.useEffect(() => {
        // Update on mount, when drawer opens, and every minute
        const update = () => setOrderingOpen(isOrderingOpenNow(TZ));
        update();
        const id = setInterval(update, 60_000);
        return () => clearInterval(id);
    }, [open]);
    // --------------------------------------------------------

    const totals = React.useMemo(() => calcTotals(items, delivery, taxRate, deliveryFeeCents), [
        items,
        delivery,
        taxRate,
        deliveryFeeCents,
    ]);

    const empty = items.length === 0;
    const needsSlot = delivery && requireSlotWhenDelivery;
    const hasValidSlot = !needsSlot || (Boolean(dateKey) && Boolean(timeSlot));

    // Must be open NOW to place an order
    const canSubmit = !empty && hasValidSlot && totals.totalCents > 0 && orderingOpen;

    const onSubmit = () => {
        if (!canSubmit) return;
        const dateLabel = dateOptions.find((d) => d.key === dateKey)?.label ?? "";
        const combinedSlot = needsSlot && dateLabel && timeSlot ? `${dateLabel} — ${timeSlot}` : (slots[0] ?? null);
        handleSubmitOrder?.({ items, totals, delivery, slot: combinedSlot || null });
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: "100%", sm: 440 } } }}>
            {/* Header */}
            <Box sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Badge badgeContent={items.length} color="primary">
                            <ShoppingBasketRounded />
                        </Badge>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {title}
                        </Typography>
                    </Stack>
                    <Tooltip title="Close">
                        <IconButton onClick={onClose} aria-label="close order drawer">
                            <CloseRounded />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>
            <Divider />

            {/* Body */}
            <Stack sx={{ p: 2, gap: 2, flex: 1, overflow: "auto" }}>
                {/* Ordering window notice */}
                {!orderingOpen && (
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: "warning.light",
                            color: "warning.contrastText",
                            border: "1px solid",
                            borderColor: "warning.main",
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            We’re currently closed for ordering.
                        </Typography>
                        <Typography variant="caption">
                            Order hours (America/Detroit): Mon–Fri 11:00 AM–6:00 PM · Sat–Sun 12:00 PM–6:00 PM.
                        </Typography>
                    </Box>
                )}

                {/* Delivery toggle + Date/Time (day-ahead) */}
                <FadeIn>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1, gap: 1 }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={delivery && deliveryEnabled}
                                    onChange={(e) => deliveryEnabled && setDelivery(e.target.checked)}
                                    disabled={!deliveryEnabled}
                                />
                            }
                            label={deliveryEnabled ? "Delivery" : "Pickup only"}
                        />
                        {delivery && (
                            <Stack direction="row" spacing={1} sx={{ minWidth: 280 }}>
                                <Select
                                    size="small"
                                    value={dateKey}
                                    onChange={(e) => setDateKey(e.target.value)}
                                    displayEmpty
                                    sx={{ minWidth: 140 }}
                                    renderValue={(v) => (v ? dateOptions.find(d => d.key === v)?.label : "Select date")}
                                >
                                    {dateOptions.map((d) => (
                                        <MenuItem key={d.key} value={d.key}>
                                            {d.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Select
                                    size="small"
                                    value={timeSlot}
                                    onChange={(e) => setTimeSlot(e.target.value)}
                                    displayEmpty
                                    sx={{ minWidth: 160 }}
                                    renderValue={(v) => (v ? v : "Select time")}
                                >
                                    {dynamicTimeSlots.map((s) => (
                                        <MenuItem key={s} value={s}>
                                            {s}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Stack>
                        )}
                    </Stack>

                    {delivery && (
                        <Typography variant="caption" color="text.secondary">
                            Scheduling is required at least a day ahead.{" "}
                            {selectedDate
                                ? isWeekend(selectedDate)
                                    ? "Weekend hours: 12:00 PM–6:00 PM."
                                    : "Weekday hours: 11:00 AM–6:00 PM."
                                : null}
                        </Typography>
                    )}
                </FadeIn>

                {/* Items */}
                {empty ? (
                    <FadeIn>
                        <Box
                            sx={{
                                p: 3,
                                textAlign: "center",
                                borderRadius: 2,
                                bgcolor: "background.default",
                                border: "1px dashed",
                                borderColor: "divider",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Your bag is empty
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Add something tasty to get started.
                            </Typography>
                        </Box>
                    </FadeIn>
                ) : (
                    <Stack spacing={1.25}>
                        {items.map((it, i) => (
                            // eslint-disable-next-line react/jsx-key
                            <OrderLineItem
                            // key={it.priceId}
                                delay={i * 0.05}
                                {...it}
                                onRemove={handleRemoveFromOrder}
                                onIncreaseQty={handleQtyIncrease}
                                onDecreaseQty={handleQtyDecrease}
                            />
                        ))}
                    </Stack>
                )}
            </Stack>

            {/* Footer / Totals */}
            <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
                <Stack spacing={1.25}>
                    <Row label="Subtotal" value={defaultFormatMoney(totals.subtotalCents)} />
                    {delivery && totals.deliveryFeeCents > 0 && (
                        <Row label="Delivery" value={defaultFormatMoney(totals.deliveryFeeCents)} />
                    )}
                    <Row label={`Tax (${Math.round(taxRate * 100)}%)`} value={defaultFormatMoney(totals.taxCents)} />
                    <Divider />
                    <Row
                        label={<Typography sx={{ fontWeight: 800 }}>Total</Typography>}
                        value={<Typography sx={{ fontWeight: 800 }}>{defaultFormatMoney(totals.totalCents)}</Typography>}
                    />
                    <Button
                        size="large"
                        variant="contained"
                        onClick={onSubmit}
                        disabled={!canSubmit}
                        sx={{ mt: 0.5, borderRadius: 2 }}
                    >
                        {empty
                            ? "Add items to continue"
                            : orderingOpen
                                ? "Place Order"
                                : "Ordering closed"}
                    </Button>
                    {!orderingOpen && (
                        <Typography variant="caption" color="text.secondary">
                            You can still build your order and schedule for tomorrow; checkout opens during business
                            hours (Detroit time).
                        </Typography>
                    )}
                    {delivery && requireSlotWhenDelivery && !empty && orderingOpen && !hasValidSlot && (
                        <Typography variant="caption" color="text.secondary">
                            Select a delivery date and time to continue.
                        </Typography>
                    )}
                </Stack>
            </Box>
        </Drawer>
    );
};

const Row: React.FC<{ label: React.ReactNode; value: React.ReactNode }> = ({ label, value }) => (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary">
            {label}
        </Typography>
        <Typography variant="body2">{value}</Typography>
    </Stack>
);

export default Order;
