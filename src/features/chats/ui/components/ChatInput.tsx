"use client";

import { Button } from "@/components/ui";
import { LucideSend, Loader2Icon } from "lucide-react";
import { FormEvent, useState } from "react";
import { ChatInputActions } from "./ChatInputActions";

interface ChatInputProps {
    onSubmit: (message: string) => void;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

export const ChatInput = ({
    onSubmit,
    value,
    onChange,
    disabled,
}: ChatInputProps) => {
    const [internalValue, setInternalValue] = useState("");

    const inputValue = value !== undefined ? value : internalValue;
    const setInputValue = onChange || setInternalValue;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || disabled) return;
        onSubmit(inputValue);
        setInputValue("");
    };

    return (
        <div className="border-t border-border bg-background">
            <div className="mx-auto max-w-3xl p-4">
                <form onSubmit={handleSubmit} className="relative">
                    <div className="absolute bottom-3 left-3">
                        <ChatInputActions
                            onFileUpload={() => console.log("Upload file")}
                            onImageUpload={() => console.log("Upload image")}
                            onVoiceInput={() => console.log("Voice input")}
                        />
                    </div>
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        placeholder="Message Study Buddy..."
                        className="w-full resize-none rounded-3xl border border-border bg-background px-16 py-4 text-sm outline-none ring-primary/50 placeholder:text-muted-foreground focus:ring-2 disabled:opacity-50"
                        rows={1}
                        disabled={disabled}
                        style={{
                            minHeight: "56px",
                            maxHeight: "200px",
                        }}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!inputValue.trim() || disabled}
                        className="absolute bottom-3 right-3 h-10 w-10 rounded-full"
                    >
                        {disabled ? (
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                        ) : (
                            <LucideSend className="h-4 w-4" />
                        )}
                    </Button>
                </form>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                    Study Buddy can make mistakes. Check important info.
                </p>
            </div>
        </div>
    );
};
