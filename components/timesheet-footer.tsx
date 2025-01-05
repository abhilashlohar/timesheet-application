import { useAppSelector } from "@/store/hooks";
import { Button } from "./ui/button";
import { SelectedStatus, WorkStatusData } from "@/store/slices/timesheetSlice";


export default function TimesheetFooter() {
    const workStatusData = useAppSelector((state) => state.timesheet.workStatusData);
    const currentDate = useAppSelector((state) => state.timesheet.currentDate);

    const checkAllDaysStatus = (
        workStatusData: WorkStatusData,
        excludeDates: string[], // Array of date strings to exclude
        currentMonthDate: string
    ): boolean => {
        const date = new Date(currentMonthDate);
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        // Loop through all days of the given month
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            const dateString = currentDate.toISOString();

            // Skip if the current date is in the excludeDates array
            if (excludeDates.includes(dateString)) {
                continue;
            }

            // Check if the status exists for the current date
            if (!workStatusData[dateString] || !['Working', 'Vacation', 'Sick Leave'].includes(workStatusData[dateString].status)) {
                return false; // Return false if status is missing or invalid
            }
        }
        return true; // Return true if all days are checked
    };

    const getWeekendsOfMonth = (isoDate: string): string[] => {
        // Convert ISO string to Date object
        const date = new Date(isoDate);

        // Get the first day of the month
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);

        // Get the last day of the month
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        // Array to store weekend dates (Saturday and Sunday)
        const weekends: string[] = [];

        // Loop through all days of the month
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            // Check if the current day is a Saturday (6) or Sunday (0)
            if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
                // Push the ISO string representation of the weekend day
                weekends.push(currentDate.toISOString());
            }
        }

        return weekends;
    };

    const isSubmitAllowed = checkAllDaysStatus(workStatusData, getWeekendsOfMonth(currentDate), currentDate)

    return (
        <div className="my-4 flex justify-end items-center gap-4">
            {!isSubmitAllowed && <span className="text-sm text-gray-500">Please fill all days (excluding weekends & holidays) with work status: <em>Working</em> | <em>Vacation</em> | <em>Sick Leave</em></span>}
            <Button disabled={!isSubmitAllowed} size="lg" onClick={() => alert("submit")}>Submit Timesheet</Button>
        </div>
    )
}