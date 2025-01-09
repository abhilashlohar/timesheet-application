'use client'
import React from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import ThemeToggle from './theme-toggle-button';
import { usePathname } from 'next/navigation';

const Header = () => {
    const currentRoute = usePathname();


    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <h3 className='font-semibold'>Timesheet App</h3>
                </div>

                <div className="flex items-center space-x-4">
                    {currentRoute === '/' && <Link
                        href="/analytics"
                        className="text-gray-700 dark:text-gray-200 font-medium"
                    >
                        Analytics
                    </Link>}
                    {currentRoute === '/analytics' && <Link
                        href="/"
                        className="text-gray-700 dark:text-gray-200 font-medium"
                    >
                        Timesheet
                    </Link>}

                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
