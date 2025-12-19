'use client'

import { CommitCountsPerRepo } from '@/app/lib/github'

export interface commitstatsCardProps {
    commitStats: {
        total: number
        perRepo: CommitCountsPerRepo[]
    }
}

export default function CommitsStatCard({ commitStats }: commitstatsCardProps) {
    return (
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-black/10 dark:border-zinc-800 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
                {' '}
                Recent Commits
            </h2>

            <p className="text-sm mb-4 text-black/70 dark:text-white/70">
                {' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {commitStats.total}
                </span>{' '}
                commits in the selected window
            </p>

            <div className="space-y-3 max-h-60 overflow-auto text-black/70 dark:text-white/70">
                {commitStats.perRepo
                    .filter((r) => r.count > 0)
                    .map((r) => (
                        <div
                            key={`${r.owner}/${r.repo}`}
                            className="flex justify-between text-sm"
                        >
                            <span className="truncate"> {r.repo} </span>
                            <span className="font-semibold text-black dark:text-white">
                                {' '}
                                {r.count}{' '}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    )
}
