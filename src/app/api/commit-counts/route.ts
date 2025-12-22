import { NextResponse } from 'next/server'
import { getCommitCounts } from '../../lib/github'

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const daysParam = url.searchParams.get('days')
        const limitParam =
            url.searchParams.get('limit') || url.searchParams.get('repoLimit')

        const days = daysParam ? Math.max(1, parseInt(daysParam, 10) || 30) : 30
        const repoLimit = limitParam
            ? Math.max(1, parseInt(limitParam, 10) || 10)
            : 10

        const data = await getCommitCounts(days, repoLimit)
        return NextResponse.json(data)
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
