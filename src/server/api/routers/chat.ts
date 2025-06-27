// src/server/api/routers/chat.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { chatTranscripts, matchResults } from "@/server/db/schema";
import { eq, ne } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const chatRouter = createTRPCRouter({
    compareTranscript: publicProcedure
        .input(z.object({ chatId: z.string() }))
        .mutation(async ({ input }) => {
            const { chatId } = input;

            const [target] = await db
                .select()
                .from(chatTranscripts)
                .where(eq(chatTranscripts.id, chatId));

            if (!target) throw new Error("Chat not found");

            const others = await db
                .select()
                .from(chatTranscripts)
                .where(ne(chatTranscripts.id, chatId));

            let bestScore = -1;
            let bestMatch = null;
            let bestReason = "";

            for (const other of others) {
                const prompt = `
Compare the following two chat transcripts. Score them 1–10 for how similar these users are in personality, tone, and interests.

Transcript A:
${target.transcript}

Transcript B:
${other.transcript}

Respond like this:
Similarity: X
Reason: Y
        `;

                const completion = await openai.chat.completions.create({
                    model: "gpt-4-turbo",
                    messages: [{ role: "user", content: prompt }],
                });

                const content = completion.choices?.[0]?.message?.content ?? ''

                const scoreMatch = /Similarity:\s*(\d+)/i.exec(content);
                const reasonMatch = /Reason:\s*(.*)/i.exec(content);

                const score = parseInt(scoreMatch?.[1] ?? "0");
                const reason = reasonMatch?.[1] ?? "No reason provided.";


                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = other;
                    bestReason = reasonMatch?.[1] ?? "";
                }
            }

            if (bestMatch) {
                await db.insert(matchResults).values({
                    chatId,
                    matchedChatId: bestMatch.id,
                    score: bestScore,
                    reason: bestReason,
                });
            }

            return {
                matchedId: bestMatch?.id,
                score: bestScore,
                reason: bestReason,
            };
        }),

    getMatchResult: publicProcedure
        .input(z.object({ chatId: z.string() }))
        .query(async ({ input }) => {
            const [match] = await db
                .select()
                .from(matchResults)
                .where(eq(matchResults.chatId, input.chatId));

            return match ?? null;
        }),

});
