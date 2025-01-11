"use client"
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader } from './ui/card';
import { useAppSelector } from '@/store/hooks';

const COLORS = ['#009688', '#e91e63', '#ffeb3b', '#673ab7'];

const WorkStatusBreakdownChart: React.FC = () => {
  const chartData = useAppSelector((state) => state.analytics.fetchChartDataApiData);
  const data = chartData.data.chart1 as []

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
              {data.map((_, index: number) => (
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
