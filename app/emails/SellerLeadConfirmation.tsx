import * as React from "react";
import { Html, Heading, Text } from "@react-email/components";

interface SellerLeadConfirmationEmailProps {
    firstName: string;
}

const SellerLeadConfirmationEmail: React.FC<SellerLeadConfirmationEmailProps> = ({ firstName }) => {
    return (
        <Html>
            <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#fff" }}>
                <Heading as="h2" style={{ color: "#000" }}>Thanks for Reaching Out, {firstName}!</Heading>
                <Text style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
                    We’ve received your property submission and are reviewing the details.
                    You can expect to hear from us soon to discuss your situation, answer any questions,
                    and provide a fair, data-driven offer.
                </Text>
                <Text style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
                    In the meantime, feel free to reply to this email if you have updates or additional
                    documents you’d like to share.
                </Text>
                <Text style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
                    Looking forward to helping you move forward with clarity and confidence.
                </Text>

                <Text style={{ marginTop: "30px", fontSize: "14px", color: "#888" }}>
                    — Maliek Davis<br />
                    Direct Property Buyer | Real Estate Investor
                </Text>
            </div>
        </Html>
    );
};

export default SellerLeadConfirmationEmail;
