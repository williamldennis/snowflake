// src/components/LoginButton.tsx
'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginButton() {
    return (
        <Button
            className="rounded-br-3xl rounded-tr-none rounded-tl-none rounded-bl-3xl cursor-pointer bg-white/10 w-full h-full text-lg font-semibold no-underline transition hover:bg-white/20 border border-white/10"
            onClick={() => signIn('google', { callbackUrl: '/chat' })}>
            Login with Google
        </Button>
    );
}