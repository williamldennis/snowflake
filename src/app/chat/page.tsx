
import { auth} from "@/server/auth";
import MyMenuBar from "src/components/chunks/MyMenuBar"
import ChatArea from "src/components/chunks/ChatArea"
import { redirect } from "next/navigation";


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
            <ChatArea />
            </main>
        </>

    );
}
