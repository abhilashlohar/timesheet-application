'use client';

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import { Button } from "./ui/button";
import { changeMonth } from "@/store/slices/timesheetSlice";

export default function CalendatHeader() {
    const currentDate = useAppSelector((state) => state.timesheet.currentDate);
    const dispatch = useAppDispatch();

    return (
        <div className="flex items-center justify-between p-4 ">
            <span className="text-md font-semibold text-black dark:text-white">
                {moment(currentDate).format('MMMM YYYY')}
            </span>
            <div className='flex tems-center gap-1'>
                <Button variant="outline" size="icon" onClick={() => dispatch(changeMonth('previous'))}>
                    <ChevronLeft />
                </Button>
                <Button variant="outline" onClick={() => dispatch(changeMonth('today'))}>Today</Button>
                <Button variant="outline" size="icon" onClick={() => dispatch(changeMonth('next'))}>
                    <ChevronRight />
                </Button>
            </div>
        </div>
    )
}