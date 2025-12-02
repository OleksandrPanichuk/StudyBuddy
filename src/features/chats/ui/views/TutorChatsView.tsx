"use client";

import { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui";
import { MessageSquarePlus, MessagesSquare } from "lucide-react";
import { NewChatDialog } from "../components";

export const TutorChatsView = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <MessagesSquare className="size-8 text-primary" />
                        AI Tutor Chats
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Get personalized help from AI tutors on any subject
                    </p>
                </div>
                <Button
                    className="w-fit gap-2"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <MessageSquarePlus className="size-4" />
                    New Chat
                </Button>
            </div>

            {/* Empty State or Chat List */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Chats</CardTitle>
                    <CardDescription>
                        All your AI tutor conversations in one place
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 mb-4">
                            <MessagesSquare className="size-10 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            No chats yet
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                            Start a new conversation with an AI tutor to get
                            help with your studies
                        </p>
                        <Button
                            onClick={() => setIsDialogOpen(true)}
                            variant="outline"
                            className="gap-2"
                        >
                            <MessageSquarePlus className="size-4" />
                            Create Your First Chat
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Dialog */}
            <NewChatDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </div>
    );
};
