import { createSlice } from '@reduxjs/toolkit';

// Read from localStorage if exists, otherwise default to 'light'
const storedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;

interface ThemeState {
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: storedMode ?? 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = newMode;

      // Save to localStorage
      localStorage.setItem('themeMode', newMode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
