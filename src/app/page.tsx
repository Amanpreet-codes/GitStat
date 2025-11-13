'use client'
import { signIn } from 'next-auth/react'

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-sans">
            <h1 className="text-3xl font-mono mb-6">Welcome to GitStat</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm w-full sm:w-auto px-5 font-medium py-2 text-center  focus:ring-3 focus:outline-none focus:ring-blue-300 rounded-lg transition"
                onClick={() => signIn('github')}
            >
                Login With Github
            </button>
        </div>
    )
}
