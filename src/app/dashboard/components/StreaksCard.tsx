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
        } catch {}
    }

    const streakStats = calculateStreaks(allCommits)

    return (
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow border dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Commit Streak
            </h2>

            <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                    {streakStats.currentStreak}
                </p>
                <span className="text-gray-500 dark:text-gray-400">days</span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Longest streak:{' '}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {streakStats.longestStreak} days
                </span>
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
                Active days logged: {streakStats.totalDays}
            </p>
        </div>
    )
}
