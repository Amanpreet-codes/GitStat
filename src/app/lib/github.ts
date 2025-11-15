import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

const GITHUB_API = 'https://api.github.com'

export async function githubRequest<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
        throw new Error('No Github access token found in session')
    }

    const res = await fetch(`${GITHUB_API}${endpoint}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            Accept: 'application/vnd.github+json',
            'X-Github-Api_Version': '2022-11-28',
            ...options?.headers,
        },
        cache: 'no-store',
    })
    if (
        res.status === 403 &&
        res.headers.get('X-RateLimit-Remailing') === '0'
    ) {
        throw new Error('Github API rate limit exceeded')
    }

    if (!res.ok) {
        const text = await res.text()
        throw new Error(
            `github API error ${res.status}: ${text || res.statusText}`
        )
    }
    return res.json() as Promise<T>
}

export async function getGitHubUser() {
    return githubRequest<GitHubUser>('/user')
}

export async function getGitHubRepos() {
    return githubRequest<GithubRepo[]>('/user/repos?per_page=100&sort=updated')
}

export async function getRepoCommits(owner: string, repo: string) {
    return githubRequest<GithubCommit[]>(
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

export interface GithubRepo {
    name: string
    full_name: string
    stargazers_count: number
    language: string
    pushed_at: string
}

export interface GithubCommit {
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
