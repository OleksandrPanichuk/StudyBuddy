"use client";

import { authClient } from "@/auth/client";
import { Button } from "@/components/ui/Button";
import { Routes } from "@/constants/routes";
import { BookOpen } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export const Header = () => {
    const { data: session, isPending, error } = authClient.useSession();
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link
                        href={Routes.ROOT}
                        className="flex items-center gap-2"
                    >
                        <div className="rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 p-1">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            StudyBuddy
                        </span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link
                        href="#features"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Features
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#testimonials"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Testimonials
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    {!session && !isPending && (
                        <>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={Routes.SIGN_IN}>Sign In</Link>
                            </Button>
                            <Button size="sm" variant="gradient" asChild>
                                <Link href={Routes.SIGN_UP}>Get Started</Link>
                            </Button>
                        </>
                    )}
                    {session && (
                        <Button variant="gradient" size="sm" asChild>
                            <Link href={Routes.DASHBOARD}>Go to Dashboard</Link>
                        </Button>
                    )}
                </div>
            </div>
        </motion.header>
    );
};
