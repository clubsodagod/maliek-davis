import mongoose, { Schema, model, Document, models } from "mongoose";

// Define the common subscriber interface
export interface ISubscriber extends Document {
    email: string;
    type: "UserSubscriber" | "GuestSubscriber"; // Dynamic type field
    user?: mongoose.Schema.Types.ObjectId; // Reference to a user if applicable
    name?: string; // Only for guests
}

// Base Schema
export const SubscriberSchema = new Schema<ISubscriber>(
    {
        email: { type: String, required: true, unique: true },
        type: { type: String, required: true, enum: ["UserSubscriber", "GuestSubscriber"] },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        name: { type: String }, // Only required for guests
    },
    { timestamps: true }
);

export const SubscriberModel = models.Subscriber || model<ISubscriber>("Subscriber", SubscriberSchema);
// Discriminators for User and Guest
export const UserSubscriber = SubscriberModel.discriminator(
    "UserSubscriber",
    new Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    })
);
export const GuestSubscriber = SubscriberModel.discriminator(
    "GuestSubscriber",
    new Schema({
        name: { type: String, required: true },
    })
);


export default SubscriberModel
