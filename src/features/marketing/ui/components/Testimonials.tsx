"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Star } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Medical Student",
        content:
            "StudyBuddy saved me during finals! The AI-generated quizzes were spot on and helped me identify exactly what I didn't know.",
        avatar: "SJ",
    },
    {
        name: "Michael Chen",
        role: "Computer Science Major",
        content:
            "The flashcard system is amazing. I love how it automatically pulls key concepts from my lecture notes.",
        avatar: "MC",
    },
    {
        name: "Emily Davis",
        role: "High School Senior",
        content:
            "I used to spend hours making study guides. Now StudyBuddy does it for me in seconds. Highly recommend!",
        avatar: "ED",
    },
];

export const Testimonials = () => {
    return (
        <section id="testimonials" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Loved by students everywhere
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Join thousands of students who are studying smarter with
                        StudyBuddy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="bg-background border shadow-sm h-full">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-4 w-4 fill-primary text-primary"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground italic">
                                        &quot;{testimonial.content}&quot;
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
