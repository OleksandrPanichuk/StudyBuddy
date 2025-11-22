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
import { Routes } from "@/constants/routes";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for getting started",
        features: [
            "3 document uploads per week",
            "500MB storage",
            "Unlimited basic quizzes",
            "Unlimited flashcards",
            "Basic analytics",
        ],
        cta: "Get Started",
        href: Routes.SIGN_UP,
        variant: "outline" as const,
    },
    {
        name: "Pro",
        price: "$9.99",
        period: "/month",
        description: "For serious students",
        features: [
            "Unlimited uploads",
            "5GB storage",
            "Advanced quiz types (Essay, Short Answer)",
            "Study Plans & Groups",
            "Advanced Analytics",
            "Priority Processing",
        ],
        cta: "Upgrade to Pro",
        href: `${Routes.SIGN_UP}?plan=pro`,
        variant: "gradient" as const,
        popular: true,
    },
];

export const Pricing = () => {
    return (
        <section id="pricing" className="py-16 md:py-24 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Start for free, upgrade when you need more power.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card
                                className={`flex flex-col h-full ${plan.popular ? "border-indigo-500 shadow-lg relative" : ""}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-linear-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-full">
                                        Most Popular
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-2xl">
                                        {plan.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {plan.description}
                                    </CardDescription>
                                    <div className="mt-4 flex items-baseline text-3xl font-bold">
                                        {plan.price}
                                        {plan.period && (
                                            <span className="text-sm font-normal text-muted-foreground ml-1">
                                                {plan.period}
                                            </span>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <Check className="h-4 w-4 text-indigo-500 shrink-0" />
                                                <span className="text-sm text-muted-foreground">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Link href={plan.href} className="w-full">
                                        <Button
                                            className="w-full"
                                            variant={plan.variant}
                                        >
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground">
                        Are you a student?{" "}
                        <span className="font-semibold text-foreground">
                            Get 50% off
                        </span>{" "}
                        with a valid .edu email.
                    </p>
                </div>
            </div>
        </section>
    );
};
