"use client";

import { authClient } from "@/auth/client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui";
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
import { Routes } from "@/constants";
import { SignInInput, signInSchema } from "@/features/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GoogleIcon } from "@/components/icons";

export const SignInView = () => {
    const form = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    const router = useRouter();

    const onSubmit = async (values: SignInInput) => {
        const { data, error } = await authClient.signIn.email(values);

        if (error) {
            toast.error(error.message);
            console.error({ error });
            return;
        }

        toast.success("Successfully signed in!");

        form.reset();

        router.push(Routes.DASHBOARD);
    };

    const onSocialAuth = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
        });

        if (error) {
            toast.error(error.message);
            console.error({ error });
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="grid gap-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="email"
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <FormLabel>Password</FormLabel>
                                        <Link
                                            href={Routes.FORGOT_PASSWORD}
                                            className="ml-auto inline-block text-sm underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            required
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="w-full">Login</Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            type="button"
                            className="w-full"
                            onClick={onSocialAuth}
                        >
                            <GoogleIcon />
                            Google
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <div className="w-full text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href={Routes.SIGN_UP} className="underline">
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};
