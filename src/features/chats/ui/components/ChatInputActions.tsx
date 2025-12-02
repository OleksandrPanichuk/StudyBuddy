"use client";

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui";
import {
    LucideFileUp,
    LucideImage,
    LucideMic,
    LucidePaperclip,
    LucidePlus,
} from "lucide-react";

interface ChatInputActionsProps {
    onFileUpload?: () => void;
    onImageUpload?: () => void;
    onVoiceInput?: () => void;
}

export const ChatInputActions = ({
    onFileUpload,
    onImageUpload,
    onVoiceInput,
}: ChatInputActionsProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-full"
                >
                    <LucidePlus className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem
                    onClick={onFileUpload}
                    className="cursor-pointer gap-2"
                >
                    <LucideFileUp className="h-4 w-4" />
                    <span>Upload file</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onImageUpload}
                    className="cursor-pointer gap-2"
                >
                    <LucideImage className="h-4 w-4" />
                    <span>Upload image</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onVoiceInput}
                    className="cursor-pointer gap-2"
                >
                    <LucideMic className="h-4 w-4" />
                    <span>Voice input</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2">
                    <LucidePaperclip className="h-4 w-4" />
                    <span>Attach from notes</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
