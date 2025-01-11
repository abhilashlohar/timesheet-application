'use client'
import AverageDailyWorkHoursChart from "@/components/average-daily-work-hours-chart";
import TotalHoursWorkedChart from "@/components/total-hours-worked-chart";
import WorkStatusBreakdownChart from "@/components/Work-status-breakdown-chart";
import WorkdaysVsNonWorkdaysChart from "@/components/workdays-non-workdays-chart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchChartData } from "@/store/slices/analyticsSlice";
import { useEffect } from "react";

export default function WorkCharts() {
    const chartData = useAppSelector((state) => state.analytics.fetchChartDataApiData);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchChartData())
    }, [])

    return (
        <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Your Monthly Performance Overview</h1>

            {['ideal', 'pending'].includes(chartData.status) && (
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
                    {[0, 1, 2, 3].map((index, _) => (
                        <div className="shadow-md p-6 animate-pulse" key={index}>
                            <div className="h-5 bg-gray-200 dark:bg-gray-900 rounded w-1/4 mb-4"></div>
                            <div className="w-full h-64 bg-gray-200 dark:bg-gray-900 rounded"></div>
                        </div>
                    ))}
                </div>)
            }

            {chartData.status === 'rejected' && (
                <div className="w-full h-[500px] bg-gray-200 dark:bg-gray-900 rounded-lg flex items-center justify-center" >
                    {chartData.message}
                </div>)}

            {chartData.status === 'fulfilled' && (
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
                    <WorkStatusBreakdownChart />
                    <TotalHoursWorkedChart />
                    <WorkdaysVsNonWorkdaysChart />
                    <AverageDailyWorkHoursChart />
                </div>
            )}
        </div>
    )
}