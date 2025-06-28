'use client'

import ProgressBar from "../ui/progressBar";
import type { Message } from "ai";
import { Lock } from "lucide-react";


type LevelsProps = {
    messageCount: number;
    messages: Message[];
    userMessages: number
};



export default function Levels({ userMessages }: LevelsProps) {

    return (
        <div className="flex flex-col items-center">
            <div className="text-lg pb-4 font-bold">Levels</div>
            <div className="rounded-lg p-6 w-100 flex items-center bg-black/40 mb-4">
                <div>
                    <div className="font-bold text-xl mb-2">
                        Level 1
                    </div>
                    <div className="font mb-2">
                        Send 10 messages to discover who you&apos;re most similar to in the entire fricking world omg
                    </div>
                    <div>
                        <div className="py-2">
                            <ProgressBar
                                value={userMessages}
                                label={"messages sent"}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-lg p-4 w-100 flex items-center bg-black/40 mb-4">
                <Lock className="w-8 h-8 mr-4 text-white/50" />
                <div>
                    <div className="font-bold mb-2">
                        Level 2
                    </div>
                    <hr className="my-4 border-t border-white/20" />
                    <p className="mb-3">
                        Send 10 messages to discover who you&apos;re very much NOT like.
                    </p>
                    <p className="mb-3 italic">
                        Hey we could all use a nemesis
                    </p>
                </div>
            </div>
            <div className="rounded-lg p-4 w-100 flex items-center bg-black/40 mb-4">
                <Lock className="w-8 h-8 mr-4 text-white/50" />
                <div>
                    <div className="font-bold mb-2">
                        Level 3
                    </div>
                    <hr className="my-4 border-t border-white/20" />
                    <p className="mb-3">
                        Send 10 messages describing a skill or service you are happy to provide.
                    </p>
                    <p className="mb-3 italic">
                        Jugglers I&apos;m looking at you...
                    </p>
                </div>
            </div>
            <div className="rounded-lg p-4 w-100 flex items-center bg-black/40 mb-4">
                <Lock className="w-8 h-8 mr-4 text-white/50" />
                <div>
                    <div className="font-bold mb-2">
                        Level 4
                    </div>
                    <hr className="my-4 border-t border-white/20" />
                    <p className="mb-3">
                        Send 10 messages describing something in your life you need.
                    </p>
                    <p className="mb-3 italic">
                        Need a new couch? Couldn&apos;t hurt to ask...
                    </p>
                </div>
            </div>
        </div>

    )
}