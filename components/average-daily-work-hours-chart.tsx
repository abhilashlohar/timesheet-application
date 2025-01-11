"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader } from './ui/card';
import { useAppSelector } from '@/store/hooks';


const AverageDailyWorkHoursChart: React.FC = () => {
    const chartData = useAppSelector((state) => state.analytics.fetchChartDataApiData);
    const data = chartData.data.chart4 as []

    return (
        <Card className="shadow-md p-6">
            <CardHeader>
                <h2 className="text-lg font-semibold">Average Daily Work Hours</h2>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip contentStyle={{ color: 'var(--tw-text-opacity, #000)' }} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="hours"
                            stroke="#009688"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default AverageDailyWorkHoursChart;
