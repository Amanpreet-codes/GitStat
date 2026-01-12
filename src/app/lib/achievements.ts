export type Achievement = {
    id: string
    title: string
    description: string
    unlocked: boolean
}

export type Stats = {
    totalCommits: number
    longestStreak: number
    repos: number
    activeDays: number
}

type AchievementDef = Omit<Achievement, 'unlocked'> & {
    check: (s: Stats) => boolean
}

const ACHIEVEMENT_DEFINITIONS: AchievementDef[] = [
    {
        id: 'first-commit',
        title: '🟢 First Commit',
        description: 'Make your first commit',
        check: (s) => s.totalCommits >= 1,
    },
    {
        id: '3-day-streak',
        title: '🔥 3-Day Streak',
        description: 'Reach a 3-day commit streak',
        check: (s) => s.longestStreak >= 3,
    },
    {
        id: '7-day-streak',
        title: '🚀 7-Day Streak',
        description: 'Reach a 7-day commit streak',
        check: (s) => s.longestStreak >= 7,
    },
    {
        id: 'repo-starter',
        title: '📦 Repo Starter',
        description: 'Contributed to 3 or more repositories',
        check: (s) => s.repos >= 3,
    },
    {
        id: 'consistent',
        title: '🧱 Consistent',
        description: 'Be active on at least 15 days',
        check: (s) => s.activeDays >= 15,
    },
]

export function computeAchievements(stats: Stats): Achievement[] {
    return ACHIEVEMENT_DEFINITIONS.map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        unlocked: d.check(stats),
    }))
}

export const emptyAchievements = (): Achievement[] =>
    ACHIEVEMENT_DEFINITIONS.map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        unlocked: false,
    }))
