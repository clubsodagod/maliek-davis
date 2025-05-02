import mongoose from "mongoose";

export type Credentials = {
    credential:string;
    secret:string;
}


export type UserType = {
    _id:mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    verifiedEmail: boolean;
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

export interface ClientUserRegisterFormType {
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    password:string;
    avatar:string;
    type:string;
}

export interface UserUpdateForm {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    emailVerified: boolean;
    avatar: string;
    password: string;
    role: "customer" | "employee" | "admin";

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