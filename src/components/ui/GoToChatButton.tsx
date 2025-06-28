// src/components/LoginButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default function GoToChatButton() {
    return (
        <Button
            className="cursor-pointer rounded-full bg-white/10 px-15 py-8 text-lg font-semibold no-underline transition hover:bg-white/20"
            onClick={() => redirect('/chat')}>
            Go to chat
        </Button>
    );
}