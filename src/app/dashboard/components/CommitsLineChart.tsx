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
        <div className="w-full h-64 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3 dark:text-gray-100">
                Commits per Day
            </h2>

            {data.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-gray-500 dark:text-gray-400">
                    No commit data available
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: 'gray' }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: 'gray' }}
                            allowDecimals={false}
                            tickLine={false}
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#4f46e5"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}
