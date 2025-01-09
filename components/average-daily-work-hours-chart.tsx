"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader } from './ui/card';

// Sample data for average daily work hours for each day of the week
const data = [
    { day: 'Monday', hours: 8 },
    { day: 'Tuesday', hours: 7.5 },
    { day: 'Wednesday', hours: 8 },
    { day: 'Thursday', hours: 7 },
    { day: 'Friday', hours: 6.5 },
    { day: 'Saturday', hours: 0 },
    { day: 'Sunday', hours: 0 },
];

// Custom styling for the chart
const AverageDailyWorkHoursChart: React.FC = () => {
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
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="hours"
                            stroke="#4CAF50"
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
