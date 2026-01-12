import { authOptions } from '../lib/authOptions'
import { getGitHubRepos, getGitHubUser, getCommitCounts } from '../lib/github'
import CommitsStatCard from './components/CommitsStatCard'
import ProfileCard from './components/ProfileCard'
import StatsCard from './components/StatsCard'
import StreaksCard from './components/StreaksCard'
import TotalRepo from './components/TotalRepo'
import AchievementsCard from './components/AchievementsCard'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { groupCommitsByDay } from '../lib/chart'
import { getRepoCommits } from '../lib/github'
import CommitsLineChart from './components/CommitsLineChart'
import { calculateStreaks } from '../lib/streaks'
import { computeAchievements } from '../lib/achievements'

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/api/auth/signin')

    const [user, repos, commitStats] = await Promise.all([
        getGitHubUser(),
        getGitHubRepos(),
        getCommitCounts(30, 10),
    ])

    const topRepos = repos.slice(0, 7)
    const commitPromises = topRepos.map((r) =>
        getRepoCommits(r.full_name.split('/')[0], r.name).catch(() => [])
    )
    const commitArrays = await Promise.all(commitPromises)
    const commitData = commitArrays.flat()

    const daily = groupCommitsByDay(commitData)

    // Compute achievements
    const streakStats = calculateStreaks(commitData)
    const achievements = computeAchievements({
        totalCommits: commitStats.total,
        longestStreak: streakStats.longestStreak,
        repos: repos.length,
        activeDays: streakStats.totalDays,
    })

    return (
        <div className="min-h-screen p-6 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-3xl font-semibold text-black dark:text-white">
                        Welcome, {user.name ?? user.login}
                    </h1>
                    <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                        Overview of repositories, commits and streaks
                    </p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar: profile + repo stats */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            <ProfileCard user={user} />
                            <StatsCard repos={repos} />
                        </div>
                    </aside>

                    {/* Main content: stats, streaks, charts */}
                    <section className="lg:col-span-3 space-y-6">
                        <div className="flex items-start overflow-auto gap-6">
                            <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 rounded-xl p-4 shadow-xl max-w-[40%] h-52">
                                <StreaksCard />
                            </div>
                            <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 rounded-xl p-4 shadow-xl flex-none w-44 sm:w-48 md:w-52 h-52 flex items-center justify-center">
                                <TotalRepo total={repos.length} />
                            </div>

                            <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 rounded-xl p-4 shadow-xl max-w-full flex-1 min-h-0">
                                <CommitsStatCard commitStats={commitStats} />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 rounded-xl p-4 shadow-xl">
                            <h2 className="text-lg font-medium mb-4 text-black dark:text-white">
                                Commits Over Time
                            </h2>
                            <CommitsLineChart data={daily} />
                        </div>

                        <AchievementsCard achievements={achievements} />

                        <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 rounded-xl p-4 shadow-xl">
                            <h3 className="text-lg font-medium mb-4 text-black dark:text-white">
                                Recent Activity
                            </h3>
                            <div className="text-sm text-black/60 dark:text-white/60">
                                A quick list or table of recent commits can go
                                here.
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
