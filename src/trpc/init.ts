import {initTRPC} from "@trpc/server";
import {cache} from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
    return {}
})


const t = initTRPC.create({
    transformer: superjson,
    isDev: process.env.NODE_ENV === 'development',
})


export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory


export const baseProcedure = t.procedure

