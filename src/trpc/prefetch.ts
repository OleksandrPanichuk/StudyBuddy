/* eslint-disable @typescript-eslint/no-explicit-any */
import { getQueryClient } from "@/trpc/server";
import { TRPCQueryOptions } from "@trpc/tanstack-react-query";
import "server-only";

export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
    queryOptions: T,
) {
    const queryClient = getQueryClient();
    if (queryOptions.queryKey[1]?.type === "infinite") {
        void queryClient.prefetchInfiniteQuery(queryOptions as any);
    } else {
        void queryClient.prefetchQuery(queryOptions);
    }
}
