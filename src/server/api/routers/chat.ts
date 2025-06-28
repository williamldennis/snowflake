// src/server/api/routers/chat.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { chatTranscripts, matchResults, users } from "@/server/db/schema";
import { eq, ne, sql } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const chatRouter = createTRPCRouter({
    compareTranscript: publicProcedure
        .input(z.object({ chatId: z.string() }))
        .mutation(async ({ input }) => {
            const { chatId } = input;

            console.log('[compareTranscript] chatId:', chatId);
            const [target] = await db
                .select()
                .from(chatTranscripts)
                .where(eq(chatTranscripts.id, chatId));
            console.log('[compareTranscript] target:', target);

            if (!target) {
                console.error('[compareTranscript] Chat not found for chatId:', chatId);
                throw new Error("Chat not found");
            }

            const others = await db
                .select()
                .from(chatTranscripts)
                .where(ne(chatTranscripts.id, chatId));
            console.log('[compareTranscript] others:', others);

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
                console.log('[compareTranscript] Comparing to other:', other.id);

                const completion = await openai.chat.completions.create({
                    model: "gpt-4-turbo",
                    messages: [{ role: "user", content: prompt }],
                });

                const content = completion.choices?.[0]?.message?.content ?? '';
                console.log('[compareTranscript] LLM response:', content);

                const scoreMatch = /Similarity:\s*(\d+)/i.exec(content);
                const reasonMatch = /Reason:\s*(.*)/i.exec(content);

                const score = parseInt(scoreMatch?.[1] ?? "0");
                const reason = reasonMatch?.[1] ?? "No reason provided.";
                console.log('[compareTranscript] Parsed score:', score, 'reason:', reason);

                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = other;
                    bestReason = reasonMatch?.[1] ?? "";
                    console.log('[compareTranscript] New best match:', bestMatch.id, 'score:', bestScore);
                }
            }

            if (bestMatch) {
                console.log('[compareTranscript] Inserting match result:', {
                    chatId,
                    matchedChatId: bestMatch.id,
                    score: bestScore,
                    reason: bestReason,
                });
                await db.insert(matchResults).values({
                    chatId,
                    matchedChatId: bestMatch.id,
                    score: bestScore,
                    reason: bestReason,
                });
            } else {
                console.warn('[compareTranscript] No match found for chatId:', chatId);
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
            console.log('[getMatchResult] chatId:', input.chatId);
            const [result] = await db
                .select()
                .from(matchResults)
                .where(eq(matchResults.chatId, input.chatId));
            console.log('[getMatchResult] matchResults:', result);

            if (!result) {
                console.warn('[getMatchResult] No match result found for chatId:', input.chatId);
                return null;
            }

            // Get the transcript of the matched user
            const [matchedTranscript] = await db
                .select()
                .from(chatTranscripts)
                .where(eq(chatTranscripts.id, result.matchedChatId));
            console.log('[getMatchResult] matchedTranscript:', matchedTranscript);

            if (!matchedTranscript) {
                console.warn('[getMatchResult] No matched transcript found for matchedChatId:', result.matchedChatId);
                // Delete the stale match result
                await db.delete(matchResults).where(eq(matchResults.chatId, input.chatId));
                return null;
            }

            // Get the matched user's name
            const [user] = await db
                .select()
                .from(users)
                .where(eq(users.id, matchedTranscript.userId));
            console.log('[getMatchResult] matched user:', user);

            return {
                matchedChatId: result.matchedChatId,
                score: result.score,
                reason: result.reason,
                matchedUserName: user?.name ?? "Anonymous",
            };
        }),

    getTotalTranscriptCount: publicProcedure.query(async () => {
        const result = await db
            .select({ count: sql<number>`count(*)` })
            .from(users)

        return result?.[0]?.count
    })

});
