import { redirect } from 'next/navigation';
import { createChat } from '@/lib/chat-store';
import { auth } from "@/server/auth";
import { db } from '@/server/db';
import { chatTranscripts } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export default async function Page() {
    const session = await auth();

    if (!session) redirect('/');

    const userId = session.user.id;

    // ✅ Step 1: Check if chat already exists
    const [existing] = await db
        .select()
        .from(chatTranscripts)
        .where(eq(chatTranscripts.userId, userId));

    // ✅ Step 2: Use existing chat or create new one
    const chatId = existing
        ? existing.id
        : await createChat(userId);

    redirect(`/chat/${chatId}`);
}