"use client";

import { useTRPC } from "@/components/trpc/TRPCProvider";
import { Button } from "@/components/ui";
import { useInfiniteQueryRef } from "@/hooks";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { MessageSquarePlus, MessagesSquare } from "lucide-react";
import { Suspense, useState } from "react";
import {
    ChatsList,
    ChatsListSkeleton,
    EmptyChatsState,
    NewChatDialog,
} from "../components";

const TutorChatsContent = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const trpc = useTRPC();

    const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
        useSuspenseInfiniteQuery(
            trpc.chats.getAll.infiniteQueryOptions(
                {},
                {
                    getNextPageParam: (lastPage) => lastPage.nextCursor,
                    initialCursor: null,
                },
            ),
        );

    const ref = useInfiniteQueryRef({
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
    });

    const chats = data.pages.flatMap((page) => page.chats);

    const handleEdit = (id: string) => {
        console.log("Edit chat:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Delete chat:", id);
    };

    if (chats.length === 0) {
        return (
            <>
                <EmptyChatsState onCreateChat={() => setIsDialogOpen(true)} />
                <NewChatDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />
            </>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {chats.length} conversation{chats.length !== 1 ? "s" : ""}
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <MessageSquarePlus className="size-4" />
                    New Chat
                </Button>
            </div>
            <ChatsList
                chats={chats}
                onEdit={handleEdit}
                onDelete={handleDelete}
                infiniteScrollRef={hasNextPage ? ref : undefined}
            />
            <NewChatDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    );
};

export const TutorChatsView = () => {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <MessagesSquare className="size-8 text-primary" />
                    AI Tutor Chats
                </h1>
                <p className="text-muted-foreground mt-1">
                    Get personalized help from AI tutors on any subject
                </p>
            </div>
            <Suspense fallback={<ChatsListSkeleton />}>
                <TutorChatsContent />
            </Suspense>
        </div>
    );
};
