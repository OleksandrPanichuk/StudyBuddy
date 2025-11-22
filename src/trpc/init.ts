import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { auth } from "@/auth/server";
import { db } from "@/lib/db";

export const createTRPCContext = cache(async (opts: { headers: Headers }) => {
    const authSession = await auth.api.getSession({
        headers: opts.headers,
    });

    const source = opts.headers.get("x-trpc-source") ?? "unkwnown";
    console.log(
        `>>> tRPC Request from ${source} by ${authSession?.user?.email}`,
    );

    return {
        user: authSession?.user,
        session: authSession?.session,
        db: db,
    };
});

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
    transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.user?.id) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to access this resource.",
        });
    }

    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
