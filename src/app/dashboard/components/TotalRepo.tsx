'use client'

interface TotalRepoProps {
    total: number
}

export default function TotalRepo({ total }: TotalRepoProps) {
    return (
        <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 shadow-xl border border-black/10 dark:border-zinc-800 flex flex-col justify-center items-center w-full h-full">
            <p className="text-sm font-semibold text-black/60 dark:text-white/60 uppercase tracking-wider mb-3">
                Total Repos
            </p>
            <p className="text-5xl font-bold text-black dark:text-white">
                {total}
            </p>
        </div>
    )
}
