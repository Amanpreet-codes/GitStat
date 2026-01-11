'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import { CommitCountsPerRepo } from '@/app/lib/github'

export interface CommitStatsCardProps {
    commitStats: {
        total: number
        perRepo: CommitCountsPerRepo[]
    }
}

const OPTIONS = [
    { label: '1 day', days: 1 },
    { label: '3 days', days: 3 },
    { label: '1 week', days: 7 },
    { label: '1 month', days: 30 },
    { label: '6 months', days: 183 },
    { label: '1 year', days: 365 },
]

export default function CommitsStatCard({ commitStats }: CommitStatsCardProps) {
    const [selectedDays, setSelectedDays] = useState<number>(7)
    const [stats, setStats] = useState(commitStats)
    const [loading, setLoading] = useState(false)
    const cacheRef = useRef<
        Record<number, CommitStatsCardProps['commitStats']>
    >({})

    useEffect(() => {
        setStats(commitStats)
    }, [commitStats])

    useEffect(() => {
        let mounted = true
        async function fetchCounts() {
            const cached = cacheRef.current[selectedDays]
            if (cached) {
                setStats(cached)
                setLoading(false)
                return
            }
            setLoading(true)
            try {
                const res = await fetch(
                    `/api/commit-counts?days=${selectedDays}`
                )
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                if (
                    mounted &&
                    data &&
                    !data.error &&
                    typeof data.total === 'number' &&
                    Array.isArray(data.perRepo)
                ) {
                    cacheRef.current[selectedDays] = data
                    setStats(data)
                } else if (mounted) {
                    throw new Error('Invalid response format')
                }
            } catch {
                // ignore - keep previous stats
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchCounts()

        return () => {
            mounted = false
        }
    }, [selectedDays])

    const nonZero = useMemo(
        () => stats.perRepo.filter((r) => r.count > 0),
        [stats]
    )

    return (
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-black/10 dark:border-zinc-800 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-black dark:text-white">
                    Recent Commits
                </h2>

                <div className="flex items-center gap-2">
                    <label className="text-xs text-black/60 dark:text-white/60">
                        Period
                    </label>
                    <select
                        value={selectedDays}
                        onChange={(e) =>
                            setSelectedDays(parseInt(e.target.value, 10))
                        }
                        className="text-sm rounded-md border px-2 py-1 bg-white dark:bg-zinc-800"
                        aria-label="Select period"
                    >
                        {OPTIONS.map((o) => (
                            <option key={o.days} value={o.days}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <p className="text-sm mb-4 text-black/70 dark:text-white/70">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {loading ? '...' : stats.total}
                </span>{' '}
                commits in the selected window
            </p>

            <div className="space-y-3 max-h-60 overflow-auto text-black/70 dark:text-white/70">
                {nonZero.length > 0 ? (
                    nonZero.map((r) => (
                        <div
                            key={`${r.owner}/${r.repo}`}
                            className="flex justify-between text-sm"
                        >
                            <span className="truncate"> {r.repo} </span>
                            <span className="font-semibold text-black dark:text-white">
                                {r.count}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="text-sm text-black/50 dark:text-white/40">
                        No commits in this period.
                    </div>
                )}
            </div>
        </div>
    )
}
