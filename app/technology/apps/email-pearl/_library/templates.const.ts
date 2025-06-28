import PropertyInterestEmail from "@/app/emails/web-render/PropertyInterestEmail";


export const COMPONENT_MAP = [
    {
        _id: "property-interest",
        name: "Property Interest Email",
        subject: "Vacant Property Contact",
        componentSource: "PropertyInterestEmail",
        requiredFields: ["name", "propertyName", "email"],
        Component: PropertyInterestEmail, // ← actual component reference
    }
];
