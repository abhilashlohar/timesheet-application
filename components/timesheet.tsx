'use client';
import WorkStatusModal from "./work-status-modal"
import CalendarGrid from "./calendar-grid";
import CalendatHeader from "./calendat-header";
import TimesheetFooter from "./timesheet-footer";
import ExportData from "./test";

export default function Timesheet() {

    return <>
        <CalendatHeader />
        <CalendarGrid />
        <WorkStatusModal />
        <TimesheetFooter />
    </>
}