"use client";

import { authClient } from "@/auth/client";
import { Button } from "@/components/ui/Button";
import { Routes } from "@/constants/routes";
import { motion } from "motion/react";
import Link from "next/link";

export const CTA = () => {
    const { data: session } = authClient.useSession();
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-16 text-center text-white overflow-hidden relative"
                >
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Ready to transform your study habits?
                        </h2>
                        <p className="text-lg text-white/80">
                            Join thousands of students who are already saving
                            time and getting better grades with StudyBuddy.
                        </p>
                        <Link
                            href={session ? Routes.DASHBOARD : Routes.SIGN_UP}
                        >
                            <Button
                                size="lg"
                                variant="secondary"
                                className="w-full sm:w-auto font-semibold text-indigo-600 hover:text-indigo-700"
                            >
                                Start Studying for Free
                            </Button>
                        </Link>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </motion.div>
            </div>
        </section>
    );
};
