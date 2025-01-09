"use client"
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader } from './ui/card';

// Data for the breakdown of work statuses
const data = [
  { name: 'Working', value: 60 },
  { name: 'Vacation', value: 25 },
  { name: 'Sick Leave', value: 10 },
  { name: 'Holiday', value: 5 }
];

// Custom colors for each status
const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#9E9E9E'];

const WorkStatusBreakdownChart: React.FC = () => {
  return (
    <Card className="shadow-md p-6">
      <CardHeader>
        <h2 className="text-lg font-semibold">Work Status Breakdown</h2>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WorkStatusBreakdownChart;
