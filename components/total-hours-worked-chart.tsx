"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader } from './ui/card';
import { useAppSelector } from '@/store/hooks';


const TotalHoursWorkedChart: React.FC = () => {
    const chartData = useAppSelector((state) => state.analytics.fetchChartDataApiData);
    const data = chartData.data.chart2 as []

    return (
        <Card className="shadow-md p-6">
            <CardHeader>
                <h2 className="text-lg font-semibold">Total Hours Worked Per Week</h2>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip contentStyle={{ color: 'var(--tw-text-opacity, #000)' }} />
                        <Legend />
                        <Bar dataKey="hours" fill="#009688" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default TotalHoursWorkedChart;
