import { LucideSparkles } from "lucide-react";

export const EmptyChatHero = () => {
    return (
        <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
                <LucideSparkles className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-2 text-4xl font-bold">
                How can I help you study today?
            </h1>
            <p className="text-muted-foreground">
                Ask me anything about your studies, homework, or learning goals
            </p>
        </div>
    );
};
