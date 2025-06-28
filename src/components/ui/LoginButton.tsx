// src/components/LoginButton.tsx
'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginButton() {
    return (
        <Button
            className="cursor-pointer rounded-full bg-white/10 px-15 py-8 text-lg font-semibold no-underline transition hover:bg-white/20"
            onClick={() => signIn('google', { callbackUrl: '/chat' })}>
            Login with Google
        </Button>
    );
}
