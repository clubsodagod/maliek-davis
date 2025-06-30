
import NextAuth, { Session } from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { UserType } from "./library/types/users";
import credentialUserLogin from "./utility/hooks/credential-user-login";
import { serializeUser } from "./utility/fetchers/blog.server-fetcher";

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

                return serializeUser(user)
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

                // Only include verification-related data if needed for client-side handling
                // Example: Resending a verification email or prompting the user
                token.verificationToken = user.verificationToken;
                token.verificationTokenExpiration = user.verificationTokenExpiration;
            }

            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            // Create a user object with token properties
            const userObject = {
                _id: token._id,
                firstName: token.firstName,
                lastName: token.lastName,
                username: token.username,
                email: token.email as string,
                verifiedEmail: token.verifiedEmail as boolean,
                avatar: token.avatar,

                // Role and account-related metadata
                role: token.role,
                // Verification details (if relevant for the client-side logic)
                verificationToken: token.verificationToken,
                verificationTokenExpiration: token.verificationTokenExpiration,
            };


            // Add the user object to the session
            session.user = userObject as unknown as AdapterUser;
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


