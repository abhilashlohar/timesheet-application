import { StatusColorCodeObject, WorkStatusType } from "./types/global";

export const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

export const statusClasses = {
    "Working": "bg-green-100 text-green-800 dark:bg-green-100 dark:text-green-100",
    "Vacation": "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
    "Sick Leave": "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    "Holiday": "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    "Weekend": "bg-gray-100 text-gray-800 dark:bg-red-800 dark:text-red-100",
    "Default": "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
};

export const getColorsBasedOnStatus = (status: WorkStatusType): StatusColorCodeObject => {
    switch (status) {
        // case 'Working':
        //     return { bg: '#f0fff4', text: '#2f855a' };
        // case 'Vacation':
        //     return { bg: '#ebf8ff', text: '#2b6cb0' };
        // case 'Sick Leave':
        //     return { bg: '#fff5f5', text: '#e53e3e' };
        // case 'Holiday':
        //     return { bg: '#fefcbf', text: '#d69e2e' };
        // case 'Weekend':
        //     return { bg: '#e6e6e6', text: '#000' };
        default:
            return { bg: '#fff', text: '#000' };
    }
}

