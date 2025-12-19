'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

type Props = {
    data: { date: string; count: number }[]
}

export default function CommitsLineChart({ data }: Props) {
    return (
        <div className="w-full">
            {data.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-black/60 dark:text-white/60">
                    No commit data available
                </div>
            ) : (
                <div style={{ width: '100%', height: 300, minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12, fill: 'currentColor' }}
                                tickLine={false}
                                stroke="currentColor"
                                className="text-black/60 dark:text-white/60"
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: 'currentColor' }}
                                allowDecimals={false}
                                tickLine={false}
                                stroke="currentColor"
                                className="text-black/60 dark:text-white/60"
                            />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}
