import AverageDailyWorkHoursChart from "@/components/average-daily-work-hours-chart";
import TotalHoursWorkedChart from "@/components/total-hours-worked-chart";
import WorkStatusBreakdownChart from "@/components/Work-status-breakdown-chart";
import WorkdaysVsNonWorkdaysChart from "@/components/workdays-non-workdays-chart";

export default function Analytics() {
    return (
        <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Your Monthly Performance Overview</h1>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
                <WorkStatusBreakdownChart />
                <TotalHoursWorkedChart />
                <WorkdaysVsNonWorkdaysChart />
                <AverageDailyWorkHoursChart />
            </div>
        </div>
    )
}