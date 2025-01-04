import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

interface TimesheetState {
    currentDate: Date;
}

const initialState: TimesheetState = {
    currentDate: new Date(),
};

type ChangeMonthActionType = "today" | "previous" | "next";

const timesheetSlice = createSlice({
    name: 'timesheet',
    initialState,
    reducers: {
        changeMonth: (state, action: PayloadAction<ChangeMonthActionType>) => {
            switch (action.payload) {
                case "today":
                    state.currentDate = new Date();
                    break;
                case "previous":
                    state.currentDate = moment(state.currentDate).add(-1, 'months').toDate();
                    break;
                case "next":
                    state.currentDate = moment(state.currentDate).add(+1, 'months').toDate();
                    break;
                default:
                    state.currentDate = new Date();
            }
        },

    },
});

export const { changeMonth } = timesheetSlice.actions;
export default timesheetSlice.reducer;
