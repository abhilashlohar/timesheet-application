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

import { WorkStatusType } from "@/types/global";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
import HourInput from "./hour-input";


export default function WorkStatusModal() {
    const { workStatusData, workStatusModal: workStatusModalData } = useAppSelector((state) => state.timesheet);
    const existingSelectedStatus = workStatusModalData.selectedDate && workStatusData[workStatusModalData.selectedDate]
    const dispatch = useAppDispatch();
    const [selectedStatus, setSelectedStatus] = useState<WorkStatusType | "">("")
    const [metaData, setMetaData] = useState<any>({ workingHrs: 8 })


    const handleChange = (value: string) => {
        setSelectedStatus(value as WorkStatusType);
        if (value === "Working") setMetaData({ workingHrs: 8 })
    };

    const handleSave = () => {
        if (selectedStatus) {
            dispatch(addWorkStatus({ status: selectedStatus, metaData: metaData }))
            dispatch(setWorkStatusModalData({ action: 'close', selectedDate: null }))
            setSelectedStatus("")
            setMetaData({ workingHrs: 8 })
        }
    }

    const handleReset = () => {
        setSelectedStatus("")
        setMetaData({ workingHrs: 8 })
        dispatch(clearWorkStatus())
        dispatch(setWorkStatusModalData({ action: 'close', selectedDate: null }))
    }

    useEffect(() => {
        if (existingSelectedStatus && existingSelectedStatus.status) {
            setSelectedStatus(existingSelectedStatus.status)
            setMetaData(existingSelectedStatus.metaData)
        }
    }, [existingSelectedStatus])

    const handleHourSelect = (value: number) => {
        setMetaData({ workingHrs: value })
    }



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
                            <HourInput onSelect={handleHourSelect} defaultValue={metaData?.workingHrs} />
                        </TabsContent>
                        <TabsContent value="Vacation">
                            <Input placeholder="Notes" onChange={(e) => setMetaData({ notes: e.target.value })} value={metaData?.notes} />
                        </TabsContent>
                        <TabsContent value="Sick Leave">
                            <Input placeholder="Notes" onChange={(e) => setMetaData({ notes: e.target.value })} value={metaData?.notes} />
                        </TabsContent>
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