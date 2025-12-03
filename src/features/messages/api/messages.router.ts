import { MessageRole } from "@/generated/prisma/enums";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { google } from "@ai-sdk/google";
import { TRPCError } from "@trpc/server";
import { generateText } from "ai";
import z from "zod";

export const messagesRouter = createTRPCRouter({
    getByChatId: protectedProcedure
        .input(
            z.object({
                chatId: z.string(),
                cursor: z.string().nullish(),
                limit: z.number().min(1).max(100).default(2),
            }),
        )
        .query(async ({ ctx, input }) => {
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

            const messages = await ctx.db.message.findMany({
                where: {
                    chatId: input.chatId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                cursor: input.cursor ? { id: input.cursor } : undefined,
                take: input.limit + 1,
            });

            let nextCursor: string | null = null;

            if (messages.length > input.limit) {
                const nextItem = messages.pop();
                nextCursor = nextItem!.id;
            }

            return {
                messages,
                nextCursor,
            };
        }),
    create: protectedProcedure
        .input(
            z.object({
                chatId: z.string(),
                message: z.string().min(1).max(10000),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const chat = await ctx.db.chat.findUnique({
                where: {
                    id: input.chatId,
                    userId: ctx.user.id,
                },
                include: {
                    messages: {
                        orderBy: {
                            createdAt: "asc",
                        },
                        take: 20,
                    },
                },
            });

            if (!chat) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Chat not found",
                });
            }

            const userMessage = await ctx.db.message.create({
                data: {
                    chatId: input.chatId,
                    role: MessageRole.USER,
                    content: input.message,
                },
            });

            const messages = chat.messages
                .map((msg) => ({
                    role: msg.role === MessageRole.USER ? "user" : "assistant",
                    content: msg.content,
                }))
                .concat([{ role: "user", content: input.message }]) as {
                role: "user" | "assistant";
                content: string;
            }[];

            const result = await generateText({
                model: google("gemini-2.5-flash"),
                system: `You are an AI tutor called Study Buddy. Help the student understand their study materials. Be clear, encouraging, and educational. Use markdown formatting for better readability.`,
                messages,
            });

            const response =
                result.text.trim() || "Sorry, I couldn't generate a response.";

            const assistantMessage = await ctx.db.message.create({
                data: {
                    chatId: input.chatId,
                    role: MessageRole.ASSISTANT,
                    content: response,
                },
            });

            return {
                userMessage,
                assistantMessage,
            };
        }),
});
