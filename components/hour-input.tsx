import React, { useState } from "react";


const getClassName = (isSelected: boolean) => {
    const baseClasses = "h-12 w-12 flex items-center justify-center rounded-md text-sm font-medium";
    const lightModeClasses = isSelected
        ? "bg-white text-black"
        : "text-black border-gray-300 hover:bg-gray-300";
    const darkModeClasses = isSelected
        ? "dark:bg-black dark:border-black dark:text-white"
        : "dark:hover:bg-gray-600 dark:text-gray-300";

    return `${baseClasses} ${lightModeClasses} ${darkModeClasses}`;
};

const HourInput = ({ onSelect, defaultValue }: { onSelect: (value: number) => void, defaultValue: number }) => {
    const [selected, setSelected] = useState<number | null>(defaultValue || 8);

    const handleSelect = (value: number) => {
        setSelected(value);
        onSelect(value);
    };

    return (
        <div className="flex p-1 rounded-md bg-muted">
            {Array.from({ length: 8 }, (_, index) => {
                const value = index + 1;
                return (
                    <button
                        key={value}
                        onClick={() => handleSelect(value)}
                        className={getClassName(selected === value)}
                    >
                        {value}
                    </button>
                );
            })}
        </div>
    );
};


export default HourInput