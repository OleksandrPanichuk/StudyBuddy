import "server-only";
import { getQueryClient } from "@/src/trpc/server";
import {
    FetchInfiniteQueryOptions,
    FetchQueryOptions,
} from "@tanstack/react-query";

export function prefetch<T>(
    queryOptions: FetchInfiniteQueryOptions<T> | FetchQueryOptions<T>,
) {
    const queryClient = getQueryClient();

    if (
        "getNextPageParam" in queryOptions ||
        "initialPageParam" in queryOptions
    ) {
        void queryClient.prefetchInfiniteQuery(
            queryOptions as FetchInfiniteQueryOptions<T>,
        );
    } else {
        void queryClient.prefetchQuery(queryOptions as FetchQueryOptions<T>);
    }
}
