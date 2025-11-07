import { createTRPCRouter } from "@/trpc/init";

export const appRouter = createTRPCRouter({});

export type TAppRouter = typeof appRouter;
