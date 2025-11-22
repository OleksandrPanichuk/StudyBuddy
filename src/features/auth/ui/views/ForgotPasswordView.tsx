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
import { ForgotPasswordInput, forgotPasswordSchema } from "@/features/auth";
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

export const ForgotPasswordView = () => {
    const form = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
        mode: "onBlur",
    });

    const onSubmit = async (values: ForgotPasswordInput) => {
        const { error } = await authClient.requestPasswordReset({
            email: values.email,
            redirectTo: Routes.RESET_PASSWORD,
        });

        if (error) {
            toast.error(error.message);
            console.error({ error });
            return;
        }

        toast.success("Check your email for a reset link!");

        form.reset();
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                    Enter your email address and we will send you a link to
                    reset your password
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
                            name={"email"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full">Send Reset Link</Button>
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
