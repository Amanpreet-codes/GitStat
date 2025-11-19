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
        <div className="p-6 bg-gray-800 rounded-xl shadow border border-gray-700">
            <h2 className="text-lg font-semibold mb-4"> Recent Commits</h2>

            <p className="text-sm mb-4">
                {' '}
                <span className="font-semibold">{commitStats.total}</span>{' '}
                commits in the selected window
            </p>

            <div className="space-y-3 max-h-60 overflow-auto">
                {commitStats.perRepo.map((r) => (
                    <div
                        key={`${r.owner}/${r.repo}`}
                        className="flex justify-between text-sm"
                    >
                        <span className="truncate"> {r.repo} </span>
                        <span className="font-semibold"> {r.count} </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
