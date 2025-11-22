import { TRPCReactProvider } from "@/components/trpc/TRPCProvider";
import { Toaster } from "@/components/ui";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AI Study Buddy - Learn Smarter with AI-Powered Study Tools",
    description:
        "Transform your study materials into interactive quizzes, flashcards, and personalized explanations. Your AI study companion for better learning outcomes.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <TRPCReactProvider>
                    <Toaster />
                    {children}
                </TRPCReactProvider>
            </body>
        </html>
    );
}
