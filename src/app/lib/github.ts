import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

const GITHUB_API = 'https://api.github.com'

export async function githubRequest<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
        throw new Error('No GitHub access token found in session')
    }

    const res = await fetch(`${GITHUB_API}${endpoint}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            ...options?.headers,
        },
        cache: 'no-store',
    })
    if (
        res.status === 403 &&
        res.headers.get('X-RateLimit-Remaining') === '0'
    ) {
        throw new Error('GitHub API rate limit exceeded')
    }

    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(
            `GitHub API error ${res.status}: ${text || res.statusText}`
        )
    }
    return res.json() as Promise<T>
}

export async function getCommitCounts(
    days = 30,
    repoLimit = 10
): Promise<CommitCountsResult> {
    const user = await getGitHubUser()
    const username = user.login

    const repos = await getGitHubRepos()
    const topRepos = repos
        .sort(
            (a, b) =>
                new Date(b.pushed_at).getTime() -
                new Date(a.pushed_at).getTime()
        )
        .slice(0, repoLimit)

    const since = new Date(
        Date.now() - days * 24 * 60 * 60 * 1000
    ).toISOString()

    const promises = topRepos.map(async (r) => {
        const [owner] = r.full_name.split('/')
        const path = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
            r.name
        )}/commits?author=${encodeURIComponent(username)}&since=${encodeURIComponent(
            since
        )}&per_page=100`

        try {
            const commits = await githubRequest<GitHubCommit[]>(path)
            const count = Array.isArray(commits) ? commits.length : 0
            return { repo: r.name, owner, count }
        } catch {
            return { repo: r.name, owner, count: 0 }
        }
    })

    const settled = await Promise.allSettled(promises)

    const perRepo: CommitCountsPerRepo[] = settled.map((s, i) =>
        s.status === 'fulfilled'
            ? s.value
            : {
                  repo: topRepos[i].name,
                  owner: topRepos[i].full_name.split('/')[0],
                  count: 0,
              }
    )
    const total = perRepo.reduce((sum, r) => sum + r.count, 0)
    return { total, perRepo }
}

export async function getGitHubUser() {
    return githubRequest<GitHubUser>('/user')
}

export async function getGitHubRepos() {
    return githubRequest<GitHubRepo[]>('/user/repos?per_page=100&sort=updated')
}

export async function getRepoCommits(owner: string, repo: string) {
    return githubRequest<GitHubCommit[]>(
        `/repos/${owner}/${repo}/commits?per_page=50`
    )
}

export interface GitHubUser {
    login: string
    avatar_url: string
    html_url: string
    name: string
    followers: number
    following: number
}

export interface GitHubRepo {
    name: string
    full_name: string
    stargazers_count: number
    language: string | null
    pushed_at: string
}

export interface GitHubCommit {
    sha: string
    commit: {
        message: string
        author: {
            name: string
            date: string
        }
    }
    html_url: string
}

export interface CommitCountsPerRepo {
    repo: string
    owner: string
    count: number
}

export interface CommitCountsResult {
    total: number
    perRepo: CommitCountsPerRepo[]
}
