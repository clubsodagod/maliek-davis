import mongoose, { Schema, Document } from "mongoose";

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

    // Account Verification
    verificationToken: string;
    verificationTokenExpiration: Date;

    // Analytics and Preferences
    lastLogin: Date; // Tracks last activity for engagement metrics
    loginCount: number; // Measures engagement frequency
    preferredCategories: string[]; // Tracks user preferences for recommendations
    searchHistory: string[]; // Useful for personalized recommendations
    viewedProducts: mongoose.Types.ObjectId[]; // Tracks previously viewed items
    purchaseHistory: mongoose.Types.ObjectId[]; // Tracks previous purchases
    abandonedCarts: mongoose.Types.ObjectId[]; // Tracks carts left incomplete
    wishlist: mongoose.Types.ObjectId[]; // Tracks desired but unpurchased items
    favorites: mongoose.Types.ObjectId[]; // Tracks favorite items
    reviewsGiven: mongoose.Types.ObjectId[]; // Links to reviews left by the user
    communicationPreferences: {
        emailMarketing: boolean; // Opt-in for promotional emails
        smsMarketing: boolean; // Opt-in for promotional texts
        pushNotifications: boolean; // Opt-in for app/browser notifications
    };

    // Loyalty and Rewards
    rewardPoints: number; // Tracks points for loyalty programs
    membershipTier: "basic" | "silver" | "gold" | "platinum"; // Tracks loyalty tier

    // Address and Payment
    defaultShippingAddress: mongoose.Types.ObjectId; // Links to the user’s default address
    savedAddresses: mongoose.Types.ObjectId[]; // Links to all saved addresses
    savedPaymentMethods: mongoose.Types.ObjectId[]; // Links to saved payment methods
}


const UserSchema = new Schema(
    {
        // Basic Info
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        emailVerified: { type: Boolean, default: false },
        avatar: { type: String },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        role: { type: String, enum: ["customer", "employee", "admin"], default: "customer" },

        // Account Verification
        verificationToken: { type: String },
        verificationTokenExpiration: { type: Date },

        // Analytics and Preferences
        lastLogin: { type: Date },
        loginCount: { type: Number, default: 0 },
        preferredCategories: { type: [String], default: [] },
        searchHistory: { type: [String], default: [] },
        viewedProducts: [{ type: mongoose.Types.ObjectId, ref: "Product", default:[] }],
        purchaseHistory: [{ type: mongoose.Types.ObjectId, ref: "Order", default:[] }],
        abandonedCarts: [{ type: mongoose.Types.ObjectId, ref: "Cart", default:[] }],
        wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product", default:[] }],
        favorites: [{ type: mongoose.Types.ObjectId, ref: "Product", default:[] }],
        reviewsGiven: [{ type: mongoose.Types.ObjectId, ref: "Review", default:[] }],
        communicationPreferences: {
            emailMarketing: { type: Boolean, default: true },
            smsMarketing: { type: Boolean, default: false },
            pushNotifications: { type: Boolean, default: true },
        },

        // Loyalty and Rewards
        rewardPoints: { type: Number, default: 0 },
        membershipTier: {
            type: String,
            enum: ["basic", "silver", "gold", "platinum"],
            default: "basic",
        },

        // Address and Payment
        defaultShippingAddress: { type: mongoose.Types.ObjectId, ref: "Address" },
        savedAddresses: [{ type: mongoose.Types.ObjectId, ref: "Address", default:[] }],
        savedPaymentMethods: [{ type: mongoose.Types.ObjectId, ref: "PaymentMethod", default:[] }],
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt fields
    }
);

// Export the User model
const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserModel;