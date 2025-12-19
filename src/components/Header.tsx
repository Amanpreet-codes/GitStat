'use client'

import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

interface Props {
    user: {
        name: string | null
        avatar_url: string | null
        login: string | null
    } | null
}

export default function Header({ user }: Props) {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <header className="flex w-full border-b border-black/10 dark:border-zinc-800 h-16 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md items-center justify-between px-6">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center font-bold shadow text-white rounded">
                    DT
                </div>
                <h1 className="text-lg font-semibold text-black dark:text-white">
                    DevTracker
                </h1>
            </div>
            <div className="flex gap-3 items-center">
                <button
                    aria-label="Toggle theme"
                    title="Toggle theme"
                    onClick={() =>
                        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
                    }
                    className="p-2 rounded-md bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                >
                    {mounted &&
                        (resolvedTheme === 'light' ? (
                            // moon icon
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                                    fill="currentColor"
                                />
                            </svg>
                        ) : (
                            // sun icon
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 4V2M12 22v-2M4.93 4.93L3.51 3.51M20.49 20.49l-1.42-1.42M2 12H4M20 12h2M4.93 19.07l-1.42 1.42M20.49 3.51L19.07 4.93M12 8a4 4 0 100 8 4 4 0 000-8z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ))}
                </button>

                {user && (
                    <div className="flex gap-3 items-center">
                        <Image
                            src={user.avatar_url ?? '/placeholder.png'}
                            alt="avatar"
                            width={32}
                            height={32}
                            className="rounded-full ring-2 ring-emerald-500/20"
                        />
                        <button
                            className="px-3 py-1.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 transition hover:bg-red-500/20 border border-red-500/20"
                            onClick={() => signOut({ callbackUrl: '/' })}
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}
