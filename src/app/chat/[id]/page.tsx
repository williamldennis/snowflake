
import { auth } from "@/server/auth";
import MyMenuBar from "src/components/chunks/MyMenuBar"
import ChatArea from "src/components/chunks/ChatArea"
import Levels from "src/components/chunks/Levels"
import { redirect } from "next/navigation";
import Connections from "@/components/chunks/Connections";
import { loadChat } from "@/lib/chat-store";


export default async function ChatPage({ params }: { params: { id: string } }) {
    const session = await auth();
    const name = session?.user.name ?? ""
    const initialTranscript = await loadChat(params.id);

    if (!session) {
        redirect("/")
    }

    return (
        <>
            <div className="absolute bottom-0 m-7">
                <MyMenuBar />
            </div>
            <div className="flex justify-center min-h-screen bg-gray-100 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                <div className="hidden lg:block p-4 mt-20">
                    <Levels />
                </div>
                <div className=" flex flex-col w-full max-w-[450px] p-4 justify-center items-center">
                    <div className="mb-4">🦊 Spirit Animal</div>
                    <ChatArea
                        id={params.id} // <- CRITICAL: this is passed into useChat
                        initialMessages={initialTranscript ? JSON.parse(initialTranscript) : []}
                    />
                </div>
                <div className="hidden xl:block p-4 mt-20">
                    <Connections />
                </div>
            </div>

        </>

    );
}
