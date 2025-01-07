'use client';

import { toggleTheme } from '../store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.theme);
    const [mounted, setMounted] = useState(false);

    const handleToggle = () => {
        dispatch(toggleTheme());
        document.documentElement.classList.toggle('dark', theme === 'light');
    };

    useEffect(() => {
        // Ensures that this runs only on the client after the page is mounted
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Render nothing until mounted
    }

    return (
        <Button
            onClick={handleToggle}
            variant='outline'
        >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Button>
    );
};

export default ThemeToggle;
