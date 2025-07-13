// data/services.tsx
import { Typography } from "@mui/material";

export const serviceCards = [
    {
        title: "🏠 Residential",
        icon: "https://lottie.host/embed/b3d6967c-293a-445d-9a6c-dbbdb2ca4d28/DuC1BU71ab.lottie",
        services: [
            {
                name: "Home Exterior",
                price: <>as low as $0.33/sqft <Typography variant="caption" className="italic">$150 minimum cost</Typography > </>,
            },
            { name: "Driveway + Walkway Combo", price: "$150–$300" },
            { name: "Fence Cleaning", price: "$100–$250" },
        ],
    },
    {
        title: "🏢 Small Business",
        icon: "https://lottie.host/embed/3bbccc41-6ee8-42e3-a0cc-e6a493b21624/ykhxKr4sYH.lottie",
        services: [
            { name: "Storefront Cleaning", price: "$200–$350" },
            { name: "Full Exterior (1,000–3,000 sq ft)", price: "$500–$1,000+" },
            { name: "Dumpster Pad, Grease Removal, Signage, etc.", price: "" },
        ],
    },
    {
        title: "🔧 Add-Ons",
        icon: "https://lottie.host/embed/17abb7c6-fdc0-4e0b-b353-df090b34b25a/MSHJkktjKx.lottie",
        services: [
            { name: "Gutter Cleaning", price: "$200–$450" },
            { name: "Deck Cleaning", price: "$100–$300" },
            { name: "Roof Washing (Soft Wash)", price: "$300–$800" },
            { name: "Rust, Oil, or Graffiti Removal", price: "$50–$200+" },
            { name: "Sealant Application", price: "$0.50–$1.00 per sq ft" },
        ],
    },
];
