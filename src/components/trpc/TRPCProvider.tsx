"use client";
import type { TAppRouter } from "@/trpc/router";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { makeQueryClient } from "@/trpc/query-client";
import { PropsWithChildren, useState } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

export const { TRPCProvider, useTRPC } = createTRPCContext<TAppRouter>();

let browserQueryClient: QueryClient;

function getQueryClient() {
    if (typeof window !== "undefined") {
        return makeQueryClient();
    }

    if (!browserQueryClient) {
        browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
}

function getUrl() {
    const base = (() => {
        if (typeof window !== "undefined") {
            return "";
        }
        return "http://localhost:3000";
    })();

    return `${base}/api/trpc`;
}

export function TRPCReactProvider({ children }: PropsWithChildren) {
    const queryClient = getQueryClient();

    const [trpcClient] = useState(() =>
        createTRPCClient<TAppRouter>({
            links: [
                httpBatchLink({
                    transformer: superjson,
                    url: getUrl(),
                }),
            ],
        }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
                {children}
            </TRPCProvider>
        </QueryClientProvider>
    );
}
