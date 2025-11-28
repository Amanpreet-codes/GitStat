import { authOptions } from '../api/auth/[...nextauth]/route'
import { getGitHubRepos, getGitHubUser, getCommitCounts } from '../lib/github'
import CommitsStatCard from './components/CommitsStatCard'
import ProfileCard from './components/ProfileCard'
import StatsCard from './components/StatsCard'
import StreaksCard from './components/StreaksCard'
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
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
            <h1 className="text-2xl font-mono mb-16 text-gray-600 dark:text-white justify-self-center">
                {' '}
                Dashboard{' '}
            </h1>
            <div className="flex flex-col gap-6">
                <ProfileCard user={user} />
                <div className=""></div>
                <CommitsStatCard commitStats={commitStats} />
                <StatsCard repos={repos} />
                <StreaksCard />
                <CommitsLineChart data={daily} />
            </div>
        </div>
    )
}
