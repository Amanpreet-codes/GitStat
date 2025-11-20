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
        <div className="p-6 rounded-xl bg-gray-800 shadow border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Repository Stats</h2>

            <div className="space-y-3 text-sm">
                <p>
                    <span className="font-semibold">{totalRepos}</span>{' '}
                    Repositories
                </p>
                <p>
                    <span className="font-semibold"> {totalStars}</span> Total
                    Stars
                </p>
                <p className="flex flex-wrap gap-2">
                    Languages Used:
                    {languages.map((lang) => (
                        <span className="font-semibold" key={lang}>
                            {lang}{' '}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    )
}
