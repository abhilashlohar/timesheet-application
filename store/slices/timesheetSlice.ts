import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import axios, { AxiosError } from "axios"
import { ApiStatus, ChangeMonthActionType, FetchHolidayApiData, SaveTimesheetData, WorkStatusData, WorkStatusModalPayload, WorkStatusType } from '@/types/global';





interface TimesheetState {
    currentDate: string;
    workStatusModal: {
        selectedDate: string | null;
        open: boolean;
    },
    workStatusData: WorkStatusData,
    fetchHolidayApiData: FetchHolidayApiData
    saveTimesheetApiData: SaveTimesheetData
}



interface AddWordStatusPayload {
    status: WorkStatusType,
    metaData: any;
}



const initialState: TimesheetState = {
    currentDate: new Date().toISOString(),
    workStatusModal: {
        selectedDate: null,
        open: false
    },
    workStatusData: {},
    fetchHolidayApiData: {
        status: "ideal",
        data: null,
        message: ""
    },
    saveTimesheetApiData: {
        status: "ideal",
        data: null,
        message: ""
    }
};


export const fetchHolidays = createAsyncThunk('fetchHolidays', async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:9000/holidays');
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 404) {
                return thunkAPI.rejectWithValue('Resource not found!');
            } else if (error.code === 'ECONNABORTED') {
                return thunkAPI.rejectWithValue('Request timed out!');
            } else if (error.message === 'Network Error') {
                return thunkAPI.rejectWithValue('Network error, please check your connection!');
            } else {
                return thunkAPI.rejectWithValue('An unexpected error occurred.');
            }
        }
        return thunkAPI.rejectWithValue('Something went wrong.');
    }
});

export const saveTimesheet = createAsyncThunk('save-timesheet', async (arg: any, thunkAPI) => {
    try {
        console.log('saveTimesheet payload', arg);

        const response = await axios.get('http://localhost:9000/save-timesheet');
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 404) {
                return thunkAPI.rejectWithValue('Resource not found!');
            } else if (error.code === 'ECONNABORTED') {
                return thunkAPI.rejectWithValue('Request timed out!');
            } else if (error.message === 'Network Error') {
                return thunkAPI.rejectWithValue('Network error, please check your connection!');
            } else {
                return thunkAPI.rejectWithValue('An unexpected error occurred.');
            }
        }
        return thunkAPI.rejectWithValue('Something went wrong.');
    }
});




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
        },
        clearWorkStatus: (state) => {
            const date = state.workStatusModal.selectedDate
            if (date) {
                let temp = JSON.parse(JSON.stringify(state.workStatusData))
                delete temp[date]
                state.workStatusData = temp
            }
        },
        setWorkStatusData: (state, action: PayloadAction<WorkStatusData>) => {
            state.workStatusData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHolidays.pending, (state) => {
                state.fetchHolidayApiData.status = 'pending';
                state.fetchHolidayApiData.data = null;
            })
            .addCase(fetchHolidays.fulfilled, (state, action) => {
                state.fetchHolidayApiData.status = 'fulfilled';
                state.fetchHolidayApiData.data = action.payload;
            })
            .addCase(fetchHolidays.rejected, (state, action) => {
                state.fetchHolidayApiData.status = 'rejected';
                state.fetchHolidayApiData.data = null;
                state.fetchHolidayApiData.message = action.payload as string;
            })
            .addCase(saveTimesheet.pending, (state) => {
                state.saveTimesheetApiData.status = 'pending';
                state.saveTimesheetApiData.data = null;
            })
            .addCase(saveTimesheet.fulfilled, (state, action) => {
                state.saveTimesheetApiData.status = 'fulfilled';
                state.saveTimesheetApiData.data = action.payload;
            })
            .addCase(saveTimesheet.rejected, (state, action) => {
                state.saveTimesheetApiData.status = 'rejected';
                state.saveTimesheetApiData.data = null;
                state.saveTimesheetApiData.message = action.payload as string;
            });
    },
});

export const { changeMonth, setWorkStatusModalData, addWorkStatus, setWorkStatusData, clearWorkStatus } = timesheetSlice.actions;
export default timesheetSlice.reducer;
