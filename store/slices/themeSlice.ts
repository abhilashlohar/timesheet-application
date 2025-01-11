import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
    theme: 'light' | 'dark';
}


const initialState: ThemeState = {
    theme: 'dark', // Default theme
};

if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    console.log('hello savedTheme', savedTheme);

    if (savedTheme) {
        initialState.theme = savedTheme as 'light' | 'dark';
    }
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
            localStorage.setItem('theme', state.theme);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
