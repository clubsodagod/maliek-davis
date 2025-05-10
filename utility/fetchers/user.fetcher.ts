"use server"
import { ResponseStatus } from '@/context/_library/classes-types-interaces';
import connectToDB from '@/database/connect-to-db.database';
import UserModel, { IUserForm } from '@/database/models/user.model';
import bcrypt from 'bcryptjs';
import xss from 'xss';
import { generateVerificationToken } from '../verification-token-generator';
import generateVerificationLink from '../generate-verification-link';
import { getBaseUrl } from '../get-base-api-url';
import { Resend } from "resend";
import dotenv from 'dotenv';
import UserRegistrationEmailVerification from '@/app/emails/UserRegistrationEmailVerification';
import { IUser } from 'c:/Users/owner/Desktop/rebranded/database/models/user.model';

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
        const existingUser:IUser|null = await UserModel.findOne({
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
