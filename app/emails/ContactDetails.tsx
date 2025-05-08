import { Heading,  Html, } from "@react-email/components";
import * as React from 'react';

interface FormDetails {
    firstName?: string;
    lastName?: string;
    company?: string;
    email?: string;
    phone?: string;
    reason?: string;
    message?: string;
}

const ContactDetails: React.FC<{ form?: FormDetails }> = ({ form }) => {
    const firstName = form?.firstName
    const lastName = form?.lastName
    const company = form?.company 
    const email = form?.email 
    const phone = form?.phone 
    const reason = form?.reason 
    const message = form?.message 


    return (
        <Html>
            <div
                style={{
                    fontFamily: "sans-serif",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <Heading
                    as="h1"
                    style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}
                >
                    Someone Just Contacted You!
                </Heading>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "#fff",
                        borderRadius: "24px",
                        overflow: "hidden",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "#4CAF50",
                                color: "#fff",
                                textAlign: "left",
                            }}
                        >
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Field</th>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                First
                            </td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                {firstName || "N/A"}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                Last name
                            </td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                {lastName || "N/A"}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                Company
                            </td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                {company || "N/A"}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                Email
                            </td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                {email || "N/A"}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                Phone
                            </td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                {phone || "N/A"}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                Reason
                            </td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                {reason || "N/A"}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                Message
                            </td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                {message || "N/A"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Html>
    );
}

export default ContactDetails