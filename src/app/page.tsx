'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center overflow-hidden relative">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-black to-emerald-950/40 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-50" />

            <div className="w-full max-w-7xl mx-auto px-6 py-24 grid gap-12 lg:grid-cols-2 items-center relative z-10">
                {/* Left: Hero content */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-sm font-medium text-white">
                        <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 text-black text-xs font-semibold">
                            New
                        </span>
                        GitStat Pro — Beta launch
                    </div>

                    <h1 className="text-5xl sm:text-6xl font-black leading-tight text-white">
                        Turn GitHub commits into
                        <span className="ml-3 bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                            winning streaks
                        </span>
                    </h1>

                    <p className="text-lg text-white/70 max-w-xl leading-relaxed">
                        Visualize your coding activity, track contribution
                        streaks, and gamify your development workflow. One-click
                        GitHub sync. Instant insights.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            onClick={() =>
                                signIn('github', { callbackUrl: '/dashboard' })
                            }
                            className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.01] transform transition"
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.476 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
                            </svg>
                            Get started
                        </button>

                        <Link
                            href="#features"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white bg-white/5 hover:bg-white/10 transition"
                        >
                            Learn more
                        </Link>
                    </div>

                    {/* <div className="mt-8 flex items-center gap-6">
                        <div className="text-sm text-white/60">
                            Trusted by developers
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-xs font-semibold text-white/80 px-3 py-2 rounded border border-white/10">
                                GitHub
                            </div>
                            <div className="text-xs font-semibold text-white/80 px-3 py-2 rounded border border-white/10">
                                VS Code
                            </div>
                            <div className="text-xs font-semibold text-white/80 px-3 py-2 rounded border border-white/10">
                                Slack
                            </div>
                        </div>
                    </div> */}

                    <div
                        id="features"
                        className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-md text-xl">📈</div>
                            <div>
                                <div className="font-semibold text-white">
                                    Insights
                                </div>
                                <div className="text-sm text-white/60">
                                    Daily commit trends and repo health
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-md text-xl">🔥</div>
                            <div>
                                <div className="font-semibold text-white">
                                    Streaks
                                </div>
                                <div className="text-sm text-white/60">
                                    Motivate consistent contributions
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Product mockup card */}
                <div className="relative">
                    <div className="rounded-2xl bg-slate-900/60 shadow-2xl p-6 border border-white/10 backdrop-blur">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                                    DT
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">
                                        DevTracker
                                    </div>
                                    <div className="text-xs text-white/60">
                                        Overview · Last 30 days
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm text-white/60">
                                Updated 2h ago
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <div className="text-2xl font-bold text-white">
                                        128
                                    </div>
                                    <div className="text-xs text-white/60">
                                        Commits this month
                                    </div>
                                </div>
                                <div className="text-sm text-emerald-400 font-semibold">
                                    +12% ↑
                                </div>
                            </div>

                            <div className="h-36 bg-gradient-to-b from-indigo-500/10 to-emerald-500/10 rounded-md flex items-end p-3 border border-white/5">
                                <div className="w-full h-24 bg-gradient-to-t from-emerald-500/30 to-indigo-500/30 rounded-md" />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="p-3 bg-white/5 border border-white/10 rounded-md">
                                <div className="text-sm text-white/60">
                                    Top repo
                                </div>
                                <div className="font-semibold text-white">
                                    awesome-app
                                </div>
                            </div>
                            <div className="p-3 bg-white/5 border border-white/10 rounded-md">
                                <div className="text-sm text-white/60">
                                    Longest streak
                                </div>
                                <div className="font-semibold text-white">
                                    15 days
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating badges */}
                    <div className="absolute -top-6 -right-6 w-44 p-3 rounded-lg bg-slate-900/60 border border-white/10 shadow-lg backdrop-blur">
                        <div className="text-xs text-white/60">Next goal</div>
                        <div className="font-semibold text-white">
                            10 commits / week
                        </div>
                    </div>

                    <div className="absolute -bottom-6 left-6 w-36 p-3 rounded-lg bg-slate-900/60 border border-white/10 shadow-lg backdrop-blur">
                        <div className="text-xs text-white/60">Badge</div>
                        <div className="font-semibold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                            Commit Master
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
