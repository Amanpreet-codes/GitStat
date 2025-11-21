'use client'

import Image from 'next/image'
import { signOut } from 'next-auth/react'

interface Props {
    user: {
        name: string | null
        avatar_url: string | null
        login: string | null
    } | null
}

export default function Header({ user }: Props) {
    return (
        <header className="flex w-full border-b h-16 bg-gray-900/60 backdrop-blur-md items-center justify-between px-6">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center font-bold shadow">
                    DT
                </div>
                <h1 className="text-lg font-semibold text-gray-200">
                    DevTracker
                </h1>
            </div>
            <div className="flex gap-3 items-center">
                {user && (
                    <div className="">
                        <Image
                            src={user.avatar_url ?? '/placeholder.png'}
                            alt="avatar"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    </div>
                )}
                <button
                    className="px-3 py-1.5 rounded-md bg-red-900/30 text-red-200 transition hover:bg-red-900 shadow-white"
                    onClick={() => signOut({ callbackUrl: '/' })}
                >
                    Sign Out
                </button>
            </div>
        </header>
    )
}
