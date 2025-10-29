"use client";

import React, { useCallback, useMemo, useState } from "react";
import Menu, { AddToOrderPayload } from "./Menu";
import Order from "./Order";
import { OrderLineItemType } from "./OrderLineItem";
import { getLunchBoxCart, setLunchBoxCart } from "@/utility/cart";



/** Helper: build a stable key for “same item” merging */
export const makeKey = (p: AddToOrderPayload) => {
    // Safely include common option fields if present
    const size = "size" in p && p.size ? String(p.size) : "";
    const opts = "options" in p && p.options ? JSON.stringify(p.options) : "";
    return [p.productId, size, opts].join("|");
};

const toLineItem = (p: AddToOrderPayload, prevQty = 0): OrderLineItemType => ({
    key: makeKey(p),
    id: p.productId,
    name: p.name,
    priceCents: p.price,
    qty: prevQty || 1,
    img: "image" in p ? p.image : "",
    size: "size" in p ? (p.size as string | undefined) : undefined,
    priceId:p.priceId
});

const LunchBoxOrder: React.FC = () => {
    // Drawer open/close (order panel)
    const [open, setOpen] = useState<boolean>(false);

    // Cart items
    const [items, setItems] = useState<OrderLineItemType[]>([]);

    /** Add/merge item into the cart */
    const addToOrder = useCallback((payload: AddToOrderPayload) => {
        setItems((curr) => {
            const key = makeKey(payload);
            const idx = curr.findIndex((i) => i.key === key);

            if (idx === -1) {
                // New line
                const next: OrderLineItemType = toLineItem(payload); // ensure next.priceId = payload.priceId
                const updated = [...curr, next];

                // persist to localStorage
                const lc = getLunchBoxCart();
                setLunchBoxCart({ ...lc, items: updated });
                return updated;
            }

            // Merge qty
            const existing = curr[idx];
            const merged: OrderLineItemType = { ...existing, qty: existing.qty + 1 };
            const copy = curr.slice();
            copy[idx] = merged;

            // persist to localStorage
            const lc = getLunchBoxCart();
            setLunchBoxCart({ ...lc, items: copy });

            return copy;
        });

        // Open drawer when user adds something
        setOpen(true);
    }, []);

    /** Remove an item (by id or key). Prefer key if provided by child. */
    const handleRemoveFromOrder = useCallback((idOrKey: string | number) => {
        setItems((curr) => curr.filter((i) => i.key !== idOrKey && i.id !== idOrKey));
    }, []);

    /** Increase qty by 1 (by id or key) */
    const handleQtyIncrease = useCallback((idOrKey: string | number) => {
        setItems((curr) =>
            curr.map((i) =>
                i.key === idOrKey || i.id === idOrKey ? { ...i, qty: i.qty + 1 } : i
            )
        );
    }, []);

    /** Decrease qty by 1 (min 1) */
    const handleQtyDecrease = useCallback((idOrKey: string | number) => {
        setItems((curr) =>
            curr
                .map((i) =>
                    i.key === idOrKey || i.id === idOrKey ? { ...i, qty: Math.max(1, i.qty - 1) } : i
                )
                .filter(Boolean) as OrderLineItemType[]
        );
    }, []);

    /** Optional: compute total (if your <Order /> wants it later) */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const total = useMemo(
        () => items.reduce((sum, i) => sum + i.priceCents * i.qty, 0),
        [items]
    );

    const onClose = useCallback(() => setOpen(false), []);

    return (
        <div>
            <Menu addToOrder={addToOrder} />

            <Order
                open={open}
                onClose={onClose}
                items={items}
                handleRemoveFromOrder={handleRemoveFromOrder}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
            /* If your <Order /> accepts total later:
             * total={total}
             */
            />
        </div>
    );
};

export default LunchBoxOrder;
