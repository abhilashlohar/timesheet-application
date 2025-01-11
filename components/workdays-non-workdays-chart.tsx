"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader } from './ui/card';
import { useAppSelector } from '@/store/hooks';


const WorkdaysVsNonWorkdaysChart: React.FC = () => {
    const chartData = useAppSelector((state) => state.analytics.fetchChartDataApiData);
    const data = chartData.data.chart3 as []
    return (
        <Card className="shadow-md p-6">
            <CardHeader>
                <h2 className="text-lg font-semibold">Workdays vs Non-Workdays</h2>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="work" stackId="a" fill="#009688" />
                        <Bar dataKey="nonWork" stackId="a" fill="#9e9e9e" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default WorkdaysVsNonWorkdaysChart;
