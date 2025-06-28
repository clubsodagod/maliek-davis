"use server"
import { ResponseStatus } from '@/context/_library/classes-types-interaces';
import connectToDB from '@/database/connect-to-db.database';
import UserModel, { IUser, IUserForm } from '@/database/models/user.model';
import bcrypt from 'bcryptjs';
import xss from 'xss';
import { generateVerificationToken } from '../verification-token-generator';
import generateVerificationLink from '../generate-verification-link';
import { getBaseUrl } from '../get-base-api-url';
import { Resend } from "resend";
import dotenv from 'dotenv';
import UserRegistrationEmailVerification from '@/app/emails/UserRegistrationEmailVerification';
import SubscriberModel, { UserSubscriber, GuestSubscriber } from '@/database/models/subscriber.model';
import { isValidObjectId } from 'mongoose';
import NewSubscriberEmail from '@/app/emails/NewSubscriberEmail';

// load env file
dotenv.config()


export async function registerAdminUser(data: IUserForm): Promise<ResponseStatus> {
    try {
        await connectToDB(); // Ensure DB connection is established

        const {
            firstName,
            lastName,
            username,
            email,
            conirmEmail,
            avatar,
            password,
            confirmPassword,
            role
        } = data;

        if (role !== 'admin') {
            return { error: true, message: 'Unauthorized role. Only admins can be registered here.' };
        }

        // 1. Field validation
        if (!firstName || !lastName || !username || !email || !conirmEmail || !password || !confirmPassword) {
            return { error: true, message: 'All required fields must be provided.' };
        }

        // 2. Regex email and password checks
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { error: true, message: 'Invalid email format.' };
        }

        if (email !== conirmEmail) {
            return { error: true, message: 'Emails do not match.' };
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return {
                error: true,
                message: 'Password must be at least 8 characters, include a number and an uppercase letter.',
            };
        }

        if (password !== confirmPassword) {
            return { error: true, message: 'Passwords do not match.' };
        }

        // 3. Sanitize input
        const sanitizedData = {
            firstName: xss(firstName.trim()),
            lastName: xss(lastName.trim()),
            username: xss(username.trim().toLowerCase()),
            email: xss(email.trim().toLowerCase()),
            avatar: xss(avatar.trim()),
            role,
        };

        // 4. Check if user already exists
        const existingUser: IUser | null = await UserModel.findOne({
            $or: [
                { email: sanitizedData.email },
                { username: sanitizedData.username },
            ]
        });

        if (existingUser) {
            return { error: true, message: 'A user with that email or username already exists.' };
        }

        // 5. Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = generateVerificationToken();
        const verificationUrl = generateVerificationLink(verificationToken, getBaseUrl(), email, sanitizedData.firstName, sanitizedData.lastName);

        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 24);

        // 6. Save user to MongoDB
        const newUser = new UserModel({
            ...sanitizedData,
            password: hashedPassword,
            emailVerified: false,
            verificationToken,
            verificationTokenExpiration: expirationDate,
        });

        await newUser.save();

        // 7. Send verification email
        const emailResponse = await sendVerificationEmail(newUser.email, verificationUrl);

        console.log(`emailResponse:${emailResponse}`)

        return {
            error: false,
            message: 'Registration Successful! Please check your email to verify your account.',
        };

    } catch (err) {
        console.error('Registration error:', err);
        return { error: true, message: 'Internal server error. Please try again later.' };
    }
}



async function sendVerificationEmail(
    email: string,
    verificationUrl: string
): Promise<ResponseStatus> {

    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    try {

        // Step 2: Construct verification email JSX
        const emailComponent = UserRegistrationEmailVerification({
            verificationUrl
        });

        // Step 3: Send email
        const response = await resend.emails.send({
            from: "self@maliek-davis.com",
            to: [email],
            subject: "Verify your email with Maliek Davis",
            react: emailComponent as React.ReactElement,
        });

        if (response.error) {
            return {
                error: false,
                message: `Failed to send email: ${response.error.message}`,
            };
        }

        return {
            error: true,
            message: "Verification email sent successfully.",
            data: response,
        };
    } catch (error) {
        console.error("Email verification error:", error);

        return {
            error: false,
            message: `Error: ${error}`,
        };
    }
}

interface VerifyEmailInput {
    token: string;
}

export async function verifyUserEmail({ token }: VerifyEmailInput): Promise<{ success: boolean; message: string; user?: IUser | null | undefined }> {
    try {
        console.log(token);

        if (!token) {
            return { success: false, message: "Verification token is required." };
        }

        await connectToDB()

        const user = await UserModel.findOne({ verificationToken: token });

        if (!user) {
            return { success: false, message: "Invalid verification token." };
        }

        if (user.emailVerified) {
            return { success: false, message: "Email is already verified." };
        }

        if (user.verificationTokenExpiration < new Date()) {
            return { success: false, message: "Verification token has expired." };
        }

        user.emailVerified = true;
        // user.verificationToken = "";
        // user.verificationTokenExpiration = new Date(0); // Optional: invalidate the token explicitly
        await user.save();

        return { success: true, message: "Email verified successfully.", user };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error verifying email:", error);
        return { success: false, message: "An unexpected error occurred during email verification." };
    }
}



interface SubscriberInput {
    email: string;
    firstName?: string;
    lastName?: string;
    userId?: string;
}

export async function submitSubscriber(input: SubscriberInput): Promise<ResponseStatus> {
    await connectToDB();

    const { email, firstName, lastName, userId } = input;

    const trimmedEmail = email?.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        return { error: true, message: "Invalid email address" };
    }

    const existing = await SubscriberModel.findOne({ email: trimmedEmail });
    if (existing) {
        return { error: true, message: "This email is already subscribed" };
    }

    try {
        let newSubscriber;
        let subscriberType: "UserSubscriber" | "GuestSubscriber" = "GuestSubscriber";

        if (userId && isValidObjectId(userId)) {
            newSubscriber = new UserSubscriber({
                email: trimmedEmail,
                type: "UserSubscriber",
                user: userId,
            });
            subscriberType = "UserSubscriber";
        } else {
            if (!firstName || !lastName) {
                return { error: true, message: "First and last name are required for guest subscribers" };
            }
            newSubscriber = new GuestSubscriber({
                email: trimmedEmail,
                type: "GuestSubscriber",
                name: `${firstName.trim()} ${lastName.trim()}`,
            });
        }

        await newSubscriber.save();

        // Construct email JSX
        const emailComponent = NewSubscriberEmail({
            email: trimmedEmail,
            name: firstName ? `${firstName.trim()} ${lastName?.trim() ?? ""}` : undefined,
            type: subscriberType,
        });

        // Send email using Resend
        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
        const response = await resend.emails.send({
            from: "self@maliek-davis.com",
            to: [trimmedEmail],
            subject: "Welcome to the Community – You're Subscribed!",
            react: emailComponent as React.ReactElement,
        });

        if (response.error) {
            return {
                error: true,
                message: `Failed to send welcome email: ${response.error.message}`,
            };
        }

        return {
            error: false,
            message: "Subscription successful and welcome email sent.",
            data: newSubscriber._id.toString(),
        };
    } catch (error) {
        console.error("Subscriber error:", error);
        return {
            error: true,
            message: "An unexpected error occurred. Please try again.",
        };
    }
}
