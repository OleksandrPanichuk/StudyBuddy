import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import { tryCatch } from "@/utils";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "mongodb",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        minPasswordLength: 8,
        sendResetPassword: async ({ user, url }) => {
            const [result, error] = await tryCatch(
                sendEmail({
                    to: user.email,
                    subject: "Reset your password",
                    html: `Click <a href="${url}">here</a> to reset your password.`,
                }),
            );
            if (error) {
                console.error("Error sending reset password email:", error);
                throw new Error("Failed to send reset password email");
            }
            return result;
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        sendOnSignIn: false,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            const [result, error] = await tryCatch(
                sendEmail({
                    to: user.email,
                    subject: "Verify your email",
                    html: `Please verify your email by clicking <a href="${url}">here</a>.`,
                }),
            );

            if (error) {
                console.error("Error sending verification email:", error);
                throw new Error("Failed to send verification email");
            }

            return result;
        },
    },
    socialProviders: {
        google: {
            enabled: true,
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
    advanced: {
        cookiePrefix: "studybuddy_",
    },
    plugins: [nextCookies()],
});
