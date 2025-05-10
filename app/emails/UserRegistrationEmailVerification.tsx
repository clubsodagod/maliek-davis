import { Html, Heading, Text, Button, Section, Container, Link } from "@react-email/components";
import * as React from "react";

interface EmailVerificationProps {
    firstName?: string;
    verificationUrl: string;
}

const UserRegistrationEmailVerification: React.FC<EmailVerificationProps> = ({
    firstName = "Change Immediately",
    verificationUrl = `http://localhost:3000/admin/access/email-verification-status${new URLSearchParams({
        token: "487h83dh037r40gr784jd3",
        username: "maliekdavis",
        role: "admin",
    })}`,
}) => {
    const name = firstName.trim() || "there";

    return (
        <Html>
            <Section style={{ backgroundColor: "#f5f5f5", padding: "40px 0" }}>
                <Container
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "40px",
                        borderRadius: "8px",
                        fontFamily: "sans-serif",
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}
                >
                    <Heading as="h2" style={{ color: "#333", marginBottom: "20px" }}>
                        Verify Your Email Address
                    </Heading>

                    <Text style={{ color: "#555", fontSize: "16px", marginBottom: "20px", lineHeight: "1.5" }}>
                        Hi {name}, welcome! Please verify your email address to complete your registration.
                    </Text>

                    <Button
                        href={verificationUrl}
                        style={{
                            backgroundColor: "#007BFF",
                            color: "#ffffff",
                            padding: "12px 24px",
                            textDecoration: "none",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    >
                        Verify Email
                    </Button>

                    <Text style={{ color: "#777", fontSize: "14px", marginTop: "30px" }}>
                        If the button doesn’t work, copy and paste the following link into your browser:
                    </Text>
                    <Link
                        href={verificationUrl}
                    >
                        <Text style={{ color: "#007BFF", wordBreak: "break-all", fontSize: "14px" }}
                        >
                            {verificationUrl}
                        </Text>
                    </Link>


                    <Text style={{ color: "#999", fontSize: "13px", marginTop: "40px" }}>
                        If you didn’t request this, you can safely ignore this email.
                    </Text>
                </Container>
            </Section>
        </Html>
    );
};

export default UserRegistrationEmailVerification;
