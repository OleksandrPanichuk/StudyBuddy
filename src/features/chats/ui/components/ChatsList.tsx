"use client";

import { RefCallback } from "react";
import { ChatItem } from "./ChatItem";

interface Chat {
    id: string;
    title: string;
    subject: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ChatsListProps {
    chats: Chat[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    infiniteScrollRef?: RefCallback<HTMLElement>;
}

export const ChatsList = ({
    chats,
    onEdit,
    onDelete,
    infiniteScrollRef,
}: ChatsListProps) => {
    return (
        <div className="flex flex-col gap-3">
            {chats.map((chat) => (
                <ChatItem
                    key={chat.id}
                    id={chat.id}
                    title={chat.title}
                    subject={chat.subject}
                    updatedAt={chat.updatedAt}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
            {infiniteScrollRef && <div ref={infiniteScrollRef} />}
        </div>
    );
};
