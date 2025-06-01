import { Html, Heading, Text } from "@react-email/components";
import * as React from "react";

const ClientConfirmationEmail: React.FC<{ name: string }> = ({ name }) => {
    const displayName = name?.trim() || "there";
    return (
        <Html>
            <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#f5f5f5" }}>
                <Heading as="h2" style={{ color: "#222" }}>Thank You for Reaching Out!</Heading>
                <Text style={{ fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
                    Hi {displayName}, thanks for submitting your business inquiry! I&apos;m reviewing your details and will follow up shortly.
                </Text>
                <Text style={{ fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
                    In the meantime, feel free to reply directly to this email if you have anything to add.
                </Text>
                <Text style={{ marginTop: "24px", fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
                    Best,<br />Maliek Davis<br />📞 (586) 863-3038<br />📧 self@maliek-davis.com
                </Text>
            </div>
        </Html>
    );
};

export default ClientConfirmationEmail;

