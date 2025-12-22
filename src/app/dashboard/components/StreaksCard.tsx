import { getGitHubRepos, getRepoCommits, GitHubCommit } from '@/app/lib/github'
import { calculateStreaks } from '@/app/lib/streaks' // your helper

export default async function StreaksCard() {
    // 1. Fetch repos
    const repos = await getGitHubRepos()
    const topRepos = repos.slice(0, 8)

    const allCommits: GitHubCommit[] = []

    // 2. Fetch commits for each repo
    for (const repo of topRepos) {
        const [owner] = repo.full_name.split('/')
        try {
            const commits = await getRepoCommits(owner, repo.name)
            allCommits.push(...commits)
        } catch (error) {
            console.error(
                `Failed to fetch commits for ${repo.full_name}:`,
                error
            )
        }
    }

    const streakStats = calculateStreaks(allCommits)

    return (
        <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 shadow-xl border border-black/10 dark:border-zinc-800 w-full h-full">
            <h2 className="text-lg font-semibold text-black dark:text-white mb-2">
                Commit Streak
            </h2>

            <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {streakStats.currentStreak}
                </p>
                <span className="text-black/60 dark:text-white/60">days</span>
            </div>

            <p className="text-sm text-black/60 dark:text-white/60 mt-3">
                Longest streak:{' '}
                <span className="font-semibold text-black dark:text-white">
                    {streakStats.longestStreak} days
                </span>
            </p>

            <p className="text-sm text-black/60 dark:text-white/60">
                Active days logged: {streakStats.totalDays}
            </p>
        </div>
    )
}
