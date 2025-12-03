"use client";

import { Button } from "@/components/ui";
import { MessageSquarePlus, MessagesSquare } from "lucide-react";

interface EmptyChatsStateProps {
    onCreateChat: () => void;
}

export const EmptyChatsState = ({ onCreateChat }: EmptyChatsStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 mb-6">
                <MessagesSquare className="size-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No chats yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Start a new conversation with an AI tutor to get help with your
                studies. Ask questions, get explanations, and learn at your own
                pace.
            </p>
            <Button onClick={onCreateChat} className="gap-2">
                <MessageSquarePlus className="size-4" />
                Start Your First Chat
            </Button>
        </div>
    );
};
