"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import MenuItem from "./MenuItem";
import { makeKey } from "./LunchBoxOrder";

/** ───────── Types (from your file) ───────── */
export type PriceOption = {
    size?: string;
    type?: string;
    price: number;
    id: string;
};

export type FoodProduct = {
    id: string;
    name: string;
    description: string;
    flavors?: string[];
    spiceLevel?: "Mild" | "Medium" | "Hot" | "Extra Hot";
    options: PriceOption[];
    category: "Entrées" | "Sides" | "Drinks" | "Desserts";
    image: string;
};

/** Payload passed to addToOrder */
export type AddToOrderPayload = {
    productId: string;
    name: string; // product name + (size/type)
    price: number;
    category: FoodProduct["category"];
    image: string;
    size?: string;
    type?: string;
    flavor?: string;
    spiceLevel?: FoodProduct["spiceLevel"];
    key: string;

    /** NEW: the Stripe Price ID from PriceOption.id */
    priceId: string;
};
export const menu: Record<string, FoodProduct> = {
    salmonBites: {
        id: "salmon-bites",
        name: "Salmon Bites",
        description:
            "Crispy salmon bites served with house-made yum yum sauce.",
        options: [
            { size: "Regular", price: 1099, id: "price_1SLTL4DHZWd1GpGczRsh02aX" },
            { size: "Large", price: 1499, id: "price_1SLTL4DHZWd1GpGczRsh02aX" },
        ],
        category: "Entrées",
        image: "/images/the-lunch-box/salmon-bites.png",
    },

    wings: {
        id: "wings",
        name: "Wings",
        description:
            "Crazy crispy wings tossed in your choice of mild or parmesan garlic seasoning.",
        flavors: ["Crispy"],
        options: [
            { size: "6 Pieces", price: 999, id: "price_1SLEGeDHZWd1GpGc45Qc6T44" },
            { size: "12 Pieces", price: 1699, id: "price_1SLEJVDHZWd1GpGcGEnRxWMm" },
        ],
        category: "Entrées",
        image: "/images/the-lunch-box/wings.png",
    },


    fries: {
        id: "fermented-fries",
        name: "Fermented Fries",
        description:
            "Perfectly crispy, slightly tangy fermented fries — a Lunch Box signature.",
        options: [
            { size: "Small", price: 399, id: "price_1SLENHDHZWd1GpGcNLSZF45X" },
            { size: "Large", price: 599, id: "price_1SLEPoDHZWd1GpGcqA4kqlEY" },
        ],
        category: "Sides",
        image: "/images/the-lunch-box/fries.png",
    },

    sprite: {
        id: "sprite",
        name: "Sprite",
        description: "Cold and refreshing beverage options.",
        options: [{ size: "can", price: 199, id: "price_1SLEPoDHZWd1GpGcqA4kqlEY" }],
        category: "Drinks",
        image: "/images/the-lunch-box/sprite.jpg",
    },

    coke: {
        id: "coca-cola",
        name: "Coca Cola",
        description: "Cold and refreshing beverage options.",
        options: [{ size: "can", price: 199, id: "price_1SLEPoDHZWd1GpGcqA4kqlEY" }],
        category: "Drinks",
        image: "/images/the-lunch-box/coca-cola-clouds.jpg",
    },

    water: {
        id: "water",
        name: "Water",
        description: "Cold and refreshing beverage options.",
        options: [{ size: "bottle", price: 199, id: "price_1SLEPoDHZWd1GpGcqA4kqlEY" }],
        category: "Drinks",
        image: "/images/the-lunch-box/ice-mountain.png",
    },
};


/** ───────── Helpers ───────── */
const currency = (v: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(v);

const optionLabel = (o: PriceOption) => {
    if (o.size && o.type) return `${o.size} • ${o.type}`;
    if (o.size) return o.size;
    if (o.type) return o.type;
    return "Standard";
};

const CATEGORY_ORDER: Array<FoodProduct["category"]> = ["Entrées", "Sides", "Drinks", "Desserts"];

/** Group products by category in fixed display order */
function useGroupedByCategory(items: Record<string, FoodProduct>) {
    return useMemo(() => {
        const groups = new Map<FoodProduct["category"], FoodProduct[]>();
        for (const key of Object.keys(items)) {
            const p = items[key];
            if (!groups.has(p.category)) groups.set(p.category, []);
            groups.get(p.category)!.push(p);
        }
        // sort each category by name for nicer UX
        for (const [, arr] of groups) {
            arr.sort((a, b) => a.name.localeCompare(b.name));
        }
        return CATEGORY_ORDER.filter((c) => groups.has(c)).map((c) => ({
            category: c,
            products: groups.get(c)!,
        }));
    }, [items]);
}

/** ───────── MenuItemRow (internal) ───────── */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MenuItemRow({
    product,
    option,
    addToOrder,
}: {
    product: FoodProduct;
    option: PriceOption;
    addToOrder: (payload: AddToOrderPayload) => void;
}) {
    // flavor selector if product has flavors
    const [flavor, setFlavor] = useState<string | undefined>(
        product.flavors?.length ? product.flavors[0] : undefined
    );

    const composedName =
        optionLabel(option) === "Standard"
            ? product.name
            : `${product.name} — ${optionLabel(option)}`;

    const handleAdd = () =>
        addToOrder({
            key: makeKey({
                productId: product.id,
                name: composedName,
                price: option.price,
                category: product.category,
                image: product.image,
                key: `${product.name}-${optionLabel(option)}`,
                priceId: option.id
            }),
            productId: product.id,
            name: composedName,
            price: option.price,
            category: product.category,
            image: product.image,
            size: option.size,
            type: option.type,
            flavor,
            spiceLevel: product.spiceLevel,
            priceId: option.id
        });

    return (
        <div className="flex items-start gap-3 rounded-xl border border-neutral-200 p-3 transition hover:shadow-sm dark:border-neutral-800">
            <div className="relative h-14 w-14 overflow-hidden rounded-lg shrink-0">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <h4 className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {composedName}
                    </h4>
                    {product.spiceLevel && (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700 dark:bg-red-500/15 dark:text-red-300">
                            {product.spiceLevel}
                        </span>
                    )}
                </div>
                <p className="line-clamp-2 text-xs text-neutral-600 dark:text-neutral-400">
                    {product.description}
                </p>

                {product.flavors?.length ? (
                    <div className="mt-2 flex items-center gap-2">
                        <label className="text-[11px] text-neutral-500 dark:text-neutral-400">Flavor:</label>
                        <select
                            value={flavor}
                            onChange={(e) => setFlavor(e.target.value)}
                            className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-900"
                        >
                            {product.flavors.map((f) => (
                                <option key={f} value={f}>
                                    {f}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : null}

                <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {currency(option.price)}
                    </div>
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98] dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

/** ───────── Component Props ───────── */
type MenuProps = {
    /** Optional override of the menu items */
    items?: Record<string, FoodProduct>;
    /** Called when user clicks Add on any option */
    addToOrder: (payload: AddToOrderPayload) => void;
    /** Optional section title */
    title?: string;
    className?: string;
};

/** ───────── Main Menu Component ───────── */
const Menu: React.FC<MenuProps> = ({ items = menu, addToOrder, title = "Menu", className }) => {
    const groups = useGroupedByCategory(items);

    return (
        <section className={["mx-auto max-w-4xl px-4", className ?? ""].join(" ")}>
            <header className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {title}
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    Flavor-forward, simple quality — The Lunch Box.
                </p>
            </header>

            <div className="space-y-10">
                {groups.map(({ category, products }) => (
                    <div key={category}>
                        <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                            {category}
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {products.map((product) =>
                                product.options.map((option, idx) => (
                                    <MenuItem
                                        onClick={addToOrder}
                                        key={`${product.id}-${idx}-${option.size ?? option.type ?? "std"}`}
                                        product={product}
                                        option={option}

                                    />
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Menu;
