import { GitHubUser } from '@/app/lib/github'
import Image from 'next/image'

interface ProfileCardProps {
    user: GitHubUser
}

export default function ProfileCard({ user }: ProfileCardProps) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-black/10 dark:border-zinc-800 p-5">
            <div className="flex items-center gap-4">
                <Image
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    width={72}
                    height={72}
                    className="rounded-full ring-2 ring-emerald-500/20"
                />
                <div>
                    <h2 className="text-lg font-semibold text-black dark:text-white">
                        {user.name ?? user.login}
                    </h2>
                    <p className="text-sm text-black/60 dark:text-white/60">
                        @{user.login}
                    </p>
                </div>
            </div>

            <div className="flex mt-4 gap-6 text-sm text-black/70 dark:text-white/70">
                <p>
                    <span className="font-semibold text-black dark:text-white">
                        {user.followers}
                    </span>
                    <span className="ml-1">followers</span>
                </p>
                <p>
                    <span className="font-semibold text-black dark:text-white">
                        {user.following}
                    </span>
                    <span className="ml-1">following</span>
                </p>
            </div>

            <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-block text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
            >
                View Profile →
            </a>
        </div>
    )
}
