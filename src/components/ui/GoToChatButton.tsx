// src/components/LoginButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default function GoToChatButton() {
    return (
        <Button
            className="rounded-br-3xl rounded-tr-none rounded-tl-none rounded-bl-3xl cursor-pointer bg-white/10 w-full h-full text-lg font-semibold no-underline transition hover:bg-white/20 border border-white/10"
            onClick={() => redirect('/chat')}>
            Go to chat
        </Button>
    );
}