import { MarkdownRenderer } from "@/components/markdown";
import { Message } from "@/generated/prisma/client";
import { MessageRole } from "@/generated/prisma/enums";
import { cn } from "@/utils";
import { BotIcon, UserIcon } from "lucide-react";
import { memo } from "react";

interface IChatMessageProps {
    message: Message;
}

export const ChatMessage = memo(({ message }: IChatMessageProps) => {
    return (
        <div
            key={message.id}
            className={cn(
                "flex gap-4",
                message.role === MessageRole.USER
                    ? "justify-end"
                    : "justify-start",
            )}
        >
            {message.role === MessageRole.ASSISTANT && (
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <BotIcon className="size-5 text-primary-foreground" />
                </div>
            )}
            <div
                className={cn(
                    "rounded-2xl px-4 py-3",
                    message.role === "USER"
                        ? "bg-primary text-primary-foreground max-w-[75%]"
                        : "bg-muted w-full",
                )}
            >
                <MarkdownRenderer markdown={message.content} />
            </div>
            {message.role === MessageRole.USER && (
                <div className="shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <UserIcon className="size-5 text-secondary-foreground" />
                </div>
            )}
        </div>
    );
});

ChatMessage.displayName = "ChatMessage";
