import mongoose, { Schema, Document } from "mongoose";


export type Credentials = {
    credential:string;
    secret:string;
}

export interface IUserForm {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    conirmEmail: string;
    avatar: string;
    password: string;
    confirmPassword: string;
    role: "customer" | "employee" | "admin";
}


export interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    emailVerified: boolean;
    avatar: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    role: "customer" | "employee" | "admin";

    verificationToken: string;
    verificationTokenExpiration: Date;

    lastLogin: Date;
    loginCount: number;
    preferredCategories: string[];
    searchHistory: string[];
    viewedProducts: mongoose.Types.ObjectId[];
    purchaseHistory: mongoose.Types.ObjectId[];
    abandonedCarts: mongoose.Types.ObjectId[];
    wishlist: mongoose.Types.ObjectId[];
    favorites: mongoose.Types.ObjectId[];
    reviewsGiven: mongoose.Types.ObjectId[];

    communicationPreferences: {
        emailMarketing: boolean;
        smsMarketing: boolean;
        pushNotifications: boolean;
    };

    rewardPoints: number;
    membershipTier: "basic" | "silver" | "gold" | "platinum";

    defaultShippingAddress: mongoose.Types.ObjectId;
    savedAddresses: mongoose.Types.ObjectId[];
    savedPaymentMethods: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
    {
        firstName: { type: String },
        lastName: { type: String },
        username: { type: String },
        email: { type: String, required: true, unique: true },
        emailVerified: { type: Boolean, default: false },
        avatar: { type: String },
        password: { type: String },
        role: {
            type: String,
            enum: ["customer", "employee", "admin"],
            default: "customer",
        },

        // Verification
        verificationToken: { type: String },
        verificationTokenExpiration: { type: Date },

        // Analytics
        lastLogin: { type: Date },
        loginCount: { type: Number, default: 0 },
        preferredCategories: [{ type: String }],
        searchHistory: [{ type: String }],
        viewedProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        purchaseHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
        abandonedCarts: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
        wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        reviewsGiven: [{ type: Schema.Types.ObjectId, ref: "Review" }],

        // Communication Preferences
        communicationPreferences: {
            emailMarketing: { type: Boolean, default: true },
            smsMarketing: { type: Boolean, default: false },
            pushNotifications: { type: Boolean, default: true },
        },

        // Loyalty
        rewardPoints: { type: Number, default: 0 },
        membershipTier: {
            type: String,
            enum: ["basic", "silver", "gold", "platinum"],
            default: "basic",
        },

        // Address & Payment
        defaultShippingAddress: {
            type: Schema.Types.ObjectId,
            ref: "Address",
        },
        savedAddresses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Address",
                default: [],
            },
        ],
        savedPaymentMethods: [
            {
                type: Schema.Types.ObjectId,
                ref: "PaymentMethod",
                default: [],
            },
        ],
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel
