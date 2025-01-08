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
import { addWorkStatus, clearWorkStatus, setWorkStatusModalData } from "@/store/slices/timesheetSlice";
import moment from "moment";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { WorkStatusType } from "@/types/global";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
import HourInput from "./hour-input";




export default function WorkStatusModal() {
    const { workStatusData, workStatusModal: workStatusModalData } = useAppSelector((state) => state.timesheet);
    const existingSelectedStatus = workStatusModalData.selectedDate && workStatusData[workStatusModalData.selectedDate]
    const dispatch = useAppDispatch();
    const [selectedStatus, setSelectedStatus] = useState<WorkStatusType | "">("")
    console.log('hello selectedStatus', selectedStatus);
    console.log('hello existingSelectedStatus', existingSelectedStatus);


    const handleChange = (value: string) => {
        console.log('hello handleChange called');

        setSelectedStatus(value as WorkStatusType);
    };

    const handleSave = () => {
        if (selectedStatus) {
            dispatch(addWorkStatus({ status: selectedStatus, metaData: null }))
            dispatch(setWorkStatusModalData({ action: 'close', selectedDate: null }))
            setSelectedStatus("")
        }
    }

    const handleReset = () => {
        setSelectedStatus("")
        dispatch(clearWorkStatus())
        dispatch(setWorkStatusModalData({ action: 'close', selectedDate: null }))
    }

    useEffect(() => {
        if (existingSelectedStatus && existingSelectedStatus.status) setSelectedStatus(existingSelectedStatus.status)
    }, [existingSelectedStatus])


    return (
        <Dialog open={workStatusModalData.open} onOpenChange={_ => {
            dispatch(setWorkStatusModalData({ action: "close", selectedDate: null }))
            setSelectedStatus("")
        }}>
            <DialogContent className="md:max-w-[40rem] m-full">
                <DialogHeader>
                    <DialogTitle>Set work status for: {moment(workStatusModalData.selectedDate).format('D MMMM YYYY')}</DialogTitle>
                </DialogHeader>
                <div>
                    <Tabs value={selectedStatus} className="w-[400px]" onValueChange={handleChange}>
                        <TabsList>
                            <TabsTrigger value="Working">Working</TabsTrigger>
                            <TabsTrigger value="Vacation">Vacation</TabsTrigger>
                            <TabsTrigger value="Sick Leave">Sick Leave</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Working">
                            <HourInput onSelect={(value: number) => {
                                console.log("hello Selected Rating:", value);
                            }} />
                        </TabsContent>
                        <TabsContent value="Vacation">Vacation</TabsContent>
                        <TabsContent value="Sick Leave">Sick Leave</TabsContent>
                    </Tabs>
                </div>
                <DialogFooter>
                    {existingSelectedStatus && <Button onClick={handleReset} variant='outline'>Remove Record</Button>}
                    <Button onClick={handleSave} >Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}