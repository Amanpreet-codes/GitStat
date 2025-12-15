import { authOptions } from '../lib/authOptions'
import { getGitHubRepos, getGitHubUser, getCommitCounts } from '../lib/github'
import CommitsStatCard from './components/CommitsStatCard'
import ProfileCard from './components/ProfileCard'
import StatsCard from './components/StatsCard'
import StreaksCard from './components/StreaksCard'
import TotalRepo from './components/TotalRepo'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { groupCommitsByDay } from '../lib/chart'
import { getRepoCommits } from '../lib/github'
import CommitsLineChart from './components/CommitsLineChart'

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

    return (
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
                        Welcome, {user.name ?? user.login}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                                <CommitsStatCard commitStats={commitStats} />
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                                <StreaksCard />
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow max-w-[50%] aspect-square">
                                <TotalRepo total={repos.length} />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                            <h2 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">
                                Commits Over Time
                            </h2>
                            <CommitsLineChart data={daily} />
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                            <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">
                                Recent Activity
                            </h3>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
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
