import { Achievement } from '@/app/lib/achievements'

type Props = {
    achievements: Achievement[]
}

export default function AchievementsCard({ achievements }: Props) {
    return (
        <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 shadow-xl border border-black/10 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
                Achievements
            </h2>

            <ul className="space-y-3">
                {achievements.map((a) => (
                    <li
                        key={a.id}
                        className={`flex items-center gap-3 ${
                            a.unlocked ? '' : 'opacity-40'
                        }`}
                    >
                        <span className="text-xl">
                            {a.unlocked ? a.title.split(' ')[0] : '🔒'}
                        </span>
                        <div>
                            <p className="font-medium text-black dark:text-white">
                                {a.title.split(' ').slice(1).join(' ')}
                            </p>
                            <p className="text-sm text-black/60 dark:text-white/60">
                                {a.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
