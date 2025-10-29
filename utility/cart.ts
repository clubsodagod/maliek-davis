/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderLineItemType } from "@/app/the-lunch-box/_components/order/OrderLineItem";

// cart.storage.ts
const CART_STORAGE_KEY = "cart";

export type LunchBoxCart = {
    items: OrderLineItemType[];
    updatedAt: string; // ISO
};

export type RootCart = {
    lunchbox: LunchBoxCart;
};

const emptyCart: RootCart = {
    lunchbox: { items: [], updatedAt: new Date().toISOString() },
};

export function loadCart(): RootCart {
    if (typeof window === "undefined") return emptyCart;
    try {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);
        if (!raw) return emptyCart;
        const parsed = JSON.parse(raw);
        // very light validation
        if (!parsed?.lunchbox?.items) return emptyCart;
        return parsed as RootCart;
    } catch {
        return emptyCart;
    }
}

export function saveCart(cart: RootCart) {
    if (typeof window === "undefined") return;
    const toSave: RootCart = {
        ...cart,
        lunchbox: { ...cart.lunchbox, updatedAt: new Date().toISOString() },
    };
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(toSave));
}

export function getLunchBoxCart(): LunchBoxCart {
    return loadCart().lunchbox;
}

export function setLunchBoxCart(next: LunchBoxCart) {
    const root = loadCart();
    root.lunchbox = { ...next, updatedAt: new Date().toISOString() };
    saveCart(root);
}

// utils/cart.ts
export type LocalLineItem = {
    priceId: string;
    qty: number;
};

export function getLunchBoxLineItems(): LocalLineItem[] {
    if (typeof window === "undefined") return [];

    try {
        const raw = localStorage.getItem("cart");
        if (!raw) return [];

        const cart = JSON.parse(raw);
        const items = cart?.lunchbox?.items ?? [];

        return items
            .filter((i: any) => i.priceId && i.qty > 0)
            .map((i: any) => ({
                priceId: i.priceId,
                qty: i.qty,
            }));
    } catch (err) {
        console.error("Error parsing localStorage cart:", err);
        return [];
    }
}
