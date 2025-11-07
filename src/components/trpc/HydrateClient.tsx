import { PropsWithChildren } from "react";
import { getQueryClient } from "@/src/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export function HydrateClient({ children }: PropsWithChildren) {
    const queryClient = getQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
}
