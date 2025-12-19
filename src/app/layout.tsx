import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { ThemeProvider } from 'next-themes'
import { getServerSession } from 'next-auth'
import { authOptions } from './lib/authOptions'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Git Stat',
    description: 'Gamify you commits',
}
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getServerSession(authOptions)
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    enableSystem={true}
                    defaultTheme="system"
                >
                    <Header
                        user={
                            session
                                ? {
                                      name: session.user?.name ?? null,
                                      login: session.user?.email ?? null,
                                      avatar_url: session.user?.image ?? null,
                                  }
                                : null
                        }
                    />

                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
