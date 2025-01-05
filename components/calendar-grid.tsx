'use client';

import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setWorkStatusModalData } from '@/store/slices/timesheetSlice';


const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Conference',
        start: new Date(),
        end: new Date(),
    },
];

interface Props {
}



const CalendarGrid = (props: Props) => {
    const currentDate = useAppSelector((state) => state.timesheet.currentDate);
    const workStatusData = useAppSelector((state) => state.timesheet.workStatusData);

    const dispatch = useAppDispatch();

    function getEvents() {
        let events = [];
        for (const date in workStatusData) {
            const obj = workStatusData[date];
            events.push({
                title: <span>{obj.status}</span>,
                start: new Date(date),
                end: new Date(date),
            })
        }
        return events
    }

    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6; // Sunday = 0, Saturday = 6
    };

    const getBgColor = (date: Date): string => {
        const dateKey = date.toISOString();

        if (workStatusData[dateKey]) {
            const status = workStatusData[dateKey].status;

            switch (status) {
                case 'Working':
                    return '#d4f8d4';
                case 'Vacation':
                case 'Sick Leave':
                    return '#f8d4d4';
                default:
                    return '#ffffff';
            }
        }

        return '#ffffff';
    };

    const dayPropGetter: (date: Date) => React.HTMLAttributes<HTMLDivElement> = (date) => {
        if (isWeekend(date)) {
            return {
                style: {
                    backgroundColor: '#e6e6e6',
                    pointerEvents: 'none',
                    cursor: 'default',
                },
            };
        }
        return {
            style: {
                backgroundColor: getBgColor(date),
            },
        };
    };

    return (
        <Calendar
            localizer={localizer}
            events={getEvents()}
            startAccessor="start"
            endAccessor="end"
            toolbar={false}
            date={currentDate}
            selectable
            style={{ height: 500 }}
            onSelectSlot={(slotInfo: SlotInfo) => {
                if (isWeekend(slotInfo.start)) return
                if (slotInfo.start.getMonth() !== new Date(currentDate).getMonth()) return
                dispatch(setWorkStatusModalData({ action: "open", selectedDate: slotInfo.start.toISOString() }))
            }}
            dayPropGetter={dayPropGetter}
        />
    );
};

export default CalendarGrid;
