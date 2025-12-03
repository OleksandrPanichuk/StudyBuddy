"use client";

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui";
import { Routes } from "@/constants/routes";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface ChatItemProps {
    id: string;
    title: string;
    subject: string;
    updatedAt: Date;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const ChatItem = ({
    id,
    title,
    subject,
    updatedAt,
    onEdit,
    onDelete,
}: ChatItemProps) => {
    const timeAgo = formatDistanceToNow(new Date(updatedAt), {
        addSuffix: true,
    });

    return (
        <div className="group relative flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-accent/50 hover:shadow-sm">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="size-6 text-primary" />
            </div>

            <Link
                href={`${Routes.CHATS}/${id}`}
                className="flex min-w-0 flex-1 flex-col gap-1"
            >
                <h3 className="truncate font-semibold text-foreground group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium">
                        {subject}
                    </span>
                    <span className="text-xs">•</span>
                    <span className="text-xs">{timeAgo}</span>
                </div>
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => onEdit(id)}>
                        <Pencil className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => onDelete(id)}
                        className="text-destructive focus:text-destructive"
                    >
                        <Trash2 className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
