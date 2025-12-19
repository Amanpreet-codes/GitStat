'use client'
import { GitHubRepo } from '@/app/lib/github'

interface StatsCardProps {
    repos: GitHubRepo[]
}

export default function StatsCard({ repos }: StatsCardProps) {
    const totalRepos = repos.length
    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0)
    const languages = Array.from(
        new Set(repos.map((r) => r.language).filter(Boolean))
    )

    return (
        <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 shadow-xl border border-black/10 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
                Repository Stats
            </h2>

            <div className="space-y-3 text-sm text-black/70 dark:text-white/70">
                <p>
                    <span className="font-semibold text-black dark:text-white">
                        {totalRepos}
                    </span>{' '}
                    Repositories
                </p>
                <p>
                    <span className="font-semibold text-black dark:text-white">
                        {' '}
                        {totalStars}
                    </span>{' '}
                    Total Stars
                </p>
                <p className="flex flex-wrap gap-2">
                    Languages Used:
                    {languages.map((lang) => (
                        <span
                            className="font-semibold text-emerald-600 dark:text-emerald-400"
                            key={lang}
                        >
                            {lang}{' '}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    )
}
