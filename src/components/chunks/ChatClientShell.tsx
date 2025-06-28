'use client';

import { useChat } from '@ai-sdk/react';
import MessagesArea from './ChatArea';
import MyMenuBar from './MyMenuBar';
import Levels from './Levels';
import Connections from './Connections';
import { type Message } from '@ai-sdk/react';
import { api } from '@/trpc/react';
import { useEffect, useRef } from 'react';

type ChatClientShellProps = {
    name: string;
    chatId: string;
    initialMessages: Message[];
};

export default function ChatClientShell({
    name,
    chatId,
    initialMessages,
}: ChatClientShellProps) {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        stop,
        status
    } = useChat({
        id: chatId,
        initialMessages,
        sendExtraMessageFields: true,
    });

    const userMessageCount = messages.filter((m) => m.role === 'user').length;

    // ✅ tRPC query to fetch match result from DB (even on refresh)
    const { data: matchResult, refetch } = api.chat.getMatchResult.useQuery({ chatId });

    //tRPC To get total users
    const { data: totalCount } = api.chat.getTotalTranscriptCount.useQuery();

    // ✅ tRPC mutation to run comparison
    const compareMutation = api.chat.compareTranscript.useMutation({
        onSuccess: async () => {
            await refetch(); // re-fetch match result after matching completes
        },
    });

    // ✅ track if we've already triggered matching
    const hasTriggeredRef = useRef(false);

    // ✅ Effect: trigger match on 10th user message
    useEffect(() => {
        const userMessages = messages.filter((m) => m.role === 'user');

        if (userMessages.length >= 10 && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;

            compareMutation.mutate({ chatId })
        }
    }, [messages, chatId, compareMutation]);

    return (
        <>
            <div className="absolute bottom-0 m-7">
                <MyMenuBar name={name} />
            </div>
            <div className="flex justify-center min-h-screen bg-gray-100 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                <div className="hidden lg:block p-4 mt-18">
                    <Levels
                        messages={messages}
                        messageCount={messages.length}
                        userMessages={userMessageCount}
                    />
                </div>
                <div className="flex flex-col w-full max-w-[450px] justify-center items-center">
                    <div
                        style={{ fontFamily: 'var(--font-syne)' }}
                        className="mb-4 font-bold text-2xl">
                        whomst
                    </div>
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
                <div className="hidden xl:block p-4 mt-18">
                    <Connections
                        messages={messages}
                        matchResult={
                            matchResult
                                ? {
                                    matchedId: matchResult.matchedChatId,
                                    score: matchResult.score,
                                    reason: matchResult.reason,
                                    matchedUserName: matchResult.matchedUserName
                                }
                                : null
                        }
                        totalCount={totalCount ?? 0}
                    />
                </div>
            </div>
        </>
    );
}
