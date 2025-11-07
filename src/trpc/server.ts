import "server-only";
import { cache } from "react";
import { makeQueryClient } from "@/trpc/query-client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/router";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
    ctx: createTRPCContext,
    router: appRouter,
    queryClient: getQueryClient,
});
