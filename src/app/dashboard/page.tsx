import { authOptions } from '../api/auth/[...nextauth]/route'
import CommitsStatCard from './components/CommitsStatCard'
import ProfileCard from './components/ProfileCard'
import StatsCard from './components/StatsCard'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/api/auth/signin')
    }
    return (
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
            <h1 className="text-2xl font-mono mb-16 text-gray-600 dark:text-white justify-self-center">
                {' '}
                Dashboard{' '}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="">
                    <ProfileCard />
                </div>
                <CommitsStatCard />
                <StatsCard />
            </div>
        </div>
    )
}
