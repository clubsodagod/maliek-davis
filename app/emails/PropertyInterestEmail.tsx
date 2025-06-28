
import { brandLogo } from "@/library/brand.const";
import { Html, Heading, Text } from "@react-email/components";
import * as React from "react";

export interface PropertyInterestEmailProps {
    ownerFirstName?: string;
    propertyAddress: string;
    city: string;
    yourFirstName: string;
    yourPhoneNumber: string;
    yourCompanyName?: string;
    yourEmail: string;
    yourWebsite?: string;
}

const PropertyInterestEmail: React.FC<PropertyInterestEmailProps> = ({
    ownerFirstName = "Matthew Samuels",
    propertyAddress = "123 Main St",
    city = "Kent county",
    yourFirstName = "Maliek",
    yourPhoneNumber = "(586) 863-3038",
    yourWebsite = "https://maliek-davis.com",
}) => {
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
                        Quick Question About {propertyAddress}
                    </Heading>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                        Hi{ownerFirstName ? ` ${ownerFirstName}` : ""},
                    </Text>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                        I hope you don&apos;t mind me reaching out — I came across your property at <strong>{propertyAddress}</strong> and wanted to see if you&apos;ve ever thought about selling it.
                    </Text>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                        I work with a small local group that buys houses in {city}, and we often help owners who live out of state — especially when the property is sitting vacant or just not being used anymore.
                    </Text>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                        If that&apos;s something you&apos;ve considered, I&apos;d love to make it easy for you — no agents, no fees, no repairs. We buy as-is and can work around your schedule.
                    </Text>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                        Totally understand if now&apos;s not the right time. But if you&apos;re open to chatting — or just curious what a fair cash offer might look like — feel free to reply or text me directly at <strong>{yourPhoneNumber}</strong>.
                    </Text>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                        Either way, wishing you all the best!
                    </Text>

                    <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333", marginTop: "24px" }}>
                        Best,<br />
                        <strong>{yourFirstName}</strong><br />
                        {yourPhoneNumber}<br />
                        {yourWebsite && <>{yourWebsite}<br /></>}
                    </Text>
                </div>
            </div>
        </Html>
    );
};

export default PropertyInterestEmail;
