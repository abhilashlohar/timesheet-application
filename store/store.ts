import { configureStore } from '@reduxjs/toolkit';
import timesheetReducer from './slices/timesheetSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
    reducer: {
        timesheet: timesheetReducer,
        theme: themeReducer
    },
});

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
