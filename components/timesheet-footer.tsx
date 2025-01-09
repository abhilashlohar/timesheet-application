import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "./ui/button";
import { isWeekend } from "@/utils";
import { useToast } from "@/hooks/use-toast"
import { WorkStatusData } from "@/types/global";
import { saveTimesheet } from "@/store/slices/timesheetSlice";


export default function TimesheetFooter() {
    const workStatusData = useAppSelector((state) => state.timesheet.workStatusData);
    const currentDate = useAppSelector((state) => state.timesheet.currentDate);
    const { toast } = useToast()
    const dispatch = useAppDispatch()



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

    const getHolidaysOfMonth = (workStatusData: WorkStatusData, isoDate: string): string[] => {
        const holidays: string[] = [];

        Object.keys(workStatusData).forEach(date => {
            // Only include the dates with status "Holiday"
            if (workStatusData[date].status === "Holiday") {
                const holidayDate = new Date(date);
                const currentDate = new Date(isoDate);

                // Check if the holiday falls in the same month
                if (holidayDate.getFullYear() === currentDate.getFullYear() && holidayDate.getMonth() === currentDate.getMonth()) {
                    holidays.push(date); // Add the holiday date
                }
            }
        });

        return holidays;
    };

    const weekends = getWeekendsOfMonth(currentDate);
    const holidays = getHolidaysOfMonth(workStatusData, currentDate);
    const excludeDates = [...weekends, ...holidays];
    const isSubmitAllowed = checkAllDaysStatus(workStatusData, excludeDates, currentDate)


    const getCurrentMonthData = (workStatusData: WorkStatusData, currentDate: string) => {
        // Convert currentDate to Date object
        const currentDateObj = new Date(currentDate);

        // Get the first day of the current month
        const startDate = new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), 1);

        // Get the last day of the current month
        const endDate = new Date(currentDateObj.getFullYear(), currentDateObj.getMonth() + 1, 0);



        // Get the list of holidays from workStatusData
        const holidays = Object.keys(workStatusData).filter(date => workStatusData[date].status === 'Holiday');

        // Filter out weekends and holidays
        const filteredData: WorkStatusData = {};

        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            const dateString = currentDate.toISOString();

            // Skip if the current date is a weekend or holiday
            if (isWeekend(currentDate) || holidays.includes(dateString)) {
                continue;
            }

            // Add the valid date to the result
            if (workStatusData[dateString]) {
                filteredData[dateString] = workStatusData[dateString];
            }
        }

        return filteredData;
    };

    const handleSubmit = () => {
        const monthData = getCurrentMonthData(workStatusData, currentDate);
        dispatch(saveTimesheet(monthData))
        toast({
            title: "Timesheet submitted successfully.",
            duration: 3000,
            style: {
                backgroundColor: '#4caf50',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: 'bold',
                padding: '16px',
            },
        })
    }

    return (
        <div className="my-4 flex justify-end items-center gap-4">
            {!isSubmitAllowed && <span className="text-sm text-gray-500">Please fill all days (excluding weekends & holidays) with work status: <em>Working</em> | <em>Vacation</em> | <em>Sick Leave</em></span>}
            <Button disabled={!isSubmitAllowed} size="lg" onClick={handleSubmit}>Submit Timesheet</Button>
        </div>
    )
}