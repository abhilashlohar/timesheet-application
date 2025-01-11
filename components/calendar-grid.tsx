'use client';

import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchHolidays, setWorkStatusData, setWorkStatusModalData } from '@/store/slices/timesheetSlice';
import { isWeekend } from '@/utils';
import { WorkStatusData } from '@/types/global';


const localizer = momentLocalizer(moment);

interface Props {
}



const CalendarGrid = (props: Props) => {
    const currentDate = useAppSelector((state) => state.timesheet.currentDate);
    const workStatusData = useAppSelector((state) => state.timesheet.workStatusData);
    const fetchHolidayApiData = useAppSelector((state) => state.timesheet.fetchHolidayApiData);
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.theme);


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
                description: obj.status === 'Working' ? `${obj.metaData?.workingHrs} Hrs` : obj.metaData?.notes,
                start: new Date(date),
                end: new Date(date),
                status: obj.status
            })
        }
        return events
    }

    const EventComponent = ({ event }: any) => {
        return (
            <div className="flex flex-col" title={event.description}>
                <span className={`font-semi-bold text-sm ${getTitleClass(event.status)}`}>{event.status}</span>
                <span className="text-xs text-gray-500">{event.description}</span>
            </div>
        );
    };

    function isHoliday(isoDate: string) {
        return workStatusData?.[isoDate]?.status === "Holiday"
    }

    const dayPropGetter: (date: Date) => React.HTMLAttributes<HTMLDivElement> = (date) => {
        if (isWeekend(date) || isHoliday(date.toISOString()))
            return { className: "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white" }
        else return { className: "bg-white text-black dark:bg-black dark:text-white" }
    };

    function getTitleClass(status: any) {
        if (status === 'Working') return "text-teal-500"
        if (status === 'Vacation') return "text-pink-500"
        if (status === 'Sick Leave') return "text-yellow-500"
        if (status === 'Holiday') return "text-deep-purple-500"
        return ""
    }

    const eventPropGetter = (event: any) => {
        return { style: { backgroundColor: "transparent" } }
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
                <div className="w-full h-[500px] bg-gray-200 dark:bg-gray-900 rounded-lg animate-pulse" />
            )}

            {fetchHolidayApiData.status === 'rejected' && (
                <div className="w-full h-[500px] bg-gray-200 dark:bg-gray-900 rounded-lg flex items-center justify-center" >
                    {fetchHolidayApiData.message}
                </div>
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
                    components={{
                        event: EventComponent
                    }}
                />
            )}
        </>

    );
};

export default CalendarGrid;
