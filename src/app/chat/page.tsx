



import { LatestPost } from "@/components/ui/post";
import { auth, signIn, signOut } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import MyMenuBar from "src/components/chunks/MyMenuBar"
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function Chat() {
    const session = await auth();

    if (!session) {
        redirect("/")
    }


    return (
        <>
            <div className="absolute m-7">
            <MyMenuBar />
            </div>

            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">

                <div className="container flex flex-col items-center justify-center gap-6">
                    <div>Spirit Animal</div>
                    <ScrollArea className="h-[80vh] w-[400px] rounded-md border p-4">
                        Jokester began sneaking into the castle in the middle of the night and leaving
                        jokes all over the place: under the king's pillow, in his soup, even in the
                        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
                        then, one day, the people of the kingdom discovered that the jokes left by
                        Jokester were so funny that they couldn't help but laugh. And once they
                        started laughing, they couldn't stop.
                    </ScrollArea>
                    <div className="flex w-full max-w-sm items-center gap-2">
                        <Input type="email" placeholder="Chat here..." />
                        <Button className="text-purple-900" type="submit" variant="outline">
                            Send
                        </Button>
                    </div>
                </div>
            </main>
        </>

    );
}
