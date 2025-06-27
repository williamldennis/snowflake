
import { Checkbox } from "@/components/ui/checkbox"

export default function Connections() {

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
                    <p>
                        Sarah Phoenix
                    </p>
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