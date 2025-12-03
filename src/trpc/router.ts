import { chatsRouter } from "@/features/chats/api/chats.router";
import { messagesRouter } from "@/features/messages/api/messages.router";
import { createTRPCRouter } from "@/trpc/init";

export const appRouter = createTRPCRouter({
    chats: chatsRouter,
    messages: messagesRouter,
});

export type TAppRouter = typeof appRouter;
