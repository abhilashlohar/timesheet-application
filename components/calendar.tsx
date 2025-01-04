'use client'; // Ensure this is client-side rendered for Next.js 14

import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMemo, useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Configure the moment localizer
const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Conference',
        start: new Date(),
        end: new Date(),
        allDay: false,
    },
];


const MyCalendar = () => {
    const [calendarEvents, setCalendarEvents] = useState(events);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const components = useMemo(() => ({

    }), [])

    const handleChangeMonth = (direction: number) => {
        const newDate = moment(currentDate).add(direction, 'months').toDate();
        setCurrentDate(newDate);
    };

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        alert('Selected date:' + slotInfo.start);
    };


    return (
        <div style={{ height: '500px' }}>
            <div className="flex items-center justify-between p-4 ">
                <span className="text-md font-semibold text-gray-700">
                    {moment(currentDate).format('MMMM YYYY')}
                </span>
                <div className='flex tems-center gap-1'>
                    <Button variant="outline" size="icon" onClick={() => handleChangeMonth(-1)}>
                        <ChevronLeft />
                    </Button>
                    <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Today</Button>
                    <Button variant="outline" size="icon" onClick={() => handleChangeMonth(1)}>
                        <ChevronRight />
                    </Button>
                </div>
            </div>



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
                onSelectSlot={handleSelectSlot}
            />
        </div>
    );
};

export default MyCalendar;
