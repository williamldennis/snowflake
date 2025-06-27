import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { loadChat } from "@/lib/chat-store";
import ChatClientShell from "@/components/chunks/ChatClientShell";


export default async function ChatPage({ params }: { params: { id: string } }) {
    const session = await auth();
    const name = session?.user.name ?? ""
    const initialTranscript = await loadChat(params.id);

    if (!session) {
        redirect("/")
    }

    return (
        <>
            <ChatClientShell
                name={name}
                chatId={params.id}
                initialMessages={initialTranscript ? JSON.parse(initialTranscript) : []}
            />
        </>

    );
}
