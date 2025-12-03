import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { google } from "@ai-sdk/google";
import { TRPCError } from "@trpc/server";
import { generateText } from "ai";
import { z } from "zod";

const model = google("gemini-2.5-flash");

export const chatsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                message: z.string().min(1).max(10000),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const [titleResult, subjectResult] = await Promise.all([
                generateText({
                    model,
                    prompt: `Generate a short title (max 50 characters) for this conversation. Only return the title, nothing else:\n\n${input.message}`,
                }),
                generateText({
                    model,
                    prompt: `Determine the main subject/topic of this message in 1-2 words (e.g., "Mathematics", "Physics", "History", "Programming", "General"). Only return the subject, nothing else:\n\n${input.message}`,
                }),
            ]);

            const title =
                titleResult.text.trim().slice(0, 50) ||
                input.message.slice(0, 50);
            const subject = subjectResult.text.trim().slice(0, 50) || "General";

            return await ctx.db.chat.create({
                data: {
                    userId: ctx.user.id,
                    title,
                    subject,
                },
            });
        }),

    getById: protectedProcedure
        .input(z.object({ chatId: z.string() }))
        .query(async ({ ctx, input }) => {
            const chat = await ctx.db.chat.findUnique({
                where: {
                    id: input.chatId,
                    userId: ctx.user.id,
                },
                include: {
                    messages: {
                        orderBy: { createdAt: "asc" },
                    },
                },
            });

            if (!chat) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Chat not found",
                });
            }

            return chat;
        }),

    getAll: protectedProcedure
        .input(
            z.object({
                cursor: z.string().nullish(),
                limit: z.number().min(1).max(100).default(20),
            }),
        )
        .query(async ({ ctx, input }) => {
            const chats = await ctx.db.chat.findMany({
                where: { userId: ctx.user.id },
                orderBy: { updatedAt: "desc" },
                cursor: input.cursor ? { id: input.cursor } : undefined,
                take: input.limit + 1,
                select: {
                    id: true,
                    title: true,
                    subject: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            let nextCursor: string | null = null;

            if (chats.length > input.limit) {
                const nextItem = chats.pop();
                nextCursor = nextItem!.id;
            }
            return { chats, nextCursor };
        }),

    delete: protectedProcedure
        .input(z.object({ chatId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const chat = await ctx.db.chat.findUnique({
                where: {
                    id: input.chatId,
                    userId: ctx.user.id,
                },
            });

            if (!chat) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Chat not found",
                });
            }

            await ctx.db.chat.delete({
                where: { id: input.chatId },
            });

            return { success: true };
        }),
});
