"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import {
    BarChart3,
    BrainCircuit,
    Clock,
    FileText,
    Layers,
    MessageSquareText,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
    {
        title: "Document Management",
        description:
            "Upload PDFs, DOCX, and TXT files. We'll extract the content and organize it for you.",
        icon: FileText,
    },
    {
        title: "AI Quiz Generation",
        description:
            "Instantly generate multiple-choice, true/false, and short-answer quizzes from your materials.",
        icon: BrainCircuit,
    },
    {
        title: "Smart Flashcards",
        description:
            "Auto-generate flashcards and review them with our spaced repetition system.",
        icon: Layers,
    },
    {
        title: "AI Explainer",
        description:
            "Ask questions about your documents and get instant, context-aware explanations.",
        icon: MessageSquareText,
    },
    {
        title: "Study Sessions",
        description:
            "Track your study time, set goals, and maintain your learning streak.",
        icon: Clock,
    },
    {
        title: "Advanced Analytics",
        description:
            "Visualize your progress, identify weak topics, and optimize your study routine.",
        icon: BarChart3,
    },
];

export const Features = () => {
    return (
        <section id="features" className="py-16 md:py-24 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Everything you need to ace your exams
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        StudyBuddy combines powerful AI with proven learning
                        techniques to help you master any subject faster.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-linear-to-br from-sky-100 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
