
import NextAuth, { Session } from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { ObjectId } from "mongodb";
import { UserType } from "./library/types/users";
import credentialUserLogin from "./utility/fetchers/user.fetcher";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
            clientId: "",
            clientSecret: ""
        }),
        CredentialsProvider({
            credentials: {
                credential: { label: "Email or username", name: "credential" },
                secret: { label: "Password", type: "password", name: "secret" }
            },
            async authorize(credentials) {

                // define user 
                let user = null;

                console.log(credentials);

                // validate user credentials
                user = await credentialUserLogin(credentials?.secret as string, credentials?.credential as string)
                console.log(user);
                
                if (!user) {
                    throw new Error('Something went wrong with the login attempt. Please try again.')
                }

                return user.user
            }
        })
    ],
    // adapter: MongoDBAdapter(dbClient),
    callbacks: {
        async jwt({ token, user }) {// Add the user properties to the token after signing in
            if (user) {
                token._id = user._id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.username = user.username;
                token.email = user.email;
                token.verifiedEmail = user.verifiedEmail as boolean;
                token.avatar = user.avatar;

                // Role and account-related metadata
                token.role = user.role;

                // Analytics and engagement metrics
                token.lastLogin = user.lastLogin;
                token.loginCount = user.loginCount;

                // Loyalty and rewards
                token.rewardPoints = user.rewardPoints;
                token.membershipTier = user.membershipTier;

                // Communication preferences (if used client-side for notifications)
                token.communicationPreferences = user.communicationPreferences;

                // Optionally include user preferences for personalization
                token.preferredCategories = user.preferredCategories;

                // Only include verification-related data if needed for client-side handling
                // Example: Resending a verification email or prompting the user
                token.verificationToken = user.verificationToken;
                token.verificationTokenExpiration = user.verificationTokenExpiration;
            }

            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            // Create a user object with token properties
            const userObject: AdapterUser = {
                _id: token._id,
                firstName: token.firstName,
                lastName: token.lastName,
                username: token.username,
                email: token.email as string,
                verifiedEmail: token.verifiedEmail as boolean,
                avatar: token.avatar,

                // Role and account-related metadata
                role: token.role,

                // Analytics and engagement metrics
                lastLogin: token.lastLogin,
                loginCount: token.loginCount,

                // Loyalty and rewards
                rewardPoints: token.rewardPoints,
                membershipTier: token.membershipTier,

                // Communication preferences
                communicationPreferences: token.communicationPreferences,

                // User preferences for personalization
                preferredCategories: token.preferredCategories,

                // Verification details (if relevant for the client-side logic)
                verificationToken: token.verificationToken,
                verificationTokenExpiration: token.verificationTokenExpiration,
                id: "",
                emailVerified: null,
                password: "",
                createdAt: new Date(),
                updatedAt: new Date(),
                searchHistory: [],
                viewedProducts: [],
                purchaseHistory: [],
                abandonedCarts: [],
                wishlist: [],
                favorites: [],
                reviewsGiven: [],
                defaultShippingAddress: new ObjectId(),
                savedAddresses: [],
                savedPaymentMethods: []
            };


            // Add the user object to the session
            session.user = userObject;
            console.log(session);

            return session;
        },
    },
    session: {
        strategy: "jwt",
    }
})


declare module "next-auth" {
    interface User extends UserType {
        error?: "RefreshTokenError"
    }
}
declare module "next-auth" {
    interface AdapterUser extends UserType {
        error?: "RefreshTokenError";
    }
}

declare module "next-auth/jwt" {
    interface JWT extends UserType { 
        init?:null|undefined
    }
}