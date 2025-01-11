export const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

export function isNotEmptyObject(variable: unknown) {
    return (
        typeof variable === 'object' && // Check if it's an object
        variable !== null && // Ensure it's not null
        !Array.isArray(variable) && // Exclude arrays
        Object.keys(variable).length > 0 // Ensure it has properties
    );
}


