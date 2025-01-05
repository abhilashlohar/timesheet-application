import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addWorkStatus, SelectedStatus, setWorkStatusModalData } from "@/store/slices/timesheetSlice";
import moment from "moment";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"




export default function WorkStatusModal() {
    const { workStatusData, workStatusModal: workStatusModalData } = useAppSelector((state) => state.timesheet);
    const existingSelectedStatus = workStatusModalData.selectedDate && workStatusData[workStatusModalData.selectedDate]
    const dispatch = useAppDispatch();
    const [selectedStatus, setSelectedStatus] = useState<SelectedStatus | undefined>(undefined)

    const handleChange = (value: string) => {
        setSelectedStatus(value as SelectedStatus);
    };

    const handleSave = () => {
        if (selectedStatus) {
            dispatch(addWorkStatus({ status: selectedStatus, metaData: null }))
            dispatch(setWorkStatusModalData({ action: 'close', selectedDate: null }))
            setSelectedStatus(undefined)
        }
    }

    useEffect(() => {
        if (existingSelectedStatus && existingSelectedStatus.status) setSelectedStatus(existingSelectedStatus.status)
    }, [existingSelectedStatus])


    return (
        <Dialog open={workStatusModalData.open} onOpenChange={_ => {
            dispatch(setWorkStatusModalData({ action: "close", selectedDate: null }))
            setSelectedStatus(undefined)
        }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Set work status for: {moment(workStatusModalData.selectedDate).format('D MMMM YYYY')}</DialogTitle>
                </DialogHeader>
                <div>
                    <Select onValueChange={handleChange} defaultValue={selectedStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Working">Working</SelectItem>
                                <SelectItem value="Vacation">Vacation</SelectItem>
                                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave} >Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}