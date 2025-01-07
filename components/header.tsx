import React from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import ThemeToggle from './theme-toggle-button';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <h3 className='font-semibold'>Timesheet App</h3>
                </div>

                {/* Right Side: Navigation link and Avatar */}
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <Link
                        href="/analytics"
                        className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
                    >
                        Analytics
                    </Link>

                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
};

export default Header;
