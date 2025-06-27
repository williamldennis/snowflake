'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Message } from '@ai-sdk/react';
import { useEffect, useRef } from "react";

type MessagesAreaProps = {
    name: string;
    messages: Message[];
    input: string;
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    stop: () => void;
    status: 'streaming' | 'submitted' | 'ready' | 'error';
};


export default function ChatArea({
    name,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    status,
}: MessagesAreaProps) {

    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        // Resize textarea height dynamically
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
        // Forward event to useChat handler
        handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    };


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="container flex flex-col items-center justify-center gap-6">
            <ScrollArea className="h-[80vh] w-[450px] rounded-md border border-purple-100 px-4">
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
                {/* 👇 Empty div used as anchor to scroll to bottom */}
                <div ref={bottomRef} />
            </ScrollArea >

            <div className="flex w-full items-center gap-2">
                <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                    <textarea
                        ref={textareaRef}
                        className="w-full resize-none overflow-hidden rounded-md p-2 border bg-white/10 text-white"
                        name="prompt"
                        value={input}
                        onChange={handleTextareaChange}
                        rows={1}
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