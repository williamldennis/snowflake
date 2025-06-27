import { redirect } from 'next/navigation';
import { createChat } from '@/lib/chat-store';
import { auth } from "@/server/auth";

export default async function Page() {
    const session = await auth();
    if (session) {
        const id = await createChat(session.user.id);
        redirect(`/chat/${id}`);
    } else {
        redirect('/')
    }

}