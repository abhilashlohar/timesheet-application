'use client';

import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

interface Props {
    children: any;
}
export default function ThemeProvider(props: Props) {
    const theme = useAppSelector((state) => state.theme.theme);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return props.children
}