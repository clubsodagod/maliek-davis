"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AddToOrderPayload, FoodProduct, PriceOption } from "./Menu";
import { defaultFormatMoney } from "./OrderLineItem";



type MenuItemProps = {
    /** The base product (e.g., Hot Wings) */
    product: FoodProduct;
    /** The specific purchasable option (e.g., 6 Pieces) */
    option: PriceOption;
    /** Optional default flavor if the product has flavors */
    defaultFlavor?: string;
    /** Disable the Add button (e.g., when sold out) */
    disabled?: boolean;
    /** Optional badge above the title (e.g., “Popular”, “New”) */
    badge?: string;
    /** Called when the user clicks Add */
    onClick?: (payload: AddToOrderPayload) => void;
    /** Tailwind className passthrough */
    className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const currency = (v: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(v);

/**
 * MenuItem
 * Renders one purchasable option of a FoodProduct (e.g., "Wings" + "12 Pieces").
 * Supports optional flavor selection and a customizable Add button callback.
 */
const MenuItem: React.FC<MenuItemProps> = ({
    product,
    option,
    defaultFlavor,
    disabled,
    badge,
    onClick,
    className,
}) => {
    const [flavor, setFlavor] = useState<string | undefined>(() => {
        if (product.flavors?.length) {
            // prefer defaultFlavor if valid, else first flavor
            return product.flavors.includes(defaultFlavor ?? "")
                ? defaultFlavor
                : product.flavors[0];
        }
        return undefined;
    });

    const optionLabel = useMemo(() => {
        // Build a compact label from size/type
        if (option.size && option.type) return `${option.size} • ${option.type}`;
        if (option.size) return option.size;
        if (option.type) return option.type;
        return "Standard";
    }, [option.size, option.type]);

    const handleAdd = () => {
        if (disabled) return;
        onClick?.({
            productId: option.id,
            name: product.name,
            price: option.price,
            size: option.size,
            type: option.type,
            flavor,
            image: product.image ?? "",
            category: product.category,
            key: "",
            priceId:option.id
        });
    };

    return (
        <div
            className={[
                "group relative grid grid-cols-[88px_1fr] gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:shadow-md",
                "dark:border-grey-50 dark:bg-grey-100",
                disabled ? "opacity-70" : "opacity-100",
                className ?? "",
            ].join(" ")}
            aria-disabled={disabled}
        >
            {/* Thumbnail */}
            <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    priority={false}
                />
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-col">
                {/* Header row */}
                <div className="mb-1 flex items-center gap-2">
                    {badge ? (
                        <span className="inline-flex items-center rounded-full border border-amber-300 px-2 py-0.5 text-xs font-medium text-amber-700 dark:border-amber-500/40 dark:text-amber-300">
                            {badge}
                        </span>
                    ) : null}

                    {product.spiceLevel ? (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-500/15 dark:text-red-700">
                            🔥{product.spiceLevel}
                        </span>
                    ) : null}
                </div>

                <h3 className="truncate text-base font-semibold dark:text-neutral-900 text-neutral-100">
                    {product.name}
                    {optionLabel !== "Standard" ? (
                        <span className="ml-1 dark:text-neutral-500 text-neutral-400">· {optionLabel}</span>
                    ) : null}
                </h3>

                <p className="line-clamp-2 text-sm dark:text-neutral-600 text-neutral-400">
                    {product.description}
                </p>

                {/* Flavors (if any) */}
                {product.flavors?.length ? (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <label className="text-xs dark:text-neutral-500 text-neutral-400">Flavor:</label>
                        <div className="flex flex-wrap gap-1.5">
                            {product.flavors.map((f) => {
                                const selected = f === flavor;
                                return (
                                    <button
                                        key={f}
                                        type="button"
                                        onClick={() => setFlavor(f)}
                                        className={[
                                            "rounded-full border px-2.5 py-1 text-xs transition",
                                            selected
                                                ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                                                : "border-neutral-300 text-neutral-700 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500",
                                        ].join(" ")}
                                        aria-pressed={selected}
                                    >
                                        {f}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : null}

                {/* Footer: price + CTA */}
                <div className="mt-3 flex items-center justify-between">
                    <div className="text-base font-semibold dark:text-green-600 text-green-100">
                        {defaultFormatMoney(option.price)}
                    </div>

                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={disabled}
                        className={[
                            "hover:cursor-pointer",
                            "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm font-semibold transition",
                            disabled
                                ? "cursor-not-allowed border border-neutral-300 text-neutral-400 dark:border-neutral-700 dark:text-neutral-500"
                                : "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98] dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",
                        ].join(" ")}
                        aria-label={`Add ${product.name}${optionLabel !== "Standard" ? ` ${optionLabel}` : ""} to order`}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;
