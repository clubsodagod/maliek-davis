import { brandLogo } from "@/library/brand.const";
import { Html, Heading, Text } from "@react-email/components";
import * as React from "react";

interface NewSubscriberEmailProps {
    name?: string;
    email: string;
    type: "UserSubscriber" | "GuestSubscriber";
}

const NewSubscriberEmail: React.FC<NewSubscriberEmailProps> = ({ name, email, type }) => {
    return (
        <Html>
            <div
                style={{
                    fontFamily: "sans-serif",
                    padding: "40px",
                    backgroundColor: "#f5f5f5",
                    backgroundImage: `url(${brandLogo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    textAlign: "left",
                }}
            >
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <Heading as="h2" style={{ color: "#60abe4" }}>
                        Welcome{name ? `, ${name}` : ""}!
                    </Heading>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                        We&apos;re thrilled to have you on board as a <strong>{type === "UserSubscriber" ? "registered user" : "guest"}</strong> subscriber.
                    </Text>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                        You&apos;ll now receive updates, insights, and exclusive announcements directly to <strong>{email}</strong>. We&apos;re committed to providing you with valuable content tailored to your interests.
                    </Text>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                        If you ever wish to update your preferences or unsubscribe, you can do so from the footer of any of our emails.
                    </Text>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                        Thank you for joining our community!
                    </Text>
                </div>
            </div>
        </Html>
    );
};

export default NewSubscriberEmail;
