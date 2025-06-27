'use client'

type MenuBarProps = {
    name: string,
}

import Link from "next/link";

export default function MyMenuBar({ name }: MenuBarProps) {
    return (
        <div className="flex items-center">

            <Link
                href={"/api/auth/signout?callbackUrl=/"}
                className="rounded bg-white/30 px-2 py-1 font-semibold no-underline transition hover:bg-white/80"
            >
                Sign out
            </Link>

            <p className="text-center text-md text-white/50 px-4">
                Hi, {name}
            </p>


        </div>

    )
}