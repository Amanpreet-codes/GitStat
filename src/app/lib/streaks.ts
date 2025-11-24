import { GitHubCommit } from './github'

// Utility: convert commit ISO timestamp → "YYYY-MM-DD"
function toDateString(iso: string): string {
    return new Date(iso).toISOString().split('T')[0]
}

export function calculateStreaks(commits: GitHubCommit[]) {
    if (commits.length === 0) {
        return {
            currentStreak: 0,
            longestStreak: 0,
            totalDays: 0,
            days: [],
        }
    }

    // Extract unique commit days
    const daysSet = new Set<string>()
    for (const c of commits) {
        const day = toDateString(c.commit.author.date)
        daysSet.add(day)
    }

    // Sort ascending (old → new)
    const days = Array.from(daysSet).sort()

    let currentStreak = 1 // at least 1 because last commit day exists
    let longestStreak = 1
    let streak = 1

    // Calculate longest streak
    for (let i = 1; i < days.length; i++) {
        const prev = new Date(days[i - 1])
        const curr = new Date(days[i])

        const diff = (curr.getTime() - prev.getTime()) / (24 * 60 * 60 * 1000)

        if (diff === 1) {
            streak++
        } else {
            longestStreak = Math.max(longestStreak, streak)
            streak = 1
        }
    }

    longestStreak = Math.max(longestStreak, streak)

    // Determine current streak
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setUTCDate(today.getUTCDate() - 1)

    const lastCommitDate = new Date(days[days.length - 1] + 'T00:00:00Z')

    const isToday = lastCommitDate.getTime() === today.getTime()
    const isYesterday = lastCommitDate.getTime() === yesterday.getTime()

    if (isToday || isYesterday) {
        currentStreak = streak
    } else {
        currentStreak = 0
    }

    return {
        currentStreak,
        longestStreak,
        totalDays: days.length,
        days,
    }
}
