import { IBuyer } from "@/database/models/prestige-partner-buyer.model";
import {
    Html,
    Heading,
    Text,
    Section,
    Link,
    Img,
} from "@react-email/components";
import * as React from "react";

const ContactDetails: React.FC<{ form: IBuyer }> = ({ form }) => {

    // Destructure the form object to get the necessary fields
    // This is a TypeScript feature that allows you to extract properties from an object and assign them to variables.

    const {
        fullName,
        email,
        phone,
        companyName,
        marketAreas,
        propertyTypes,
        priceRange,
        preferredCloseTime,
        fundingSource,
        proofOfFundsUrl,
        volumeGoalPerMonth,
        notes,
    } = form;

    return (
        <Html>
            <Section style={{ fontFamily: "sans-serif", padding: "20px" }}>
                <Heading as="h2" style={{ color: "#333" }}>
                    New Prestige Buyer Submission
                </Heading>

                <Text><strong>Full Name:</strong> {fullName}</Text>
                <Text><strong>Email:</strong> <Link href={`mailto:${email}`}>{email}</Link></Text>
                <Text><strong>Phone:</strong> <Link href={`tel:${phone}`}>{phone}</Link></Text>
                {companyName && <Text><strong>Company:</strong> {companyName}</Text>}
                <Text><strong>Market Areas:</strong> {marketAreas.join(", ")}</Text>
                <Text><strong>Property Types:</strong> {propertyTypes.join(", ")}</Text>
                <Text><strong>Price Range:</strong> ${priceRange.min.toLocaleString()} – ${priceRange.max.toLocaleString()}</Text>
                <Text><strong>Preferred Close Time:</strong> {preferredCloseTime} days</Text>
                <Text><strong>Funding Source:</strong> {fundingSource.replace("_", " ")}</Text>
                {volumeGoalPerMonth && <Text><strong>Volume Goal/Month:</strong> {volumeGoalPerMonth}</Text>}
                {notes && <Text><strong>Notes:</strong> {notes}</Text>}

                {proofOfFundsUrl && (
                    <>
                        <Heading as="h3" style={{ marginTop: "30px", color: "#333" }}>
                            Proof of Funds Preview
                        </Heading>
                        <Link href={proofOfFundsUrl} target="_blank" rel="noopener noreferrer">
                            <Img
                                src={proofOfFundsUrl}
                                alt="Proof of Funds"
                                style={{
                                    width: "100%",
                                    maxWidth: "400px",
                                    height: "auto",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    marginTop: "10px",
                                }}
                            />
                        </Link>
                    </>
                )}
            </Section>
        </Html>
    );
};

export default ContactDetails;
