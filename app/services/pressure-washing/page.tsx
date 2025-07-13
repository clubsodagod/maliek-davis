import PressureWashingModule from "./_components/PressureWashingModule";
import ServiceRequestForm from "./_components/ServiceRequestForm";

export default function PowerWashingLandingPage() {
    return (
        <>
            {/* Hero Section */}
            <PressureWashingModule />



            {/* Lead Form Section */}
            <section className="py-12 px-6">
                <div className="max-w-xl mx-auto  bg-[#fafafaa7] text-(--background) p-6 rounded-4xl shadow">
                    <ServiceRequestForm />
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 px-6 text-sm text-gray-500">
                Serving Metro Detroit & Greater Grand Rapids • Licensed & Insured • © {new Date().getFullYear()} Pearl Box Pressure Washing
            </footer>
        </>
    );
}
