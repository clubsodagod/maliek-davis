import { brandLogo } from "@/library/brand.const";
import { Html, Heading, Text, Button } from "@react-email/components";
import * as React from "react";

const PrestigePartnerBuyer: React.FC<{ firstName: string }> = ({ firstName }) => {
    const name = firstName?.trim() || "there";

    return (
        <Html>
            <div
                style={{
                    fontFamily: "sans-serif",
                    padding: "40px",
                    position: "relative",
                    textAlign: "left",
                    backgroundColor: "#00000017",
                    zIndex: -1,
                    backgroundImage: `url(${brandLogo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                }}
            >


                {/* Foreground Content */}
                <div style={{
                    padding: "20px",
                    borderRadius: "8px",
                    position: "relative",
                    zIndex: 1,
                }}>
                    <Heading as="h1" style={{ color: "#60abe4", marginBottom: "10px" }}>
                        Your Application Has Been Received!
                    </Heading>
                    <Text style={{ color: "#555", marginBottom: "20px", fontSize:"20px", lineHeight:"1.5"  }}>
                        Hi {name}, thank you for submitting your application. I&apos;ve received all the information, and I&apos;m currently reviewing it.
                    </Text>
                    <Text style={{ color: "#555", marginBottom: "20px", fontSize:"20px", lineHeight: "1.5" }}>
                        I&apos;ll be in touch shortly to go over the next steps. In the meantime, if you have any questions or additional documents you&apos;d like to share, feel free to reply directly to this email or give me a call.
                    </Text>

                    <div>
                        <Text style={{ color: "#555", marginBottom: "20px", marginBlockStart:0, fontSize:"20px", lineHeight:"1.25"  }}>
                            <span style={{
                                color: "#8f11cc",
                                fontWeight: "bold",
                            }}>Maliek Davis</span><br />
                            📞 (586) 863-3038<br />
                            📧 self@maliek-davis.com
                        </Text>
                    </div>

                    <Button
                        href="https://maliek-davis.com"
                        style={{
                            fontFamily: "sans-serif",
                            backgroundColor: "#007BFF",
                            color: "white",
                            padding: "12px 20px",
                            textDecoration: "none",
                            borderRadius: "5px",
                            border: "none",
                        }}
                    >
                        Visit My Website
                    </Button>
                </div>
            </div>
        </Html>
    );
};

export default PrestigePartnerBuyer;
