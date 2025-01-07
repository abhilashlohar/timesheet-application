'use client';

import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchHolidays, setWorkStatusData, setWorkStatusModalData } from '@/store/slices/timesheetSlice';
import { getColorsBasedOnStatus, isWeekend, statusClasses } from '@/utils';
import { WorkStatusData } from '@/types/global';


const localizer = momentLocalizer(moment);

interface Props {
}



const CalendarGrid = (props: Props) => {
    const currentDate = useAppSelector((state) => state.timesheet.currentDate);
    const workStatusData = useAppSelector((state) => state.timesheet.workStatusData);
    const fetchHolidayApiData = useAppSelector((state) => state.timesheet.fetchHolidayApiData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchHolidays())
    }, [dispatch])

    useEffect(() => {
        if (fetchHolidayApiData.status === 'fulfilled') {
            dispatch(setWorkStatusData(fetchHolidayApiData.data as WorkStatusData))
        }
    }, [fetchHolidayApiData.status])

    function getEvents() {
        let events = [];
        for (const date in workStatusData) {
            const obj = workStatusData[date];
            events.push({
                title: obj.status,
                start: new Date(date),
                end: new Date(date),
                status: obj.status
            })
        }
        return events
    }



    const getBgColor = (date: Date) => {
        const dateKey = date.toISOString();

        if (workStatusData[dateKey]) {
            const status = workStatusData[dateKey].status;

            switch (status) {
                case 'Working':
                    return { bg: '#ebf8ff', text: '#2b6cb0' };
                case 'Vacation':
                    return { bg: '#f0fff4', text: '#2f855a' };
                case 'Sick Leave':
                    return { bg: '#fff5f5', text: '#e53e3e' };
                default:
                    return { bg: '#fff', text: '#000' };
            }
        }

        return { bg: '#fff', text: '#000' };
    };

    function isHoliday(isoDate: string) {
        return workStatusData[isoDate]?.status === "Holiday"
    }

    const dayPropGetter: (date: Date) => React.HTMLAttributes<HTMLDivElement> = (date) => {
        if (isWeekend(date) || isHoliday(date.toISOString()))
            return { className: "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white" }
        else return { className: "bg-white text-black dark:bg-black dark:text-white" }
    };

    function getStatusColor(status: any) {
        if (status === 'Working') return "darkgreen"
        if (status === 'Vacation') return "darkblue"
        if (status === 'Sick Leave') return "darkred"
        return "black"
    }

    const eventPropGetter = (event: any) => {
        return { style: { backgroundColor: "transparent", color: getStatusColor(event.status) } }
    }

    const handleDateClick = (date: any) => {
        if (isWeekend(date)) return
        if (isHoliday(date.toISOString())) return
        if (date.getMonth() !== new Date(currentDate).getMonth()) return
        dispatch(setWorkStatusModalData({ action: "open", selectedDate: date.toISOString() }))
    }
    return (
        <>
            {['ideal', 'pending'].includes(fetchHolidayApiData.status) && (
                <div className="w-full h-[500px] bg-gray-200 rounded-lg animate-pulse" />
            )}
            {fetchHolidayApiData.status === 'fulfilled' && (
                <Calendar
                    localizer={localizer}
                    events={getEvents()}
                    startAccessor="start"
                    endAccessor="end"
                    toolbar={false}
                    date={currentDate}
                    selectable
                    style={{ height: 500 }}
                    onSelectSlot={(slotInfo: SlotInfo) => handleDateClick(slotInfo.start)}
                    onSelectEvent={(event: any) => handleDateClick(event.start)}
                    dayPropGetter={dayPropGetter}
                    eventPropGetter={eventPropGetter}
                />
            )}
        </>

    );
};

export default CalendarGrid;
