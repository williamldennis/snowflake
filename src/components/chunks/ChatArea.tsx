'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat, type Message } from '@ai-sdk/react';
import { useRef } from "react";

type ChatAreaProps = {
    name: string | null,
}


export default function ChatArea({
    id,
    initialMessages,
}: { id?: string | undefined; initialMessages?: Message[] } = {}) {
    const { messages, input, handleInputChange, handleSubmit, status, stop } = useChat({
        id, // use the provided chat ID
        initialMessages, // initial messages if provided
        sendExtraMessageFields: true, // send id and createdAt for each message
    });

    return (
        <div className="container flex flex-col items-center justify-center gap-6">
            <ScrollArea className="h-[80vh] w-[450px] rounded-md border border-purple-100 p-4">
                {messages.map(message => (
                    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`} key={message.id}>

                        <div>

                            {message.role === 'user'
                                ? (
                                    <>
                                        <div className="flex flex-col">
                                            <div className="font-bold p-3 text-right">
                                                {/* {name} */}
                                            </div>
                                            <div className="bg-white/20 rounded-xl max-w-[80%] ml-auto pr-8 p-4">
                                                {message.content}
                                            </div>
                                        </div>
                                    </>

                                ) : (
                                    <>
                                        <div className="flex flex-col">
                                            <div className="font-bold p-3 text-left">
                                                {/* 🦊 spirit animal */}
                                            </div>
                                            <div className=" bg-black/20 rounded-xl p-4 text-purple-100 max-w-[80%]">
                                                {message.content}
                                            </div>
                                        </div>
                                    </>
                                )}
                        </div>
                    </div>
                ))}
            </ScrollArea >

            <div className="flex w-full max-w-sm items-center gap-2">
                <form onSubmit={handleSubmit} className="flex w-full">
                    <Input className="mr-2"
                        name="prompt"
                        value={input}
                        onChange={handleInputChange}
                    />
                    {
                        (status === 'submitted' || status === 'streaming') ? (
                            <Button
                                className="border bg-white text-purple-950"
                                type="button"
                                onClick={() => stop()}>
                                Stop
                            </Button>

                        ) : (
                            < Button
                                className="border bg-white text-purple-950"
                                type="submit">
                                Submit
                            </Button>)
                    }

                </form>
            </div>
        </div >

    )
}