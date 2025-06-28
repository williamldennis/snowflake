import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { loadChat } from "@/lib/chat-store";
import ChatClientShell from "@/components/chunks/ChatClientShell";
import type { Message } from "ai";

export default async function ChatPage({
    params,
}: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    const name = session?.user.name ?? ""
    const initialTranscript = await loadChat(id);

    if (!session) {
        redirect("/")
    }

    return (
        <>
            <ChatClientShell
                name={name}
                chatId={id}
                initialMessages={initialTranscript ? JSON.parse(initialTranscript) as Message[]: []}
            />
        </>

    );
}
