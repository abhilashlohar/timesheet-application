'use client';
import WorkStatusModal from "./work-status-modal"
import CalendarGrid from "./calendar-grid";
import CalendatHeader from "./calendat-header";
import TimesheetFooter from "./timesheet-footer";

export default function Timesheet() {

    return <div>
        <CalendatHeader />
        <CalendarGrid />
        <WorkStatusModal />
        <TimesheetFooter />
    </div>
}