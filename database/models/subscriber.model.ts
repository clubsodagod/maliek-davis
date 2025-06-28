import mongoose, { Schema, model, Document, models } from "mongoose";

export interface ISubscriber extends Document {
    email: string;
    type: "UserSubscriber" | "GuestSubscriber";
    user?: mongoose.Schema.Types.ObjectId;
    name?: string;
}

const SubscriberSchema = new Schema<ISubscriber>(
    {
        email: { type: String, required: true, unique: true },
        type: { type: String, required: true, enum: ["UserSubscriber", "GuestSubscriber"] },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        name: { type: String },
    },
    { timestamps: true, discriminatorKey: "type" }
);

export const SubscriberModel =
    models.Subscriber || model<ISubscriber>("Subscriber", SubscriberSchema);

// Prevent multiple discriminator registration (especially in dev)
export const UserSubscriber =
    SubscriberModel.discriminators?.UserSubscriber ||
    SubscriberModel.discriminator(
        "UserSubscriber",
        new Schema({
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        })
    );

export const GuestSubscriber =
    SubscriberModel.discriminators?.GuestSubscriber ||
    SubscriberModel.discriminator(
        "GuestSubscriber",
        new Schema({
            name: { type: String, required: true },
        })
    );

export default SubscriberModel;
