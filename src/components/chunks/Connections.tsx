'use client'

import { Checkbox } from "@/components/ui/checkbox"
import type { Message } from "ai";

// Connections.tsx

type ConnectionsProps = {
    messages: Message[];
    matchResult: {
        matchedId: string | undefined;
        score: number;
        reason: string;
        matchedUserName: string
    } | null;
};



export default function Connections({ matchResult }: ConnectionsProps) {

    return (
        <div className="flex flex-col">
            <div className="text-lg pb-4 font-bold">Connections</div>
            <div className="rounded-lg p-4 w-80 flex items-center bg-black/20 mb-5">

                <div>
                    <div className="font-bold pb-4">
                        Your Similarity Match                   </div>
                    {matchResult ? (
                        <>
                            <div className="font-bold pb-4 text-2xl bg-white/10 rounded-lg p-4 mb-3">
                                {matchResult.matchedUserName}
                            </div>
                            <p className="text-white/60 text-sm mt-1">Similarity score: {matchResult.score}/10</p>
                            <blockquote className="italic text-white/70 mt-2">“{matchResult.reason}”</blockquote>
                        </>

                    ) : (
                        <p className="text-white/40 text-sm italic">Looking for your match...</p>
                    )}
                </div>
            </div>
        </div>

    )
}