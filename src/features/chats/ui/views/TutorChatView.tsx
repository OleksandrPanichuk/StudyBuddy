"use client";

import { useTRPC } from "@/components/trpc/TRPCProvider";
import { Routes } from "@/constants/routes";
import {
    ChatInput,
    ChatMessages,
    EmptyChatHero,
    SUGGESTED_PROMPTS,
    SuggestedPromptCard,
} from "@/features/chats";
import { Message } from "@/generated/prisma/client";
import { MessageRole } from "@/generated/prisma/enums";
import {
    InfiniteData,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ChatViewProps {
    chatId?: string;
    initialMessage?: string;
}

type MessagesPage = {
    messages: Message[];
    nextCursor: string | null;
};

export const TutorChatView = ({ chatId, initialMessage }: ChatViewProps) => {
    const [input, setInput] = useState("");

    const [optimisticUserMessage, setOptimisticUserMessage] =
        useState<Message | null>(null);

    const [isWaitingForAI, setIsWaitingForAI] = useState(false);
    const [pendingMessage, setPendingMessage] = useState("");
    const initialMessageSent = useRef(false);

    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const createChatMutation = useMutation({
        ...trpc.chats.create.mutationOptions(),
        onSuccess: (data) => {
            if (data) {
                const searchParams = new URLSearchParams();
                searchParams.set("message", pendingMessage);
                router.push(
                    `${Routes.CHATS}/${data.id}?${searchParams.toString()}`,
                );
            }
        },
        onError: (error) => {
            toast.error(error.message);
            setPendingMessage("");
        },
    });

    const sendMessageMutation = useMutation(
        trpc.messages.create.mutationOptions({
            onMutate: (variables) => {
                const now = new Date();
                const optimisticMessage: Message = {
                    id: `optimistic-${now.getTime()}`,
                    chatId: variables.chatId,
                    content: variables.message,
                    role: MessageRole.USER,
                    createdAt: now,
                    updatedAt: now,
                };

                setOptimisticUserMessage(optimisticMessage);
                setIsWaitingForAI(true);
                setInput("");
            },
            onSuccess: (data) => {
                if (!chatId) return;

                const queryKey = trpc.messages.getByChatId.infiniteQueryKey({
                    chatId,
                });

                queryClient.setQueryData<
                    InfiniteData<MessagesPage, string | null>
                >(queryKey, (oldData) => {
                    if (!oldData) return oldData;

                    const newPages = [...oldData.pages];
                    if (newPages.length > 0) {
                        newPages[0] = {
                            ...newPages[0],
                            messages: [
                                data.assistantMessage,
                                data.userMessage,
                                ...newPages[0].messages,
                            ],
                        };
                    }

                    return {
                        ...oldData,
                        pages: newPages,
                    };
                });

                setOptimisticUserMessage(null);
                setIsWaitingForAI(false);
            },
            onError: (error) => {
                toast.error(error.message);
                setOptimisticUserMessage(null);
                setIsWaitingForAI(false);
            },
        }),
    );

    useEffect(() => {
        if (chatId && initialMessage && !initialMessageSent.current) {
            initialMessageSent.current = true;
            sendMessageMutation.mutate({
                chatId,
                message: initialMessage,
            });
            router.replace(`${Routes.CHATS}/${chatId}`);
        }
    }, [chatId, initialMessage, sendMessageMutation, router]);

    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
    };

    const handleSubmit = (message: string) => {
        if (!message.trim()) return;

        if (chatId) {
            sendMessageMutation.mutate({
                chatId,
                message: message.trim(),
            });
        } else {
            setPendingMessage(message.trim());
            createChatMutation.mutate({
                message: message.trim(),
            });
        }
    };

    const isPending =
        createChatMutation.isPending || sendMessageMutation.isPending;

    if (!chatId) {
        return (
            <div className="flex h-full flex-col">
                <div className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-3xl px-4 py-8">
                        <EmptyChatHero />
                        <div className="grid gap-3 sm:grid-cols-2">
                            {SUGGESTED_PROMPTS.map((item, index) => (
                                <SuggestedPromptCard
                                    key={index}
                                    icon={item.icon}
                                    title={item.title}
                                    prompt={item.prompt}
                                    onClick={() =>
                                        handlePromptClick(item.prompt)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <ChatInput
                    value={input}
                    onChange={setInput}
                    onSubmit={handleSubmit}
                    disabled={isPending}
                />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-1 flex-col">
            <ChatMessages
                chatId={chatId}
                optimisticUserMessage={optimisticUserMessage}
                isWaitingForAI={isWaitingForAI}
            />
            <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                disabled={isPending}
            />
        </div>
    );
};
