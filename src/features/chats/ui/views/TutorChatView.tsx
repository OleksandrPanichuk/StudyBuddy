"use client";

import { useState } from "react";
import { SUGGESTED_PROMPTS } from "../../constants";
import { ChatInput, EmptyChatHero, SuggestedPromptCard } from "../components";

export const TutorChatView = () => {
    const [input, setInput] = useState("");

    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
    };

    const handleSubmit = (message: string) => {
        console.log("Submit message:", message);
    };

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
                                onClick={() => handlePromptClick(item.prompt)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
            />
        </div>
    );
};
