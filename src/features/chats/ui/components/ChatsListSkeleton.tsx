import { Skeleton } from "@/components/ui";

export const ChatsListSkeleton = () => {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 rounded-lg border bg-card p-4"
                >
                    <Skeleton className="size-12 rounded-full" />
                    <div className="flex flex-1 flex-col gap-2">
                        <Skeleton className="h-5 w-3/4" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                    <Skeleton className="size-8 rounded-md" />
                </div>
            ))}
        </div>
    );
};
