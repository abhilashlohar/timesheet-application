import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from "axios"
import { ApiStatus, WorkStatusData, WorkStatusType } from '@/types/global';

interface FetchChartDataApiData {
    status: ApiStatus,
    data: {
        chart1: unknown,
        chart2: unknown,
        chart3: unknown,
        chart4: unknown,
    },
    message: string
}
interface AnalyticsState {
    fetchChartDataApiData: FetchChartDataApiData
}
const initialState: AnalyticsState = {
    fetchChartDataApiData: {
        status: "ideal",
        data: {
            chart1: {},
            chart2: {},
            chart3: {},
            chart4: {},
        },
        message: ""
    },
};


export const fetchChartData = createAsyncThunk('fetchChartData', async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:9000/analytics-data');
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



const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChartData.pending, (state) => {
                state.fetchChartDataApiData.status = 'pending';
                state.fetchChartDataApiData.data = {
                    chart1: {}, chart2: {}, chart3: {}, chart4: {},
                };
            })
            .addCase(fetchChartData.fulfilled, (state, action) => {
                state.fetchChartDataApiData.status = 'fulfilled';
                state.fetchChartDataApiData.data = action.payload;
            })
            .addCase(fetchChartData.rejected, (state, action) => {
                state.fetchChartDataApiData.status = 'rejected';
                state.fetchChartDataApiData.data = { chart1: {}, chart2: {}, chart3: {}, chart4: {}, };
                state.fetchChartDataApiData.message = action.payload as string;
            })
    },
});

export const { } = analyticsSlice.actions;
export default analyticsSlice.reducer;
