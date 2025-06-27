'use client'


type LevelsProps = {
    messageCount: number;
    messages: Message[];
    userMessages: number
};

import { Checkbox } from "@/components/ui/checkbox"
import ProgressBar from "../ui/progressBar";
import type { Message, UIMessage } from "ai";

export default function Levels({ userMessages, messageCount, messages }: LevelsProps) {

    return (
        <div className="flex flex-col">
            <div className="text-lg pb-4 font-bold">Levels</div>
            <div className="rounded-lg p-6 w-80 flex items-center bg-white/10 mb-6">
                <div>
                    <div className="font-bold text-xl mb-2">
                        Level 1
                    </div>
                    <div className="font mb-2">
                        Send 10 messages to discover who you're most similar to
                    </div>
                    <div>
                        <div className="font-bold mb-2 border rounded p-4 text-center mt-6 text-2xl">
                            {userMessages} messages sent
                        </div>
                        <div className="py-2">
                            <ProgressBar
                                value={userMessages}
                                label={"messages sent"}
                            />
                        </div>

                    </div>

                </div>
            </div>
            <div className="rounded-lg p-4 w-80 flex items-center bg-white/10 mb-6">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        Level 2
                    </div>
                    <p>
                        Send 10 messages to find out who you're least similar to
                    </p>
                </div>
            </div>
            <div className="rounded-lg p-4 w-80 flex items-center bg-white/10 mb-5">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        Level 3
                    </div>
                    <p>
                        Send 10 messages describing how you can help someone
                    </p>
                </div>
            </div>
            <div className="rounded-lg p-4 w-80 flex items-center bg-white/10 mb-5">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        Level 4
                    </div>
                    <p>
                        Send 10 messages describing help you're looking for in your life (ie job hunting, new couch, etc)
                    </p>
                </div>
            </div>
        </div>

    )
}