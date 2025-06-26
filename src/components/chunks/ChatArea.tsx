'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from '@ai-sdk/react';

export default function ChatArea() {
    const { messages, input, handleInputChange, handleSubmit, status, stop } = useChat({});

    return (
        <div className="container flex flex-col items-center justify-center gap-6">
            <div>Spirit Animal</div>
            <ScrollArea className="h-[80vh] w-[400px] rounded-md border p-4">
                {messages.map(message => (
                    <div key={message.id}>
                        {message.role === 'user' ? 'User: ' : 'AI: '}
                        {message.content}
                    </div>
                ))}
            </ScrollArea>

            <div className="flex w-full max-w-sm items-center gap-2">
                <form onSubmit={handleSubmit} className="flex w-full">
                    <Input className="mr-2"
                        name="prompt"
                        value={input}
                        onChange={handleInputChange}
                        disabled={status !== 'ready'} />
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