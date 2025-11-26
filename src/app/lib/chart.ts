import { GitHubCommit } from './github'

export function groupCommitsByDay(commits: GitHubCommit[]) {
    const map: Record<string, number> = {}

    for (const c of commits) {
        const day = c.commit.author.date.split('T')[0]
        map[day] = (map[day] || 0) + 1
    }

    // Convert to array sorted by date
    return Object.entries(map)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
