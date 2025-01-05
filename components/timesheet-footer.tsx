import { Button } from "./ui/button";

export default function TimesheetFooter() {
    return (
        <div className="my-4 flex justify-end">
            <Button size="lg" onClick={() => alert("submit")}>Submit Timesheet</Button>
        </div>
    )
}