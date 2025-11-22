"use client";

import { Button } from "@/components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ResetPasswordInput, resetPasswordSchema } from "@/features/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/auth/client";
import { Routes } from "@/constants";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const ResetPasswordView = () => {
    const form = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            repeated: "",
        },
        mode: "onBlur",
    });

    const router = useRouter();
    const searchParams = useSearchParams();

    const token = useMemo(() => searchParams.get("token"), [searchParams]);

    const onSubmit = async (values: ResetPasswordInput) => {
        const { error } = await authClient.resetPassword({
            token: searchParams.get("token")!,
            newPassword: values.password,
        });

        if (error) {
            toast.error(error.message);
            console.error({ error });
            return;
        }

        toast.success("Password reset successfully!");

        form.reset();

        router.push(Routes.SIGN_IN);
    };

    if (!token) {
        redirect(Routes.FORGOT_PASSWORD);
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                    Enter your new password below to reset your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4"
                    >
                        <FormField
                            control={form.control}
                            name={"password"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type={"password"}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"repeated"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type={"password"}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full">Reset password</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <div className="w-full text-center text-sm">
                    <Link href={Routes.SIGN_IN} className="underline">
                        Back to Sign In
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};
