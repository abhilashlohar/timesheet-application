'use client';
import { SlotInfo } from "react-big-calendar"
import WorkStatusModal from "./work-status"
import { useState } from "react";
import CalendarGrid from "./calendar-grid";
import CalendatHeader from "./calendat-header";
import TimesheetFooter from "./timesheet-footer";

export default function Timesheet() {
    const [isWorkStatusModalOpen, setIsWorkStatusModalOpen] = useState<boolean>(false)

    return <div>
        <CalendatHeader />
        <CalendarGrid onDateSelect={(slotInfo: SlotInfo) => {
            setIsWorkStatusModalOpen(true)
        }} />
        <WorkStatusModal isOpen={isWorkStatusModalOpen} />
        <TimesheetFooter />
    </div>
}