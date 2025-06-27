
import { Checkbox } from "@/components/ui/checkbox"

export default function Levels() {

    return (
        <div className="flex flex-col">
            <div className="text-lg pb-4 font-bold">Levels</div>
            <div className="rounded-lg p-4 w-80 flex items-center bg-white/10 mb-6">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        Level 1
                    </div>
                    <p>
                        Send 10 messages to discover who you're most similar to
                    </p>

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