import { LucideIcon } from "lucide-react";

interface SuggestedPromptCardProps {
    icon: LucideIcon;
    title: string;
    prompt: string;
    onClick: () => void;
}

export const SuggestedPromptCard = ({
    icon: Icon,
    title,
    prompt,
    onClick,
}: SuggestedPromptCardProps) => {
    return (
        <button
            onClick={onClick}
            className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-accent/50 hover:shadow-md"
        >
            <div className="shrink-0 rounded-lg bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
                <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="mb-1 font-semibold text-sm">{title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {prompt}
                </p>
            </div>
        </button>
    );
};
