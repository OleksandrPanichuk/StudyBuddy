import { z } from "zod";

export const signInSchema = z.object({
    email: z.email("Email is not valid"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
    email: z.email("Email is not valid"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    name: z.string().min(2, "Name must be at least 2 characters long"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
    email: z.email("Email is not valid"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
        repeated: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
    })
    .refine((data) => data.password === data.repeated, {
        message: "Passwords do not match",
        path: ["repeated"],
    });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
