import { GitHubUser } from '@/app/lib/github'
import Image from 'next/image'

interface ProfileCardProps {
    user: GitHubUser
}

export default function ProfileCard({ user }: ProfileCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center gap-4">
                <Image
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    width={72}
                    height={72}
                    className="rounded-full ring-1 ring-gray-100 dark:ring-gray-700"
                />
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {user.name ?? user.login}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        @{user.login}
                    </p>
                </div>
            </div>

            <div className="flex mt-4 gap-6 text-sm text-gray-600 dark:text-gray-300">
                <p>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {user.followers}
                    </span>
                    <span className="ml-1">followers</span>
                </p>
                <p>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {user.following}
                    </span>
                    <span className="ml-1">following</span>
                </p>
            </div>

            <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-block text-sm text-blue-600 hover:underline"
            >
                View Profile →
            </a>
        </div>
    )
}
