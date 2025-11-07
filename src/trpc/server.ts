import "server-only";
import { cache } from "react";
import { makeQueryClient } from "@/src/trpc/query-client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { createTRPCContext } from "@/src/trpc/init";
import { appRouter } from "@/src/trpc/router";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
    ctx: createTRPCContext,
    router: appRouter,
    queryClient: getQueryClient,
});
