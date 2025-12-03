"use client";

import { useTRPC } from "@/components/trpc/TRPCProvider";
import { ChatMessage } from "@/features/chats";
import { Message } from "@/generated/prisma/client";
import { useInfiniteQueryRef } from "@/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import "katex/dist/katex.min.css";
import { BotIcon, Loader2Icon } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

interface ChatMessagesProps {
    chatId: string;
    optimisticUserMessage?: Message | null;
    isWaitingForAI?: boolean;
}

export const ChatMessages = ({
    chatId,
    optimisticUserMessage,
    isWaitingForAI,
}: ChatMessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const trpc = useTRPC();

    const {
        data: messagesData,
        isFetching,
        isLoading,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery(
        trpc.messages.getByChatId.infiniteQueryOptions(
            {
                chatId,
            },
            {
                getNextPageParam: (lastPage) => lastPage.nextCursor,
            },
        ),
    );

    const topElementRef = useInfiniteQueryRef({
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
    });

    // Messages come from server newest first, reverse for display (oldest at top)
    const messages = useMemo(() => {
        if (!messagesData) return [];
        // Flatten pages and reverse to show oldest at top, newest at bottom
        return messagesData.pages.flatMap((page) => page.messages).reverse();
    }, [messagesData]);

    // Scroll to bottom when new messages arrive or optimistic message appears
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, optimisticUserMessage, isWaitingForAI]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2Icon className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!messagesData) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Chat not found</p>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4 space-y-6"
        >
            {hasNextPage && (
                <div ref={topElementRef} className="flex justify-center py-2">
                    {isFetching && (
                        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
                    )}
                </div>
            )}

            {messages.map((msg) => (
                <ChatMessage message={msg} key={msg.id} />
            ))}

            {optimisticUserMessage && (
                <ChatMessage message={optimisticUserMessage} />
            )}

            {isWaitingForAI && (
                <div className="flex gap-4 justify-start">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <BotIcon className="size-5 text-primary-foreground" />
                    </div>
                    <div className="rounded-2xl px-4 py-3 bg-muted">
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        </div>
                    </div>
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    );
};
