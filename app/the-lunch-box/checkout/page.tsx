// page.tsx
"use client";

import Checkout from "@/utility/stripe/Checkout";
import { getLunchBoxLineItems } from "@/utility/cart"; // Adjust the import path as needed
import React, { useEffect, useState } from "react";

const Page = () => {
    const [lunchBoxItems, setLunchBoxItems] = useState<Array<{
        priceId: string;
        qty: number;
    }>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get items from localStorage after component mounts
        const items = getLunchBoxLineItems();
        setLunchBoxItems(items);
        setIsLoading(false);
    }, []);

    // Show loading state while we fetch from localStorage
    if (isLoading) {
        return (
            <div id="checkout" className="flex items-center justify-center min-h-screen">
                <p>Loading checkout...</p>
            </div>
        );
    }

    // Show empty cart message if no items
    if (lunchBoxItems.length === 0) {
        return (
            <div id="checkout" className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                    <p className="text-gray-600">Add some items to your cart before checking out.</p>
                </div>
            </div>
        );
    }

    return (
        <div id="checkout">
            <Checkout cart="lunch-box" items={lunchBoxItems} />
        </div>
    );
};

export default Page;