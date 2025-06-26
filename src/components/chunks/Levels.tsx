
import { Checkbox } from "@/components/ui/checkbox"

export default function Levels() {

    return (
        <div className="flex flex-col">
            <div className="border rounded-lg p-4 w-80 flex items-center bg-white/10 mb-6">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        Level 1
                    </div>
                    <p>
                        Discover your Enneagram type
                    </p>
                </div>
            </div>
            <div className="border rounded-lg p-4 w-80 flex items-center bg-white/10 mb-6">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        Level 2
                    </div>
                    <p>
                        Find your aptitudes
                    </p>
                </div>
            </div>
            <div className="border rounded-lg p-4 w-80 flex items-center bg-white/10 mb-5">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        Level 3
                    </div>
                    <p>
                        Offer to help
                    </p>
                </div>
            </div>
            <div className="border rounded-lg p-4 w-80 flex items-center bg-white/10 mb-5">
                <div className="pr-3">
                    <Checkbox id="terms" />
                </div>
                <div>
                    <div className="font-bold">
                        Level 4
                    </div>
                    <p>
                        Find your people
                    </p>
                </div>
            </div>
        </div>

    )
}