import { generateId, type Message } from 'ai';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { db } from '@/server/db';
import { chatTranscripts } from '@/server/db/schema'; // or `conversations`
import { eq } from 'drizzle-orm';

export async function createChat(userId: string): Promise<string> {
    const [chat] = await db.insert(chatTranscripts).values({
        userId,
        transcript: '', // start empty
    }).returning(); // returns array of inserted rows

    if (chat) {
        return chat.id;
    } else {
        return ""
    }
}

export async function saveChat({
    id,
    messages,
}: {
    id: string;
    messages: Message[];
}): Promise<void> {
    const rawJson = JSON.stringify(messages, null, 2); // prettified for readability

    const result = await db
        .update(chatTranscripts)
        .set({ transcript: rawJson })
        .where(eq(chatTranscripts.id, id))
        .returning();

    if (result.length === 0) {
        console.warn(`❌SAVECHAT() No chat_transcript row matched id=${id}`);
    } else {
        console.log(`✅ SAVECHAT() Transcript updated for id=${id}`);
    }
    console.log("Saving chat to ID:", id);


}

export async function getChatTranscript(id: string): Promise<string | null> {
    const [chat] = await db
        .select()
        .from(chatTranscripts)
        .where(eq(chatTranscripts.id, id));

    return chat?.transcript || null;
}
export async function loadChat(id: string): Promise<string | null> {
    return await getChatTranscript(id);
}