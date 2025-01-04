'use client';

import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../store/hooks';


const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Conference',
        start: new Date(),
        end: new Date(),
        allDay: false,
    },
];

interface Props {
    onDateSelect: (slotInfo: SlotInfo) => void
}

const CalendarGrid = (props: Props) => {
    const { onDateSelect } = props
    const [calendarEvents, setCalendarEvents] = useState(events);
    const currentDate = useAppSelector((state) => state.timesheet.currentDate);

    const components = useMemo(() => ({

    }), [])


    // const handleSelectSlot = (slotInfo: SlotInfo) => {
    //     alert('Selected date:' + slotInfo.start);
    // };


    return (
        <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            components={components}
            toolbar={false}
            date={currentDate}
            selectable
            onSelectSlot={onDateSelect}
        />
    );
};

export default CalendarGrid;
