"use client";
import { Button } from "@/components/ui";
import { Check, Copy } from "lucide-react";
import { HTMLAttributes, useState } from "react";
import { ExtraProps } from "react-markdown";

export const MarkdownCodeBlock = ({
    children,
    className,
    ...props
}: HTMLAttributes<HTMLDivElement> & ExtraProps) => {
    const [copied, setCopied] = useState(false);
    const isCodeBlock = /language-(\w+)/.exec(className || "");

    const handleCopy = async () => {
        const code = String(children).replace(/\n$/, "");

        await navigator.clipboard.writeText(code);

        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    };

    if (isCodeBlock) {
        return (
            <div className="relative group">
                <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-2 top-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    onClick={handleCopy}
                >
                    {copied ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </Button>
                <code className={className} {...props}>
                    {children}
                </code>
            </div>
        );
    }

    return (
        <code className={className} {...props}>
            {children}
        </code>
    );
};
