import Link from "next/link";

import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";


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
          <source src="/spirit-animal-moose-river.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-8 text-white">
          <div className="flex flex-col items-center justify-center border border-white/10 p-12 py-20 rounded-3xl backdrop-blur-sm">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-[5rem] mb-4">
              Samesies
            </h1>
            <p className="text-lg mb-7">Find your humans.</p>
            <div className="flex flex-col items-center gap-2">
              {/* <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p> */}

              <div className="flex flex-col items-center justify-center gap-4">
                <Link
                  href={session ? "/chat" : "/api/auth/signin?callbackUrl=/chat"}
                  className="rounded-full bg-white/10 px-15 py-4 text-lg font-semibold no-underline transition hover:bg-white/20 "
                >
                  {session ? "Go to chat" : "Sign in"}
                </Link>
              </div>
            </div>

          </div>


          {/* {session?.user && <LatestPost />} */}
        </div>
      </div>
    </HydrateClient>
  );
}
