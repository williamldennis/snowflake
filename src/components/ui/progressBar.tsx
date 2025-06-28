type ProgressBarProps = {
    value: number;
    label: string; // from 0 to 10
};

export default function ProgressBar({ value, label }: ProgressBarProps) {
    const percent = Math.min((value / 10) * 100, 100); // Clamp to 100%

    return (
        <>
            <div className="relative w-full h-6 bg-white/20 rounded-full overflow-hidden">
                {/* Green progress bar */}
                <div
                    className="absolute top-0 left-0 h-full bg-green-400 transition-all duration-300 ease-in-out"
                    style={{ width: `${percent}%` }}
                />

                {/* Label centered over the bar */}
                <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-black">
                    {value} {label ?? `${value}/10`}
                </div>
            </div>
        </>

    );
}
