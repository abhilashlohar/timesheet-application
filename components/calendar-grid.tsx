'use client';

import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMemo, useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const components = useMemo(() => ({

    }), [])

    const handleChangeMonth = (direction: number) => {
        const newDate = moment(currentDate).add(direction, 'months').toDate();
        setCurrentDate(newDate);
    };

    // const handleSelectSlot = (slotInfo: SlotInfo) => {
    //     alert('Selected date:' + slotInfo.start);
    // };


    return (
        <div >
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
                onSelectSlot={onDateSelect}
            />
        </div>
    );
};

export default CalendarGrid;