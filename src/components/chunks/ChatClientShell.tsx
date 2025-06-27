'use client'

import { useChat } from '@ai-sdk/react';
import MessagesArea from "./ChatArea";
import MyMenuBar from "./MyMenuBar";
import Levels from "./Levels";
import Connections from "./Connections";
import { type Message } from '@ai-sdk/react';

type ChatClientShellProps = {
    name: string;
    chatId: string;
    initialMessages: Message[];
};

export default function ChatClientShell({
    name,
    chatId,
    initialMessages,
}: {
    name: string;
    chatId: string;
    initialMessages: Message[];
}) {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        stop,
        status,
    } = useChat({
        id: chatId,
        initialMessages,
        sendExtraMessageFields: true,
    });

    const userMessageCount = messages.filter((m) => m.role === 'user').length;

    return (
        <>
            <div className="absolute bottom-0 m-7">
                <MyMenuBar
                    name={name}
                />
            </div>
            <div className="flex justify-center min-h-screen bg-gray-100 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                <div className="hidden lg:block p-4 mt-20">
                    <Levels
                        messages={messages}
                        messageCount={messages.length}
                        userMessages={userMessageCount}
                    />
                </div>
                <div className=" flex flex-col w-full max-w-[450px] justify-center items-center">
                    <div className="mb-4 font-bold text-2xl">samesies</div>
                    <MessagesArea
                        messages={messages}
                        input={input}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        stop={stop}
                        status={status}
                        name={name}
                    />
                </div>
                <div className="hidden xl:block p-4 mt-20">
                    <Connections
                        messages={messages}
                    />
                </div>
            </div>
        </>

    )
}