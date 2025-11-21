import { GitHubUser } from '@/app/lib/github'
import Image from 'next/image'

interface ProfileCardProps {
    user: GitHubUser
}

export default function ProfileCard({ user }: ProfileCardProps) {
    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
            <div className="flex items-center gap-4">
                <Image
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    width={80}
                    height={80}
                    className="rounded-full"
                />
                <div>
                    <h2 className="text-xl font-semibold font-serif pt-4 text-gray-900 dark:text-white">
                        {' '}
                        {user.name ?? user.login}
                    </h2>
                    <p className="text-gray-500"> @{user.login}</p>
                </div>
            </div>
            <div className="flex mt-4 gap-6 text-sm">
                <p>
                    <span className="font-semibold">{user.followers}</span>{' '}
                    followers
                </p>
                <p>
                    <span className="font-semibold">{user.following}</span>{' '}
                    following
                </p>
            </div>
            <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-block text-blue-600 hover:underline text-sm"
            >
                {' '}
                View Profile →
            </a>
        </div>
    )
}
