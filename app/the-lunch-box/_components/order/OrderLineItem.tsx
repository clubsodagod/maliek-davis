"use client";

import * as React from "react";
import { Box, Stack, Typography, IconButton, Avatar, Divider, ButtonGroup, Button, Tooltip } from "@mui/material";
import { FadeIn } from "../../_utility";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export type OrderLineItemType = {
    key: string;
    id: string | number;
    img: string;
    name: string;
    size?: string;
    // price for a single unit in cents to avoid float issues (recommended)
    priceCents: number;
    qty: number;

    onRemove?: (id: string | number) => void;
    onIncreaseQty?: (id: string | number) => void;
    onDecreaseQty?: (id: string | number) => void;

    /** NEW: the Stripe Price ID from PriceOption.id */
    priceId: string;
};

type Props = OrderLineItemType & {
    /** Optional: override currency formatting (defaults to USD) */
    formatMoney?: (cents: number) => string;
    /** Optional: animation delay for FadeIn */
    delay?: number;
};

export const defaultFormatMoney = (cents: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(
        Math.max(0, cents) / 100
    );

const clampQty = (n: number) => Math.max(1, n);

const ControlButton: React.FC<React.ComponentProps<typeof IconButton>> = ({ children, ...rest }) => (
    <IconButton size="small" sx={{ borderRadius: 2 }} {...rest}>
        {children}
    </IconButton>
);

const OrderLineItem: React.FC<Props> = ({
    id,
    img,
    name,
    size,
    priceCents,
    qty,
    onRemove,
    onIncreaseQty,
    onDecreaseQty,
    formatMoney = defaultFormatMoney,
    delay = 0,
}) => {
    const subtotalCents = clampQty(qty) * priceCents;

    return (
        <FadeIn delay={delay}>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                    py: 1.25,
                    px: 1,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "action.hover" },
                }}
            >
                {/* Image */}
                <Avatar
                    src={img}
                    alt={name}
                    variant="rounded"
                    sx={{ width: 64, height: 64, borderRadius: 2, flexShrink: 0 }}
                />

                {/* Details */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
                    <Stack sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
                            {name}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            {size && (
                                <Typography variant="body2" color="text.secondary">
                                    {size}
                                </Typography>
                            )}
                            {size && <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.25 }} />}
                            <Typography variant="body2" color="text.secondary">
                                {formatMoney(priceCents)} ea
                            </Typography>
                        </Stack>
                    </Stack>


                    {/* Subtotal */}
                    <Box sx={{ textAlign: "right", minWidth: 96 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            {formatMoney(subtotalCents)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Subtotal
                        </Typography>
                    </Box>

                    {/* Remove */}
                    <Tooltip title="Remove">
                        <ControlButton aria-label={`remove ${name}`} onClick={() => onRemove?.(id)}>
                            <CloseRoundedIcon />
                        </ControlButton>
                    </Tooltip>
                </Stack>
            </Stack>
            {/* Quantity Controls */}
            <Stack direction="row" alignItems="center" spacing={1} className="mx-auto justify-center">
                <ButtonGroup size="small" variant="outlined" aria-label={`adjust quantity for ${name}`}>
                    <Button
                        onClick={() => onDecreaseQty?.(id)}
                        aria-label={`decrease ${name} quantity`}
                        disabled={qty <= 1}
                    >
                        <RemoveRoundedIcon />
                    </Button>
                    <Button disabled tabIndex={-1} sx={{ cursor: "default", fontWeight: 600, px: 2 }}>
                        {clampQty(qty)}
                    </Button>
                    <Button onClick={() => onIncreaseQty?.(id)} aria-label={`increase ${name} quantity`}>
                        <AddRoundedIcon />
                    </Button>
                </ButtonGroup>
            </Stack>
        </FadeIn>
    );
};

export default OrderLineItem;
