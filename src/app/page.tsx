import Link from "next/link";

import { auth, signIn } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/ui/LoginButton";
import { Syne } from "next/font/google";
import GoToChatButton from "@/components/ui/GoToChatButton";


export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>

      <div className="relative h-screen w-screen overflow-hidden bg-black/20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source src="/more-moose-loop.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className=" border border-white/10 pt-12 rounded-3xl backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center">
              <h1
                className="text-2xl font-extrabold tracking-tight sm:text-[5rem] px-10"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '5rem',
                  fontWeight: '800',
                  letterSpacing: '.05em',

                }}
              >
                whomst
              </h1>
              <p className="text-xl mb-7">Find your humans.</p>
            </div>


              <div className="flex h-20 justify-center items-cente">
                {session ? <GoToChatButton /> : <LoginButton />}
              </div>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
