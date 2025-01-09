"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader } from './ui/card';

const data = [
    { week: 'Week 1', hours: 40 },
    { week: 'Week 2', hours: 35 },
    { week: 'Week 3', hours: 45 },
    { week: 'Week 4', hours: 38 },
];

// Custom styling for the chart
const TotalHoursWorkedChart: React.FC = () => {
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
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="hours" fill="#4CAF50" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default TotalHoursWorkedChart;
