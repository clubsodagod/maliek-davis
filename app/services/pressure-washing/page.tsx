import LottieEmbed from "@/app/sell-my-house/_components/LottieEmbed";
import PressureWashingModule from "./_components/PressureWashingModule";
import { Button } from "@mui/material";

export default function PowerWashingLandingPage() {
    return (
        <>
            {/* Hero Section */}
            <PressureWashingModule />

            {/* Services Section */}
            <section className="py-12 px-6 z-[0] relative">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-semibold mb-6 text-center">Services</h2>


                    <div className="flex flex-wrap gap-10 gap-y-10 justify-center">
                        {/* Residential */}
                        <div className=" bg-(--foreground) text-(--background) p-6 rounded-4xl shadow sm:min-w-[400px] sm:max-w-[500px] w-full sm:w-full">
                            <h3 className="text-xl font-bold mb-2 text-center">🏠 Residential</h3>

                            <LottieEmbed
                                src="https://lottie.host/embed/b3d6967c-293a-445d-9a6c-dbbdb2ca4d28/DuC1BU71ab.lottie"
                                height={200}
                                title='How I Build Your Offer Animation'
                                width="100%"
                            />
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Single Story Home Exterior: $250–$350</li>
                                <li>Two-Story Home Exterior: $350–$500</li>
                                <li>Driveway + Walkway Combo: $150–$300</li>
                                <li>Deck Cleaning: $150–$400</li>
                            </ul>
                        </div>

                        {/* Small Business */}
                        <div className=" bg-(--foreground) text-(--background) p-6 rounded-4xl shadow sm:min-w-[400px] sm:max-w-[500px] w-full sm:w-full">

                            <h3 className="text-xl font-bold mb-2 text-center">🏢 Small Business</h3>

                            <LottieEmbed
                                src="https://lottie.host/embed/3bbccc41-6ee8-42e3-a0cc-e6a493b21624/ykhxKr4sYH.lottie"
                                height={200}
                                title='How I Build Your Offer Animation'
                                width="100%"
                            />
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Storefront Cleaning: $200–$350</li>
                                <li>Full Exterior (1,000–3,000 sq ft): $500–$1,000+</li>
                                <li>Dumpster Pad, Grease Removal, Signage, etc.</li>
                            </ul>
                        </div>

                        {/* Add-Ons */}
                        <div className=" bg-(--foreground) text-(--background) p-6 rounded-4xl shadow sm:min-w-[400px] sm:max-w-[500px] w-full sm:w-full">

                            <h3 className="text-xl font-bold mb-2 text-center">🔧 Add-Ons</h3>

                            <LottieEmbed
                                src="https://lottie.host/embed/17abb7c6-fdc0-4e0b-b353-df090b34b25a/MSHJkktjKx.lottie"
                                height={200}
                                title='How I Build Your Offer Animation'
                                width="100%"
                            />
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Gutter Cleaning: $75–$150</li>
                                <li>Roof Washing (Soft Wash): $300–$800</li>
                                <li>Rust, Oil, or Graffiti Removal: $50–$200+</li>
                                <li>Sealant Application: $0.50–$1.00 per sq ft</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </section>

            {/* Lead Form Section */}
            <section className="py-12 px-6">
                <div className="max-w-xl mx-auto  bg-(--foreground) text-(--background) p-6 rounded-4xl shadow">
                    <h2 className="text-2xl font-bold mb-4 text-center">Get a Free Estimate</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full border rounded px-4 py-2" />
                        <input type="tel" placeholder="Phone Number" className="w-full border rounded px-4 py-2" />
                        <input type="email" placeholder="Email Address" className="w-full border rounded px-4 py-2" />
                        <textarea placeholder="Services Needed or Notes" className="w-full border rounded px-4 py-2" rows={4}></textarea>
                        <Button variant="contained" type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl">Request Estimate</Button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 text-sm text-gray-500">
                Serving Metro Detroit & Greater Grand Rapids • Licensed & Insured • © {new Date().getFullYear()} Your Business Name
            </footer>
        </>
    );
}
