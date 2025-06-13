import * as React from "react";
import { Html, Heading, Text } from "@react-email/components";
import { IMotivatedSeller } from "@/database/models/property-lead.model";

interface Props {
    form: IMotivatedSeller;
}

const MotivatedSellerNotificationEmail: React.FC<Props> = ({ form }) => {
    return (
        <Html>
            <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#fff" }}>
                <Heading as="h2" style={{ color: "#000" }}>
                    New Motivated Seller Lead Submitted
                </Heading>

                <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
                    <strong>Name:</strong> {form.firstName} {form.lastName}<br />
                    <strong>Email:</strong> {form.email}<br />
                    <strong>Phone:</strong> {form.phone}<br />
                    <strong>Preferred Contact Method:</strong> {form.contactMethod}<br />
                    <br />
                    <strong>Property Address:</strong><br />
                    {form.address}<br />
                    {form.city}, {form.state} {form.zip}<br />
                    <br />
                    <strong>Property Type:</strong> {form.propertyType}<br />
                    <strong>Bedrooms:</strong> {form.bedrooms}<br />
                    <strong>Bathrooms:</strong> {form.bathrooms}<br />
                    <strong>Condition:</strong> {form.condition}<br />
                    <strong>Occupancy:</strong> {form.occupancy}<br />
                    <strong>Timeline to Sell:</strong> {form.timeline}<br />
                    <strong>Asking Price:</strong> {form.askingPrice ? `$${form.askingPrice}` : "N/A"}<br />
                    <strong>Notes:</strong> {form.notes || "(none)"}<br />
                    <br />
                    {form.disclosures && (
                        <Text>
                            <strong>Disclosures:</strong> <a href={form.disclosures}>View File</a>
                        </Text>
                    )}
                    {form.otherDocs && (
                        <Text>
                            <strong>Other Documents:</strong> <a href={form.otherDocs}>View File</a>
                        </Text>
                    )}
                    {Array.isArray(form.photos) && form.photos.length > 0 && (
                        <Text>
                            <strong>Photos:</strong><br />
                            {form.photos.map((url, idx) => (
                                <div key={idx}>
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        View Photo {idx + 1}
                                    </a>
                                </div>
                            ))}
                        </Text>
                    )}
                </Text>

                <Text style={{ marginTop: "30px", fontSize: "14px", color: "#888" }}>
                    — Notification from maliek-davis.com
                </Text>
            </div>
        </Html>
    );
};

export default MotivatedSellerNotificationEmail;
