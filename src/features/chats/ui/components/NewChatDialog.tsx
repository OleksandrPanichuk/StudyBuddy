"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui";
import { FileTextIcon, SparklesIcon } from "lucide-react";
import { Routes } from "@/constants/routes";

interface INewChatDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const CHAT_TEMPLATES = [
    {
        id: "1",
        name: "Math Tutor",
        subject: "Mathematics",
        description: "Get help with algebra, calculus, and more",
    },
    {
        id: "2",
        name: "Science Helper",
        subject: "Science",
        description: "Chemistry, Physics, Biology assistance",
    },
    {
        id: "3",
        name: "History Guide",
        subject: "History",
        description: "Explore historical events and contexts",
    },
    {
        id: "4",
        name: "Language Learning",
        subject: "Languages",
        description: "Practice and improve language skills",
    },
    {
        id: "5",
        name: "Programming Mentor",
        subject: "Computer Science",
        description: "Coding help and debugging support",
    },
];

type ChatMode = "selection" | "template";

export const NewChatDialog = ({ open, onOpenChange }: INewChatDialogProps) => {
    const router = useRouter();
    const [mode, setMode] = useState<ChatMode>("selection");
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
        null,
    );

    const handleFromScratch = () => {
        onOpenChange(false);
        router.push(Routes.NEW_CHAT);
    };

    const handleFromTemplate = () => {
        setMode("template");
    };

    const handleTemplateSelect = (templateId: string) => {
        setSelectedTemplate(templateId);
    };

    const handleCreateFromTemplate = () => {
        if (!selectedTemplate) return;

        onOpenChange(false);
        router.push(`${Routes.NEW_CHAT}?template=${selectedTemplate}`);
    };

    const handleBack = () => {
        setMode("selection");
        setSelectedTemplate(null);
    };

    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => {
            setMode("selection");
            setSelectedTemplate(null);
        }, 200);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                {mode === "selection" ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Create New Chat</DialogTitle>
                            <DialogDescription>
                                Choose how you&apos;d like to start your AI tutor
                                chat
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <button
                                onClick={handleFromScratch}
                                className="flex flex-col items-start gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent hover:border-accent-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <FileTextIcon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            Start from Scratch
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Create a custom chat for any subject
                                        </p>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={handleFromTemplate}
                                className="flex flex-col items-start gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent hover:border-accent-foreground/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <SparklesIcon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            Use a Template
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Choose from pre-configured tutor
                                            templates
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Choose a Template</DialogTitle>
                            <DialogDescription>
                                Select a pre-configured tutor template to get
                                started quickly
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-3 py-4 max-h-[400px] overflow-y-auto px-3">
                            {CHAT_TEMPLATES.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() =>
                                        handleTemplateSelect(template.id)
                                    }
                                    className={`flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                                        selectedTemplate === template.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border"
                                    }`}
                                >
                                    <div className="flex items-start justify-between w-full">
                                        <div>
                                            <h4 className="font-semibold">
                                                {template.name}
                                            </h4>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {template.subject}
                                            </p>
                                        </div>
                                        {selectedTemplate === template.id && (
                                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                                                <svg
                                                    className="h-3 w-3 text-primary-foreground"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {template.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between gap-3">
                            <Button variant="outline" onClick={handleBack}>
                                Back
                            </Button>
                            <Button
                                onClick={handleCreateFromTemplate}
                                disabled={!selectedTemplate}
                            >
                                Create Chat
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
