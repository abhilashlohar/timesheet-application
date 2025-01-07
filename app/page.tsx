'use client';

import Timesheet from "@/components/timesheet";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";


export default function Home() {
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Timesheet />
  )
}
