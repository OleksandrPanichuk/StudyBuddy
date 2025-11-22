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
import { Mail } from "lucide-react";
import Link from "next/link";
import { Routes } from "@/constants";
import { authClient } from "@/auth/client";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export const VerifyEmailView = () => {
    const searchParams = useSearchParams();

    const onResendEmail = async () => {
        const { error } = await authClient.sendVerificationEmail({
            callbackURL: Routes.DASHBOARD,
            email: searchParams.get("email") || "",
        });

        if (error) {
            toast.error(error.message);
            console.error({ error });
            return;
        }

        toast.success("Verification email resent successfully!");
    };
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-primary/10 p-4">
                        <Mail className="h-8 w-8 text-primary" />
                    </div>
                </div>
                <CardTitle className="text-center">Check your email</CardTitle>
                <CardDescription className="text-center">
                    We have sent a verification link to your email address.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-sm text-muted-foreground">
                    Click the link in the email to verify your account. If you
                    don&apos;t see it, check your spam folder.
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button
                    onClick={onResendEmail}
                    variant="outline"
                    className="w-full"
                >
                    Resend Email
                </Button>
                <div className="w-full text-center text-sm mt-2">
                    <Link href={Routes.SIGN_IN} className="underline">
                        Back to Sign In
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};
