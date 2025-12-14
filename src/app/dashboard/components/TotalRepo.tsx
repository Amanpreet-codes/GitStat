'use client'

interface TotalRepoProps {
    total: number
}

export default function TotalRepo({ total }: TotalRepoProps) {
    return (
        <div className="p-6 max-w-50 rounded-xl bg-white dark:bg-slate-950 shadow-lg border border-slate-200 dark:border-slate-800 aspect-square flex flex-col justify-center items-center">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Total Repos
            </p>
            <p className="text-5xl font-bold text-black dark:text-white">
                {total}
            </p>
        </div>
    )
}
