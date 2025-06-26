


import Link from "next/link";

import { LatestPost } from "@/components/ui/post";
import { auth, signIn, signOut } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import MyMenuBar from "src/components/chunks/MyMenuBar"
export default async function Chat() {
    const hello = await api.post.hello({ text: "from tRPC" });
    const session = await auth();

    if (session?.user) {
        void api.post.getLatest.prefetch();
    }

    return (
        <>
            <div className="absolute m-7">
                <p className="absolutetext-center text-2xl text-white">
                    {session && <span>Logged in as {session.user?.name}</span>}
                </p>
                <div className="mt-8">
                    <Link
                        href={session ? "/api/auth/signout?callbackUrl=/" : "/api/auth/signin?callbackUrl=/chat"}
                        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                    >
                        {session ? "Sign out" : "Sign in"}
                    </Link>
                </div>
            </div>

            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">

                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">

                    <div>Chat</div>
                </div>
            </main>
        </>

    );
}
