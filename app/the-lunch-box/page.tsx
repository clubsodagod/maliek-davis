"use client"

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react'
import { Hero } from './_components/hero/Hero';
import { WhyWeExist } from './_components/WhyWeExist';
import { OurPromise } from './_components/OurPromise';
import { SignatureMeals } from './_components/SignatureMeals';
import { Asap } from 'next/font/google';
import { amber } from '@mui/material/colors';
import LunchBoxOrder from './_components/order/LunchBoxOrder';


const asap = Asap({
    variable: '--font-asap',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});




// ─────────────────────────────────────────────────────────────
// THEME (can be hoisted to a layout provider)
// ─────────────────────────────────────────────────────────────
const lunchBoxTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#232323" },
        secondary: { main: amber[400] },
        background: { default: "#ffffff", },
        text: { primary: "#232323" },
        
    },
    typography: {
        fontFamily: ` ${asap.style.fontFamily}, "Roboto", "Helvetica", "Arial", sans-serif`,
        h1: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 700,
            lineHeight: 0.75
        },
        h2: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 700,
        },
        h3: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 700,
        },
        h4: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 700,
        },
        h5: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 700,
        },
        h6: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        body1: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        body2: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        overline: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        subtitle1: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        subtitle2: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
        caption: {
            fontFamily: asap.style.fontFamily,
            fontWeight: 400,
        },
    },

    direction: 'rtl',
    shape: { borderRadius: 16 },
});
export type MenuItem = { name: string; desc: string; tag?: string };

const TheLunchBoxPage = ({ }) => {
    const menuItems: MenuItem[] = [
        { name: "Crispy Wings", desc: "Hot, mild, or parmesan garlic. Flavor in every bite.", tag: "Crispy • Saucy" },
        { name: "Salmon Bites with Garlic Mash", desc: "Tender, buttery, unforgettable.", tag: "Buttery • Tender" },
        { name: "Chicken & Shrimp Fried Rice", desc: "House-made, balanced, and packed with flavor.", tag: "Hearty • Balanced" },
        { name: "Sweet Corn & Fermented Fries", desc: "Comfort food that surprises you.", tag: "Comfort • Savory" },
    ];

    return (
        <ThemeProvider theme={lunchBoxTheme}>
            <CssBaseline />
            <div
                className={`bg-[#fafafa] dark:bg-[#232323] dark:text-[#fafafa] text-[#232323] `}
                
            >
                <Hero />
                <WhyWeExist />
                <OurPromise />
                <SignatureMeals items={menuItems} />
                <LunchBoxOrder />
            </div>


            {/* <LoveUs />
            <OrderVisit />
            <StayConnected /> */}
        </ThemeProvider>
    );
}



export default TheLunchBoxPage;