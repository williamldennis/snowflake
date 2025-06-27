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
    } | null;
};



export default function Connections({ matchResult }: ConnectionsProps) {

    return (
        <div className="flex flex-col">
            <div className="text-lg pb-4 font-bold">Connections</div>
            <div className="rounded-lg p-4 w-80 flex items-center bg-black/20 mb-5">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        You are most similar to:
                    </div>
                    {matchResult ? (
                        <div className="bg-white/10 p-4 rounded-md">
                            <p className="text-white">🧬 You're most similar to another user.</p>
                            <p className="text-white/60 text-sm mt-1">Similarity score: {matchResult.score}/10</p>
                            <blockquote className="italic text-white/70 mt-2">“{matchResult.reason}”</blockquote>
                        </div>
                    ) : (
                        <p className="text-white/40 text-sm italic">Looking for your match...</p>
                    )}
                </div>
            </div>
            <div className="rounded-lg p-4 w-80 flex items-center bg-black/20 mb-5">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        You are least similar to:
                    </div>
                    <p>
                        Joe Sinclair
                    </p>
                </div>
            </div>
            <div className="rounded-lg p-4 w-80 flex items-center bg-black/20 mb-5">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        You might be able to help
                    </div>
                    <p>
                        Pete Sampras
                    </p>
                </div>
            </div>
            <div className="rounded-lg p-4 w-80 flex items-center bg-black/20 mb-5">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        Get help from
                    </div>
                    <p>
                        Bob Costa
                    </p>
                </div>
            </div>

        </div>

    )
}