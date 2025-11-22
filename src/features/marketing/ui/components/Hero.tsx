"use client";

import { authClient } from "@/auth/client";
import { Button } from "@/components/ui/Button";
import { Routes } from "@/constants/routes";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Link from "next/link";
import { MouseEvent } from "react";

export const Hero = () => {
    const { data: session } = authClient.useSession();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-16"
            onMouseMove={handleMouseMove}
        >
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.15), transparent 80%)`,
                    }}
                />
                <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
            </div>

            <div className="container mx-auto px-4 relative">
                <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-linear-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400"
                    >
                        <Sparkles className="mr-2 h-3 w-3" />
                        <span>AI-Powered Learning</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
                    >
                        Your Personal AI Study Assistant
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl"
                    >
                        Upload your documents and let AI generate quizzes,
                        flashcards, and explanations instantly. Study smarter,
                        not harder.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <Link href={session ? Routes.DASHBOARD : Routes.SIGN_UP}>
                            <Button
                                size="lg"
                                variant="gradient"
                                className="w-full sm:w-auto gap-2"
                            >
                                Get Started for Free
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto"
                            >
                                Learn More
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mt-16 relative w-full max-w-5xl mx-auto rounded-xl border bg-background/50 shadow-2xl overflow-hidden aspect-video"
                    >
                        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                            <p className="text-muted-foreground font-medium">
                                [Insert Dashboard Screenshot Here]
                                <br />
                                <span className="text-sm opacity-70">
                                    1200x675px recommended
                                </span>
                            </p>
                        </div>
                        {/* <Image src="/dashboard-preview.png" alt="Dashboard Preview" fill className="object-cover" /> */}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
