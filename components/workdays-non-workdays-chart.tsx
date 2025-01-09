"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader } from './ui/card';

// Sample data for workdays vs non-workdays (e.g., vacation, sick leave, holidays)
const data = [
    { day: 'Monday', work: 8, nonWork: 0 },
    { day: 'Tuesday', work: 8, nonWork: 0 },
    { day: 'Wednesday', work: 6, nonWork: 2 }, // Example where user took 2 hours off
    { day: 'Thursday', work: 8, nonWork: 0 },
    { day: 'Friday', work: 5, nonWork: 3 }, // Example with 3 hours off
    { day: 'Saturday', work: 0, nonWork: 8 }, // Weekend, marked as non-working
    { day: 'Sunday', work: 0, nonWork: 8 }, // Weekend, marked as non-working
];

// Custom styling for the chart
const WorkdaysVsNonWorkdaysChart: React.FC = () => {
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
                        <Bar dataKey="work" stackId="a" fill="#4CAF50" />
                        <Bar dataKey="nonWork" stackId="a" fill="#FF9800" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default WorkdaysVsNonWorkdaysChart;
