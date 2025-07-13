// fetchers/contact.fetchers.ts
"use server";
import { ResponseStatus } from "@/context/_library/classes-types-interaces";
import connectToDB from "@/database/connect-to-db.database";
import ServiceRequestModel, { IServiceRequestInput } from "@/database/models/service-request.eco-wash";



export async function submitServiceRequest(
    form: IServiceRequestInput
): Promise<ResponseStatus> {
    try {
        await connectToDB();

        const newRequest = new ServiceRequestModel({
            fullName: form.fullName,
            phone: form.phone,
            email: form.email,
            address: form.address,
            city: form.city,
            state: form.state,
            zip: form.zip,
            notes: form.notes,
            serviceCategory: form.serviceCategory,
            selectedServices: form.selectedServices,
            photos: form.photos ?? [],
        });

        await newRequest.save();

        return {
            success: true,
            error: false,
            message: "Service request submitted successfully.",
            data: newRequest._id.toString(),
        };
    } catch (err: unknown) {
        console.error("[submitServiceRequest]", err);
        return {
            success: false,
            error: true,
            message: "Failed to submit service request. Please try again.",
        };
    }
}
