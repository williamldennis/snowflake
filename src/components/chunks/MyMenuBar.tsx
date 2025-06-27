
import { auth } from "@/server/auth";
import Link from "next/link";

export default async function MyMenuBar() {
    const session = await auth();
    return (
        <div className="flex items-center">

            <Link
                href={session ? "/api/auth/signout?callbackUrl=/" : "/api/auth/signin?callbackUrl=/chat"}
                className="rounded bg-white/30 px-2 py-1 font-semibold no-underline transition hover:bg-white/80"
            >
                {session ? "Sign out" : "Sign in"}
            </Link>

            <p className="text-center text-md text-white/50 px-4">
                {session && <span>Hi, {session.user?.name}</span>}
            </p>


        </div>

    )
}