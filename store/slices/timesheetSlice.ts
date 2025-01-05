import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export interface WorkStatusData {
    [key: string]: {
        status: "Working" | "Vacation" | "Sick Leave",
        metaData: any
    };
}

interface TimesheetState {
    currentDate: string;
    workStatusModal: {
        selectedDate: string | null;
        open: boolean;
    },
    workStatusData: WorkStatusData
}

const initialState: TimesheetState = {
    currentDate: new Date().toISOString(),
    workStatusModal: {
        selectedDate: null,
        open: false
    },
    workStatusData: {}
};

type ChangeMonthActionType = "today" | "previous" | "next";
type WorkStatusModalPayload = {
    action: "open" | "close",
    selectedDate: string | null
}
export type SelectedStatus = "Working" | "Vacation" | "Sick Leave";

interface AddWordStatusPayload {
    status: SelectedStatus,
    metaData: any;
}


const timesheetSlice = createSlice({
    name: 'timesheet',
    initialState,
    reducers: {
        changeMonth: (state, action: PayloadAction<ChangeMonthActionType>) => {
            switch (action.payload) {
                case "today":
                    state.currentDate = new Date().toISOString();
                    break;
                case "previous":
                    state.currentDate = moment(new Date(state.currentDate)).add(-1, 'months').toISOString();
                    break;
                case "next":
                    state.currentDate = moment(new Date(state.currentDate)).add(+1, 'months').toISOString();
                    break;
                default:
                    state.currentDate = new Date().toISOString();
            }
        },
        setWorkStatusModalData: (state, action: PayloadAction<WorkStatusModalPayload>) => {
            switch (action.payload.action) {
                case "open":
                    state.workStatusModal.open = true;
                    state.workStatusModal.selectedDate = action.payload.selectedDate
                    break;
                case "close":
                    state.workStatusModal.open = false;
                    state.workStatusModal.selectedDate = null;
                    break;
                default:
                    state
            }
        },
        addWorkStatus: (state, action: PayloadAction<AddWordStatusPayload>) => {
            const { status, metaData } = action.payload
            const date = state.workStatusModal.selectedDate
            if (date) {
                let temp = JSON.parse(JSON.stringify(state.workStatusData))
                temp[date] = { status, metaData }
                state.workStatusData = temp
            }

        }
    },
});

export const { changeMonth, setWorkStatusModalData, addWorkStatus } = timesheetSlice.actions;
export default timesheetSlice.reducer;
